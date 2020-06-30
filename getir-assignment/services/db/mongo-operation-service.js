'use strict';
const mongoose = require('mongoose');
const assignmentModel = require('../../model/assignment');

class MongoOperationService {

    async connect() {
        if (!MongoOperationService.client) {
            MongoOperationService.client = await mongoose.connect(appConst.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
    }

    getSchema() {
        const assignmentSchema = new mongoose.Schema(assignmentModel);
        return mongoose.model('assignments', assignmentSchema);
    }

}

module.exports = MongoOperationService;
