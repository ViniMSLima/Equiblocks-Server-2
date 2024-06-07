const mongoose = require("mongoose");

const ProcessSchema = new mongoose.Schema({
  turma: {
    type: String,
    required: true,
    minlength: 3,
  },
  data: {
    type: String,
    required: true,
    minlength: 3,
  },
  periodo: {
    type: String,
    required: true,
    minlength: 3,
  },
  status: {
    type: String,
    required: true,
    minlength: 3,
  }
});

const Process = mongoose.model("Process", ProcessSchema);
exports.Process = Process;
exports.ProcessSchema = ProcessSchema;
