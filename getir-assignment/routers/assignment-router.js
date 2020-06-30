'use strict';

const express = require('express');
const router = express.Router();
const AssignmentService = require('../services/assignment-service');
const ValidationHelper = require('../utils/validation-service');
const assignmentService = new AssignmentService();
let validate = new ValidationHelper();


router.post('/', async (req, res, next) => {
    try {
        logger.info("ASSIGNMENT_ROUTER_POST_REQUEST_RECEIVED");
        validateBody(req);
        logger.info("ASSIGNMENT_ROUTER_POST_REQUEST_VALIDATION_SUCCESS");
       let response =  await assignmentService.createAssignmentRecord(req.body);
        res.success('ASSIGNMENT_POST_SUCCESS', '', response);
    } catch (err) {
        logger.error("ASSIGNMENT_ROUTER_POST_REQUEST_ERROR");
        next(new Error(err.message));
    }

});

function validateBody(req) {
    validate.validate("startDate", req.body.startDate, {required: true, type: 'date'});
    validate.validate("endDate", req.body.endDate, {required: true, type: 'date'});
    validate.validate("minCount", req.body.minCount, {required: true, type: 'number'});
    validate.validate("maxCount", req.body.maxCount, {required: true, type: 'number'});
}


module.exports = router;
