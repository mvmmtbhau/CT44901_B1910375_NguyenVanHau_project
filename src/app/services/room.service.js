const { Room } = require('../models/');

class AuthService {
    async create(data) {
        const room = new Room({
            roomname: data.roomname,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            image: data.image,
        });

        return room.save();
    }
    
    async update(roomId, data) {
        const result = await Room.findByIdAndUpdate(
            {
                _id: roomId,
            },
            {
                $set: data,
            }
        )

        return result;
    }

    async delete(roomId) {
        const result = await Room.findByIdAndDelete(
            {
                _id: roomId,
            },
        )

        return result;
    }

    async find(filter) {
        return await Room.find(filter);
    }

    async findLimit(filter, numLimit, skipNum, sortBy) {
        return await Room.find(filter).sort(sortBy).limit(numLimit).skip(skipNum);
    }
}

module.exports = new AuthService;