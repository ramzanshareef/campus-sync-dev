"use server";

import Student from "@/models/Student";
import connectDB from "../connectDB";

export const getAllStudents = async () => {
    try {
        await connectDB();
        const students = await Student.find().select("-password");
        return {
            status: 200,
            message: "Success",
            data: students
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
};