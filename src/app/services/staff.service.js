const { Staff} = require('../models/');

class StaffService {
    async create(data) {
        const staff = new Staff({
            fullname: data.fullname,
            gender: data.gender,
            birthday: data.birthday,
            phone: data.phone,
            email: data.email,
            address: data.address,
            avatar: data.avatar,
            position: data.position,
        });

        return staff.save();
    }
    
    async find(filter) {
        return await Staff.find(filter).populate('position');
    }

    async findLimit(filter, numLimit, skipNum, sortBy) {
        return await Staff.find(filter).sort(sortBy).limit(numLimit).skip(skipNum).populate('position');
    }

    async update(staffId, data) {
        const result = await Staff.findByIdAndUpdate(
            {
                _id: staffId,
            },
            {
                $set: data,
            }
        )

        return result;
    }

    async delete(staffId) {
        const result = await Staff.findByIdAndDelete(
            {
                _id: staffId,
            },
        ).populate('position');

        return result;
    }
}

module.exports = new StaffService;