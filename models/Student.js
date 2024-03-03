const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        default : "N/A"
    },
    department: {
        type: String,
        default : "N/A"
    },
    year: {
        type: Number,
        default : 0
    },
    semester: {
        type: Number,
        default : 0
    },
    rollNo: {
        type: Number,
        unique: true,
        default : 0
    }
});

export default mongoose.models.student || mongoose.model("student", studentSchema);