const { Position } = require('../models/');

class PositionService {
    async create(data) {
        const position = new Position({
            name: data.name,
            salary: data.salary,
            overtime_salary: data.overtime_salary
        });

        return position.save();
    }
    
    async find(filter) {
        return await Position.find(filter).populate('hasStaff');
    }

    async findLimit(filter, numLimit, skipNum, sortBy) {
        return await Position.find(filter).sort(sortBy).limit(numLimit).skip(skipNum).populate('hasStaff');
    }

    async update(positionId, data) {
        const result = await Position.findByIdAndUpdate(
            {
                _id: positionId,
            },
            {
                $set: data,
            }
        )

        return result;
    }

    async updatePositionWithNewStaff(positionId, staffId) {
        return await Position.findByIdAndUpdate(
            positionId,
            {
                $push: {
                    hasStaff: staffId
                }
            }
        )
    }

    async updatePositionWithRemoveStaff(positionId, staffId) {
        return await Position.findByIdAndUpdate(
            positionId,
            {
                $pullAll: {
                    hasStaff: [staffId]
                }
            }
        )
    }

    async delete(positionId) {
        const result = await Position.findByIdAndDelete(
            {
                _id: positionId,
            },
        )

        return result;
    }
}

module.exports = new PositionService;