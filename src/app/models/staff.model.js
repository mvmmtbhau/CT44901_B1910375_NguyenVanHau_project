const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    fullname: String,
    email: String,
    gender: Number,
    birthday: String,
    phone: String,
    address: String,
    avatar: String,
    position: {
        type: mongoose.Types.ObjectId,
        ref: 'Position',
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Staff', StaffSchema);