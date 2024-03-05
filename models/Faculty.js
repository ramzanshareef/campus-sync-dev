const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
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
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "college",
        // required: true,
    },
    subjects: {
        type: [String],
    },
    department: {
        type: String,
        default: "N/A",
    }
});

export default mongoose.models.faculty || mongoose.model("faculty", facultySchema);