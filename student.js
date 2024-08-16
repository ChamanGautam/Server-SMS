const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    college:String,
    course:String,
    totalfee:Number,
    paidfee:Number,
    leftfee:Number,
    city:String,
    joindate:String
});


module.exports = mongoose.model('student', studentSchema);