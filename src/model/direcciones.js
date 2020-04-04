const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  Direccion: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('tasks', TaskSchema);
