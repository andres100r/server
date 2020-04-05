const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const direccionSchema = Schema({
  Direccion: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('direccion5', direccionSchema);
