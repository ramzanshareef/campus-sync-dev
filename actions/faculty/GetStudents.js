"use server";

import Student from "@/models/Student";
import connectDB from "../connectDB";
import Course from "@/models/Course";
import { isFacultyUser } from "../user/auth";

export const getAllStudents = async () => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        let collegeID = isAuth.user.college;
        await connectDB();
        const students = await Student.find({
            college: collegeID
        }).select("-password");
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

export const getRemainingStudents = async (courseID) => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        let collegeID = isAuth.user.college;
        await connectDB();
        const course = await Course.findById(courseID).populate("students", "name email rollNo");
        const dept = course.department;
        const allStudents = await Student.find({
            department: dept,
            college: collegeID
        }).select("-password");
        const remainingStudents = allStudents.filter((student) => {
            return !course.students.some((courseStudent) => courseStudent.id === student.id);
        });
        return {
            status: 200,
            message: "Success",
            data: remainingStudents
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
};

export const getStudentsByDepartment = async (department) => {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        let collegeID = isAuth.user.college;
        await connectDB();
        let students = await Student.find({ department, college: collegeID }).select("name email rollNo");
        students = JSON.parse(JSON.stringify(students));
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