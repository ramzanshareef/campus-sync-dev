"use server";

import connectDB from "../connectDB";
import College from "@/models/College";
import { revalidatePath } from "next/cache";
import { isCollegeUser } from "../user/auth";

const bcryptjs = require("bcryptjs");


export const getCollegeDetails = async () => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let collegeID = isAuth.user._id;
        let college = await College.findById(collegeID).select("-password");
        if (college) {
            return { status: 200, user: JSON.parse(JSON.stringify(college)) };
        }
        else {
            return { status: 404, message: "College not found" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
};

export const updateCollegeDetails = async (prevState, formData) => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let collegeID = isAuth.user._id;
        let collegeUser = await College.findById(collegeID);
        if (collegeUser) {
            collegeUser.college = formData.get("collegeName");
            await collegeUser.save();
            revalidatePath("/college/profile");
            return { status: 200, message: "College details updated" };
        }
        else {
            return { status: 404, message: "College not found" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" + err.message };
    }
};

export const updateCollegePassword = async (prevState, formData) => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    let currPass = formData.get("currentPassword");
    let newPass = formData.get("newPassword");
    let confirmPass = formData.get("confirmPassword");
    try {
        await connectDB();
        let collegeID = isAuth.user._id;
        let collegeUser = await College.findById(collegeID);
        if (collegeUser) {
            let isMatch = await bcryptjs.compare(currPass, collegeUser.password);
            if (!isMatch) {
                return { status: 400, message: "Incorrect Credentials" };
            }
            if (newPass !== confirmPass) {
                return { status: 400, message: "Passwords do not match" };
            }
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(newPass, salt);
            collegeUser.password = password;
            await collegeUser.save();
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