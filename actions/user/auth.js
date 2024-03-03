"use server";

import User from "@/models/User";
import connectDB from "../connectDB";
import { getSession } from "@/src/lib/session";
import Student from "@/models/Student";


const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;



export async function userSignup(currentState, formData) {
    let name = formData.get("name");
    let email = formData.get("email");
    let password = formData.get("password");
    let userType = formData.get("userType");
    if (name === "" || email === "" || password === "" || userType === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user) {
                return { status: 400, message: "Email already taken" };
            }
            else {
                let salt = bcryptjs.genSaltSync(10);
                password = bcryptjs.hashSync(password, salt);
                let newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                    userType: userType
                });
                await newUser.save();
                return { status: 200, message: "Signed up succesfully, please login" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }

}

export async function userLogin(currentState, formData) {
    let email = formData.get("email");
    let password = formData.get("password");
    let userType = formData.get("userType");
    if (email === "" || password === "" || userType === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            if (userType === "student") {
                let student = await Student.findOne({ email: email });
                if (student) {
                    let isMatch = await bcryptjs.compare(password, student.password);
                    if (isMatch) {
                        let token = jwt.sign({
                            id: student._id,
                            name: student.name,
                            email: student.email
                        }, jwt_secret, { expiresIn: "1d" });
                        // let salt = bcryptjs.genSaltSync(10);
                        // hashedToken = bcryptjs.hashSync(token, salt);
                        const session = await getSession();
                        session.token = token;
                        session.isAuth = true;
                        session.userType = userType;
                        await session.save();
                        return { status: 200, userType, message: "Login successful" };
                    }
                    else {
                        return { status: 400, message: "Invalid Credentials" };
                    }
                }
                else {
                    return { status: 400, message: "Invalid Credentials" };
                }
            }
            let user = await User.findOne({ email: email, userType: userType });
            if (user) {
                let isMatch = await bcryptjs.compare(password, user.password);
                if (isMatch) {
                    let token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }, jwt_secret, { expiresIn: "1d" });
                    // let salt = bcryptjs.genSaltSync(10);
                    // hashedToken = bcryptjs.hashSync(token, salt);
                    const session = await getSession();
                    session.token = token;
                    session.isAuth = true;
                    session.userType = userType;
                    await session.save();
                    return { status: 200, userType, message: "Login successful" };
                }
                else {
                    return { status: 400, message: "Invalid Credentials" };
                }
            }
            else {
                return { status: 400, message: "Invalid Credentials" };
            }
        }
        catch (err) {
            console.log(err.message);
            return { status: 500, message: "Internal server error" };
        }

    }
}

export async function getUser(token) {
    try {
        await connectDB();
        if (!token) {
            return null;
        }
        let decoded = jwt.verify(token, jwt_secret);
        let user = await User.findById(decoded.id);
        return user;
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}