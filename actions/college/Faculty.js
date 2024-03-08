"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../connectDB";
import Faculty from "@/models/Faculty";
import { getSession } from "@/src/lib/session";
import College from "@/models/College";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const getTotalFacultyDetails = async () => {
    try {
        await connectDB();
        let totalFaculty = await Faculty.countDocuments({});
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

export const getAllFacultyDetails = async (currentPage, college) => {
    try {
        await connectDB();
        if (college) {
            let faculties = await Faculty.find({ college }).sort({ rollNo: 1 }).skip((currentPage - 1) * 5).limit(5);
            let length = await Faculty.countDocuments({ college });
            revalidatePath("/college/faculty/view");
            return { status: 200, faculties: JSON.parse(JSON.stringify(faculties)), length };
        }
        let faculties = await Faculty.find({}).skip((currentPage - 1) * 5).limit(5);
        let length = await Faculty.countDocuments({});
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
            faculty.college = "Chaitanya Bharathi Institute of Technology"; // TODO : Change this to the college name
            faculty.email = faculty.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + faculty.name.split(" ").map((word) => word.toLowerCase()).join("") + ".faculty" + "@campus.sync";
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
    const faculty = [];
    // let token = await (await getSession()).token;
    // if (!token) {
    //     return { status: 401, message: "Unauthorized" };
    // }
    // let id = await (jwt.verify(token, JWT_SECRET)).id;
    // if (!id) {
    //     return { status: 401, message: "Unauthorized" };
    // }
    // let collegeName = await College.findById(id);
    // if (!collegeName) {
    //     return { status: 404, message: "College not found" };
    // }
    // console.log(collegeName.college, id);

    faculty.push({
        name: formData.get("name").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        department: formData.get("department").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    });
    try {
        await connectDB();
        faculty.forEach(async (faculty) => {
            faculty.college = "Chaitanya Bharathi Institute of Technology"; // TODO : Change this to the college name
            faculty.email = faculty.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + faculty.name.split(" ").map((word) => word.toLowerCase()).join("") + ".faculty" + "@campus.sync";
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