"use server";

import Student from "@/models/Student";
import connectDB from "../connectDB";
import { revalidatePath } from "next/cache";

const bcryptjs = require("bcryptjs");

export const AddStudents = async (currentState, formData) => {
    const studentsFormData = formData.get("studentsToAdd");
    const dem = studentsFormData.split(",").splice(5, studentsFormData.length - 1);
    const students = [];
    for (let i = 0; i < dem.length; i = i + 5) {
        students.push({
            name: dem[i].split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            department: dem[i + 1].split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            year: parseInt(dem[i + 2]),
            semester: parseInt(dem[i + 3]),
            rollNo: parseInt(dem[i + 4]),
        });
    }
    try {
        await connectDB();
        students.forEach(async (student) => {
            student.college = "Chaitanya Bharathi Institute of Technology, Hyderabad"; // TODO: Change this to the college name
            student.email = student.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + student.rollNo + "@gmail.com";
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(student.rollNo.toString(), salt);
            student.password = password;
        });
        await Student.insertMany(students).catch((e) => {
            students.map((student) => {
                Student.deleteMany({ rollNo: student.rollNo });
            });
            throw new Error(e);
        });
        revalidatePath("/college/students");
        return { status: 200, message: "Students added successfully" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }

};

export const AddStudent = async (currentState, formData) => {
    const student = [];
    student.push({
        name: formData.get("name").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        department: formData.get("department").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        year: parseInt(formData.get("year")),
        semester: parseInt(formData.get("semester")),
        rollNo: parseInt(formData.get("rollNo")),
    });
    try {
        await connectDB();
        student.forEach(async (student) => {
            student.college = "Chaitanya Bharathi Institute of Technology, Hyderabad"; // TODO: Change this to the college name
            student.email = student.college.split(" ").map((word) => word.charAt(0).toLowerCase()).join("") + "." + student.rollNo + "@gmail.com";
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(student.rollNo.toString(), salt);
            student.password = password;
        });
        let exisStudent = await Student.findOne({ email: student[0].email, rollNo: student[0].rollNo });
        if (!exisStudent) {
            const studentModel = new Student(student[0]);
            await studentModel.save();
        }
        else {
            return { status: 400, message: "Student already exists" };
        }
        revalidatePath("/college/students");
        return { status: 200, message: "Student added successfully" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }
};