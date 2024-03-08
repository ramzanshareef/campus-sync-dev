const mongoose = require("mongoose");

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
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
        required: true,
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
    },
});

export default mongoose.models.course || mongoose.model("course", courseSchema);