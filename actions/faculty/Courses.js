"use server";

import Course from "@/models/Course";
import connectDB from "../connectDB";
import { isFacultyUser } from "../user/auth";
import { uploadImageforNewCourse } from "../images/upload";
import { revalidatePath } from "next/cache";

export async function addNewCourse(currentState, formData) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        if (formData.get("courseName") === "" || formData.get("courseCode") === "" || formData.get("courseDescription") === "" || formData.getAll("students").length === 0 || !formData.get("courseName") || !formData.get("courseCode") || !formData.get("courseDescription") || ((formData.getAll("students")[0] !== "") === false) || !formData.get("courseDepartment")) {
            return {
                status: 400,
                message: "Bad Request"
            };
        }
        let data = {
            name: formData.get("courseName"),
            code: formData.get("courseCode"),
            description: formData.get("courseDescription"),
            department: formData.get("courseDepartment")
        };
        let students = [];
        formData.getAll("students").forEach((student) => {
            if (student !== "*") {
                students.push(student);
            }
        });
        data.students = students;
        data.faculty = isAuth.user._id;
        await connectDB();
        let exisCourse = await Course.findOne({
            code: data.code,
            faculty: data.faculty
        });
        let res = await uploadImageforNewCourse(formData);
        if (res.status === 200) {
            data.image = res.imageURL;
        }
        if (exisCourse && res.status === 200) {
            exisCourse.name = data.name;
            exisCourse.description = data.description;
            exisCourse.students = data.students;
            exisCourse.image = data.image;
            exisCourse.department = data.department;
            await exisCourse.save();
            return {
                status: 200,
                message: "Course Updated Successfully"
            };
        }
        let course = await new Course(data);
        await course.save();
        revalidatePath("/faculty/courses");
        return {
            status: 200,
            message: "Course Added Successfully"
        };
    }
    catch (error) {
        console.log(error.message);
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function getAllCourses() {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let courses = await Course.find({ faculty: isAuth.user._id });
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
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let course = await Course.findOne({ _id: courseID, faculty: isAuth.user._id }).populate({
            path: "students faculty",
            select: "-password",
        }).exec();
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

export async function removeStudentFromCourse(studentID, courseID) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        let faculty = isAuth.user._id;
        let course = await Course.findOne({
            _id: courseID,
            faculty
        });
        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        let students = course.students;
        let index = students.indexOf(studentID);
        if (index === -1) {
            return {
                status: 404,
                message: "Student Not Found"
            };
        }
        students.splice(index, 1);
        course.students = students;
        await course.save();
        revalidatePath("/faculty/courses/view?courseID=" + courseID + "&tab=4");
        return {
            status: 200,
            message: "Student Removed Successfully"
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function addStudentsToCourse(courseID, students) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let faculty = isAuth.user._id;
        let course = await Course.findOne({
            _id: courseID,
            faculty
        });
        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        let allStudents = course.students;
        students.forEach((student) => {
            if (!allStudents.includes(student.value)) {
                if (student.value !== "*") {
                    allStudents.push(student.value);
                }
            }
        });
        course.students = allStudents;
        await course.save();
        revalidatePath("/faculty/courses/view?courseID=" + courseID + "&tab=4");
        return {
            status: 200,
            message: "Students Added Successfully"
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function getAllQuizzesOfCourse(courseID) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let faculty = isAuth.user._id;
        let course = await Course.findOne({
            _id: courseID,
            faculty
        });
        let quizzes = await course.quizzes;

        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        return {
            status: 200,
            quizzes: quizzes
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function addQuizToCourse(courseID, quizID, quizData) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let faculty = isAuth.user._id;
        let course = await Course.findOne({
            _id: courseID,
            faculty
        });
        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        if (quizID === null) {
            let newQuiz = {
                title: quizData.quizTitle,
                description: quizData.quizDescription,
                questions: [{
                    question: quizData.qstnName,
                    options: quizData.options.map((option, i) => {
                        return {
                            option: option,
                            correct: (i === quizData.correctAns)
                        };
                    }),
                    score: quizData.points
                }]
            };
            course.quizzes.push(newQuiz);
            await course.save();
            let newQuizID = JSON.parse(JSON.stringify(course.quizzes[course.quizzes.length - 1]._id));
            return {
                status: 200,
                message: "Quiz Added Successfully",
                quizID: newQuizID
            };
        }
        else {
            let quizIndex = course.quizzes.findIndex((quiz) => quiz._id == quizID);
            if (quizIndex === -1) {
                return {
                    status: 404,
                    message: "Quiz Not Found"
                };
            }
            let newQuestion = {
                question: quizData.qstnName,
                options: quizData.options.map((option, i) => {
                    return {
                        option: option,
                        correct: (i === quizData.correctAns)
                    };
                }),
                score: quizData.points
            };
            course.quizzes[quizIndex].questions.push(newQuestion);
            await course.save();
            let newQuizID = JSON.parse(JSON.stringify(course.quizzes[quizIndex]._id));
            return {
                status: 200,
                message: "Question Added Successfully",
                quizID: newQuizID
            };
        }
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}

export async function removeQuizFromCourse(courseID, quizID) {
    let isAuth = await isFacultyUser();
    if (isAuth.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let faculty = isAuth.user._id;
        let course = await Course.findOne({
            _id: courseID,
            faculty
        });
        if (!course) {
            return {
                status: 404,
                message: "Course Not Found"
            };
        }
        let quizIndex = course.quizzes.findIndex((quiz) => quiz._id == quizID);
        if (quizIndex === -1) {
            return {
                status: 404,
                message: "Quiz Not Found"
            };
        }
        course.quizzes.splice(quizIndex, 1);
        await course.save();
        revalidatePath("/faculty/courses/view?courseID=" + courseID + "&tab=2");
        return {
            status: 200,
            message: "Quiz Removed Successfully"
        };
    }
    catch (error) {
        return {
            status: 500,
            message: "Internal Server Error" + error.message
        };
    }
}