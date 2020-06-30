class AssignmentDao {

    async aggregate(db, reqBody) {
        const { startDate, endDate, minCount, maxCount } = reqBody;
        let response = await db.aggregate([
            {
                $addFields: {
                    totalCount: {$sum: "$counts"}
                }
            },
            {
                $match: {
                    totalCount: {
                        $gte: parseInt(minCount),
                        $lte: parseInt(maxCount)
                    },
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: 1
                }
            }
        ]);
        return response;
    }
}

module.exports = AssignmentDao;