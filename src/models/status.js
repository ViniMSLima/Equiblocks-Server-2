const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
    }
});

const Status = mongoose.model("Status", StatusSchema);
exports.Status = Status;
exports.StatusSchema = StatusSchema;