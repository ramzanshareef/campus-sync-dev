"use server";

import Student from "@/models/Student";
import connectDB from "../connectDB";

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
            student.password = student.rollNo;
        });
        await Promise.all(students.map(async (student) => {
            let exisStudent = await Student.findOne({ email: student.email, rollNo: student.rollNo });
            if (!exisStudent) {
                const studentModel = new Student(student);
                await studentModel.save();
            }
        })).catch((e) => {
            students.map((student) => {
                Student.findOneAndDelete({ rollNo: student.rollNo });
            });
            throw new Error(e);
        });
        return { status: 200, message: "Students added successfully" };
    }
    catch (e) {
        return { status: 500, message: e.message };
    }

};