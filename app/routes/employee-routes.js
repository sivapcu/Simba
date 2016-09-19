'use strict';

let employee = require('../models/employee');

module.exports = function(app, passport) {
    /**
    * Server routes shall come here. Handle things like api calls, Authentication routes etc
    */

    //sample api routes
    app.get('/api/employees', function(req, res){
        // use mongoose to get all employees in the database
        employee.find(function(err, employees){
            //if there is an error retrieving, send the error.
            //Nothing after res.send(err) will execute.
            if(err) {
                res.send(err);
            }
            res.json(employees); // return all employees in json format.
        });
    });

    app.post('/api/employees', function(req, res){
        let newEmployee = new employee();
        newEmployee.empId = req.body.empId;
        newEmployee.empPassword = req.body.empPassword;
        newEmployee.empName = req.body.empName;
        newEmployee.save(function(err){
            if(err) {
                res.send(err);
            }
            res.json({message : 'Employee Created!!!'});
        });
    });

    app.get('/api/employees/:employeeId', function(req, res){
        employee.findById(req.params.employeeId, function(err, employee){
            if(err) {
                res.send(err);
            }
            res.json(employee);
        });
    });

    app.put('/api/employees/:employeeId', function(req, res){
        employee.findById(req.params.employeeId, function(err, employee){
            if(err) {
                res.send(err);
            }
            employee.empPassword = req.body.empPassword;
            employee.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message : 'Employee updated!!!'});
            });
        });
    });

    app.delete('/api/employees/:employeeId', function(req, res) {
        employee.remove({
            _id : req.params.employeeId
        }, function(err, employee) {
            if(err) {
                res.send(err);
            }
            res.json({message : 'Successfully Deleted!!!'});
        });
    });
};
