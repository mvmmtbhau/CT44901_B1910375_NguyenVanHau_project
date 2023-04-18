const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name: String,
    salary: Number,
    overtime_salary: Number,
    hasStaff: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Staff',
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Position', PositionSchema);