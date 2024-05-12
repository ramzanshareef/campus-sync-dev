const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
                trim: true,
            },
            options: [
                {
                    option: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    correct: {
                        type: Boolean,
                        required: true,
                        default: false,
                    },
                },
            ],
            score: {
                type: Number,
                required: true,
                default: 1,
            }
        },
    ],
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
        required: true,
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
    },
    quizzes: {
        type: [quizSchema],
    },
});

export default mongoose.models.course || mongoose.model("course", courseSchema);