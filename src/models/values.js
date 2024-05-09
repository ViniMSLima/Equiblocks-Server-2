const mongoose = require("mongoose");

const ValuesSchema = new mongoose.Schema({
    values: {
        type: [Number], // Array de números
        required: true,
    }
});

const Values = mongoose.model("Values", ValuesSchema);
exports.Values = Values;
exports.ValuesSchema = ValuesSchema;