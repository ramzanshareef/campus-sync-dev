"use server";

import { getSession } from "@/src/lib/session";
import { getUser } from "../user/auth";
import Course from "@/models/Course";
import StudentQuizAttempt from "@/models/Student.QuizAttempt";

export async function getCoursesOfStudent() {
    const session = await getSession();
    if (!session || session.userType !== "student" || !session.isAuth) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
    let studentID = (await getUser(session.token)).user?._id;
    const courses = await Course.find({ students: studentID });
    return {
        status: 200,
        courses: courses
    };
}

export async function getCourseDetailsByStudent(courseID) {
    try {
        const session = await getSession();
        if (!session || session.userType !== "student" || !session.isAuth) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        let studentID = (await getUser(session.token)).user?._id;
        const course = await Course.findOne({ _id: courseID, students: studentID }).populate("faculty");
        return {
            status: 200,
            course: course
        };
    }
    catch (err) {
        return {
            status: 400,
            message: err.message
        };
    }
}

export async function attemptQuiz(currentState, formData) {
    let session = await getSession();
    if (!session || session.userType !== "student" || !session.isAuth) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
    let studentID = (await getUser(session.token)).user?._id;
    let quizID = formData.get("quizID");
    let responses = [];
    for (const pair of formData.entries()) {
        if (pair[0] !== "quizID") {
            responses.push({
                question: pair[0],
                selectedOption: pair[1]
            });
        }
    }
    try {
        let quizAttempt = await StudentQuizAttempt.findOne({
            studentID: studentID,
            quizID: quizID
        });
        if (quizAttempt) {
            return {
                status: 400,
                message: "Quiz already attempted"
            };
        }
        let course = await Course.findOne({
            "quizzes._id": quizID
        }).select("quizzes");
        let quiz = course.quizzes.id(quizID);
        let score = 0;
        for (let i = 0; i < responses.length; i++) {
            let question = quiz.questions.id(responses[i].question);
            if (question.options.id(responses[i].selectedOption).correct) {
                score = score + question.score;
            }
        }
        quizAttempt = new StudentQuizAttempt({
            studentID: studentID,
            quizID: quizID,
            responses: responses,
            score: score
        });
        await quizAttempt.save();
        return {
            status: 200,
            message: "Thank you for attempting the quiz"
        };
    }
    catch (err) {
        return {
            status: 400,
            message: err.message
        };
    }
}

export async function quizAttempedOrNot(quizID) {
    let session = await getSession();
    if (!session || session.userType !== "student" || !session.isAuth) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
    let studentID = (await getUser(session.token)).user?._id;
    let quizAttempt = await StudentQuizAttempt.findOne({
        studentID: studentID,
        quizID: quizID
    });
    if (quizAttempt) {
        return {
            status: 200,
            message: "Quiz already attempted"
        };
    }
    return {
        status: 400,
        message: "Quiz not attempted"
    };
}

export async function getAttemptedQuizData(quizID) {
    let session = await getSession();
    if (!session || session.userType !== "student" || !session.isAuth) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
    let studentID = (await getUser(session.token)).user?._id;
    let quizAttempt = await StudentQuizAttempt.findOne({
        studentID: studentID,
        quizID: quizID
    });
    if (quizAttempt) {
        return {
            status: 200,
            quizAttempt: quizAttempt
        };
    }
    console.log(quizID, studentID);
    return {
        status: 400,
        message: "Quiz not attempted"
    };
}