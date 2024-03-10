"use server";

import Faculty from "@/models/Faculty";
import connectDB from "../connectDB";
import { revalidatePath } from "next/cache";
import { isFacultyUser } from "../user/auth";

const bcryptjs = require("bcryptjs");

export const getFacultyDetails = async () => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let facultyID = isAuth.user._id;
        let faculty = await Faculty.findById(facultyID).select("-password").populate("college");
        if (faculty) {
            return { status: 200, user: JSON.parse(JSON.stringify(faculty)) };
        }
        else {
            return { status: 404, message: "Faculty not found" };
        }
    }
    catch (err) {
        console.log(err.message);
        return { status: 500, message: "Internal server error" };
    }
};

export const updateFacultyDetails = async (prevState, formData) => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let facultyID = isAuth.user._id;
        let faculty = await Faculty.findById(facultyID).populate("college");
        if (faculty) {
            faculty.name = formData.get("name");
            faculty.email = faculty.college.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + faculty.name.split(" ").map((word) => word.toLowerCase()).join("") + ".faculty" + "@campus.sync";
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(faculty.name.split(" ").map((word) => word.toLowerCase()).join(""), salt);
            faculty.password = password;
            await faculty.save();
            revalidatePath("/faculty/profile");
            return { status: 200, message: "Faculty details updated" };
        }
        else {
            return { status: 404, message: "Faculty not found" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" + err.message };
    }
};

export const updateFacultyPassword = async (prevState, formData) => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    let currPass = formData.get("currentPassword");
    let newPass = formData.get("newPassword");
    let confirmPass = formData.get("confirmPassword");
    try {
        await connectDB();
        let facultyID = isAuth.user._id;
        let faculty = await Faculty.findById(facultyID);
        if (faculty) {
            let isMatch = await bcryptjs.compare(currPass, faculty.password);
            if (!isMatch) {
                return { status: 400, message: "Incorrect Credentials" };
            }
            if (newPass !== confirmPass) {
                return { status: 400, message: "Passwords do not match" };
            }
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(newPass, salt);
            faculty.password = password;
            await faculty.save();
            revalidatePath("/faculty/profile");
            return { status: 200, message: "Password updated!" };
        }
        else {
            return { status: 404, message: "Faculty not found" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" + err.message };
    }
};