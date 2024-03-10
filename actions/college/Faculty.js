"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../connectDB";
import Faculty from "@/models/Faculty";
import { getSession } from "@/src/lib/session";
import { isCollegeUser } from "../user/auth";

const bcryptjs = require("bcryptjs");

export const getTotalFacultyDetails = async () => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let totalFaculty = await Faculty.countDocuments({ college: isAuth.user._id });
        return { totalFaculty };
    }
    catch (e) {
        console.error(e);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export const getAllFacultyDetails = async (currentPage) => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        let college = isAuth.user._id;
        await connectDB();
        if (college) {
            let faculties = await Faculty.find({ college }).skip((currentPage - 1) * 5).limit(5);
            let length = await Faculty.countDocuments({ college });
            revalidatePath("/college/faculty/view");
            return { status: 200, faculties: JSON.parse(JSON.stringify(faculties)), length };
        }
        let faculties = await Faculty.find({}).skip((currentPage - 1) * 5).limit(5);
        let length = await Faculty.countDocuments({ college });
        revalidatePath("/college/faculty/view");
        return { status: 200, faculties: JSON.parse(JSON.stringify(faculties)), length };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export const AddFaculties = async (currentState, formData) => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    const facultiesFormData = formData.get("facultyToAdd");
    const dem = facultiesFormData.split(",").splice(2, facultiesFormData.length - 1);
    const faculties = [];
    for (let i = 0; i < dem.length; i = i + 2) {
        faculties.push({
            name: dem[i].split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            department: dem[i + 1].split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        });
    }
    try {
        await connectDB();
        faculties.forEach(async (faculty) => {
            faculty.college = isAuth.user._id;
            faculty.email = isAuth.user.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + faculty.name.split(" ").map((word) => word.toLowerCase()).join("") + ".faculty" + "@campus.sync";
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(faculty.name.split(" ").map((word) => word.toLowerCase()).join(""), salt);
            faculty.password = password;
        });
        await Faculty.insertMany(faculties).catch((e) => {
            faculties.map((faculty) => {
                Faculty.deleteMany({ rollNo: faculty.rollNo });
            });
            throw new Error(e);
        });
        revalidatePath("/college/faculty");
        return { status: 200, message: "Faculties added successfully" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }

};

export const AddFaculty = async (currentState, formData) => {
    let isAuth = await isCollegeUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    const faculty = [];
    faculty.push({
        name: formData.get("name").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        department: formData.get("department").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    });
    try {
        await connectDB();
        faculty.forEach(async (faculty) => {
            faculty.college = isAuth.user._id;
            faculty.email = isAuth.user.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + faculty.name.split(" ").map((word) => word.toLowerCase()).join("") + ".faculty" + "@campus.sync";
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(faculty.name.split(" ").map((word) => word.toLowerCase()).join(""), salt);
            faculty.password = password;
        });
        let exisFaculty = await Faculty.findOne({ email: faculty[0].email });
        if (!exisFaculty) {
            const facultyData = new Faculty(faculty[0]);
            await facultyData.save();
        }
        else {
            return { status: 400, message: "Faculty already exists" };
        }
        revalidatePath("/college/faculty");
        return { status: 200, message: "Faculty added successfully" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};
