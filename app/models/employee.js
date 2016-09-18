'use strict';

let mongoose = require('mongoose');

let employee = mongoose.model('employee', {
    empId : {type : String},
    empPassword : {type : String, default : 'password'},
    empName : {type : String, default : ''},
    status : {type : String, default : 'A'},
    updated: {type: Date, default: Date.now}
});

module.exports = employee;
