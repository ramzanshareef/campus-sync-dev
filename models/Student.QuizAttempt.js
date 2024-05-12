import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
    },
    quizID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
        required: true
    },
    responses: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
        },
        selectedOption: {
            type: mongoose.Schema.Types.ObjectId,
        },
    }],
    score: {
        type: Number,
        default: 0
    },
});

export default mongoose.models.quizattempt || mongoose.model("quizattempt", quizAttemptSchema);