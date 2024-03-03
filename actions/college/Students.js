"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../connectDB";
import Student from "@/models/Student";

export const getTotalStudentDetails = async () => {
    try {
        await connectDB();
        let totalStudents = await Student.countDocuments({});
        return { totalStudents };
    }
    catch (e) {
        console.error(e);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export const getAllStudentDetails = async (currentPage, college) => {
    try {
        await connectDB();
        if (college) {
            let students = await Student.find({ college }).sort({ rollNo: 1 }).skip((currentPage - 1) * 5).limit(5);
            let length = await Student.countDocuments({ college });
            revalidatePath("/college/students/view");
            return { status: 200, students: JSON.parse(JSON.stringify(students)), length };
        }
        let students = await Student.find({}).sort({ rollNo: 1 }).skip((currentPage - 1) * 5).limit(5);
        let length = await Student.countDocuments({});
        revalidatePath("/college/students/view");
        return { status: 200, students: JSON.parse(JSON.stringify(students)), length };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};