const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
    time: {
        type: Number, // Tempo de desafio
        required: true,
    }
});

const Time = mongoose.model("Time", TimeSchema);
exports.Time = Time;
exports.TimeSchema = TimeSchema;