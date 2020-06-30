'use strict';

class DatabaseService {

    async getConnectionClient(db) {
        return await db.connect();
    }

}

module.exports = DatabaseService;
