const mongoose = require('mongoose');

const applyStudentSchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    course:String,
    city:String,
});


module.exports = mongoose.model('applystudent', applyStudentSchema);