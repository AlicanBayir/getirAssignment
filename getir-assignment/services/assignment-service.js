'use strict';
const DatabaseService = require('../services/db/database-service');
const MongoOperationService = require('../services/db/mongo-operation-service');
const AssigmentDao = require('../dao/assignment-dao');
const AppError = require('../errors/app-error');

class AssignmentService {
    constructor() {
        this.databaseService = new DatabaseService();
        this.db = new MongoOperationService();
        this.assignmentDao = new AssigmentDao();
    }

    async createAssignmentRecord(reqBody) {
        await this.databaseService.getConnectionClient(this.db);
        let response = await this.assignmentDao.aggregate(this.db.getSchema(), reqBody);
        if (response.data) {
            return {
                code: successConst.SUCCES_CODE,
                msg: successConst.SUCCES_MESSAGE,
                records: response.data
            }
        } else {
            throw new AppError(errorConst.ERR_CODE, errorConst.ERR_MESSAGE, errorConst.ERR_INTERNAL_SERVER_ERROR, {});
        }
    }
}

module.exports = AssignmentService;
