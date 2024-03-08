"use server";

import Course from "@/models/Course";
import connectDB from "../connectDB";
import { getSession } from "@/src/lib/session";
import { getUser } from "../user/auth";

export async function addNewCourse(currentState, formData) {
    try {
        if (formData.get("courseName") === "" || formData.get("courseCode") === "" || formData.get("courseDescription") === "" || formData.getAll("students").length === 0 || !formData.get("courseName") || !formData.get("courseCode") || !formData.get("courseDescription") || !formData.getAll("students")) {
            return {
                status: 400,
                message: "Bad Request"
            };
        }
        let data = {
            name: formData.get("courseName"),
            code: formData.get("courseCode"),
            description: formData.get("courseDescription")
        };
        let students = [];
        formData.getAll("students").forEach((student) => {
            students.push(student);
        });
        data.students = students;
        let currUser = await getSession();
        if (!currUser || currUser.userType !== "faculty" || !currUser.token || !currUser.isAuth) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        let user = await getUser(currUser.token);
        if (!user || user.userType !== "faculty" || !user.user) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        data.faculty = user.user._id;
        await connectDB();
        let exisCourse = await Course.findOne({ code: data.code });
        if (exisCourse) {
            exisCourse.name = data.name;
            exisCourse.description = data.description;
            exisCourse.students = data.students;
            await exisCourse.save();
            return {
                status: 200,
                message: "Course Updated Successfully"
            };
        }
        let course = await new Course(data);
        await course.save();
        return {
            status: 200,
            message: "Course Added Successfully"
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function getAllCourses() {
    try {
        let currUser = await getSession();
        if (!currUser || currUser.userType !== "faculty" || !currUser.token || !currUser.isAuth) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        let user = await getUser(currUser.token);
        if (!user || user.userType !== "faculty" || !user.user) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        await connectDB();
        let courses = await Course.find({ faculty: user.user._id });
        return {
            status: 200,
            courses
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function getCourse(courseID) {
    try {
        let currUser = await getSession();
        if (!currUser || currUser.userType !== "faculty" || !currUser.token || !currUser.isAuth) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        let user = await getUser(currUser.token);
        if (!user || user.userType !== "faculty" || !user.user) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        await connectDB();
        let course = await Course.findOne({ _id: courseID, faculty: user.user._id }).populate("students");
        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        return {
            status: 200,
            course
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}