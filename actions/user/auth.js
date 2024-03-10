"use server";

import connectDB from "../connectDB";
import { getSession } from "@/src/lib/session";
import Student from "@/models/Student";
import College from "@/models/College";
import Faculty from "@/models/Faculty";


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
            if (userType === "student") {
                let student = await Student.findOne({ email: email });
                if (student) {
                    return { status: 400, message: "Email already taken" };
                }
                else {
                    let salt = bcryptjs.genSaltSync(10);
                    password = bcryptjs.hashSync(password, salt);
                    let newStudent = new Student({
                        name: name,
                        email: email,
                        password: password
                    });
                    await newStudent.save();
                    return { status: 200, message: "Signed up succesfully, please login" };
                }
            }
            else if (userType === "college") {
                let college = await College.findOne({ email: email });
                if (college) {
                    return { status: 400, message: "Email already taken" };
                }
                else {
                    let salt = bcryptjs.genSaltSync(10);
                    password = bcryptjs.hashSync(password, salt);
                    let newCollege = new College({
                        name: name,
                        email: email,
                        password: password
                    });
                    await newCollege.save();
                    return { status: 200, message: "Signed up succesfully, please login" };
                }
            }
            else if (userType === "faculty") {
                let faculty = await Faculty.findOne({ email: email });
                if (faculty) {
                    return { status: 400, message: "Email already taken" };
                }
                else {
                    let salt = bcryptjs.genSaltSync(10);
                    password = bcryptjs.hashSync(password, salt);
                    let newFaculty = new Faculty({
                        name: name,
                        email: email,
                        password: password
                    });
                    await newFaculty.save();
                    return { status: 200, message: "Signed up succesfully, please login" };
                }
            }
            else {
                return { status: 400, message: "Invalid user type" };
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
                            userType: "student",
                        }, jwt_secret, { expiresIn: "1d" });
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
            else if (userType === "college") {
                let college = await College.findOne({ email: email });
                if (college) {
                    let isMatch = await bcryptjs.compare(password, college.password);
                    if (isMatch) {
                        let token = jwt.sign({
                            id: college._id,
                            userType: "college",
                        }, jwt_secret, { expiresIn: "1d" });
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
            else if (userType === "faculty") {
                let faculty = await Faculty.findOne({ email: email });
                if (faculty) {
                    let isMatch = await bcryptjs.compare(password, faculty.password);
                    if (isMatch) {
                        let token = jwt.sign({
                            id: faculty._id,
                            userType: "faculty",
                        }, jwt_secret, { expiresIn: "1d" });
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
        let userType = decoded.userType;
        if (userType === "student") {
            let student = await Student.findById(decoded.id).select("-password");
            if (student) {
                return { userType, user: JSON.parse(JSON.stringify(student)) };
            }
            else {
                return null;
            }
        }
        else if (userType === "college") {
            let college = await College.findById(decoded.id).select("-password");
            if (college) {
                return { userType, user: JSON.parse(JSON.stringify(college)) };
            }
            else {
                return null;
            }
        }
        else if (userType === "faculty") {
            let faculty = await Faculty.findById(decoded.id).select("-password");
            if (faculty) {
                return { userType, user: JSON.parse(JSON.stringify(faculty)) };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}

export async function isStudentUser() {
    let session = await getSession();
    if (session) {
        if (session.userType === "student") {
            let user = await getUser(session.token);
            user = JSON.parse(JSON.stringify(user.user));
            return { status: 200, user: user };
        }
        else {
            return { status: 400 };
        }
    }
    else {
        return { status: 400 };
    }
}

export async function isCollegeUser() {
    let session = await getSession();
    if (session) {
        if (session.userType === "college") {
            let user = await getUser(session.token);
            user = JSON.parse(JSON.stringify(user.user));
            return { status: 200, user: user };
        }
        else {
            return { status: 400 };
        }
    }
    else {
        return { status: 400 };
    }
}

export async function isFacultyUser() {
    let session = await getSession();
    if (session) {
        if (session.userType === "faculty") {
            let user = await getUser(session.token);
            user = JSON.parse(JSON.stringify(user.user));
            return { status: 200, user: user };
        }
        else {
            return { status: 400 };
        }
    }
    else {
        return { status: 400 };
    }
}