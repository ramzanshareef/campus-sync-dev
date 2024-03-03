const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
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
});

export default mongoose.models.college || mongoose.model("college", collegeSchema);