const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomname: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String,
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', RoomSchema);