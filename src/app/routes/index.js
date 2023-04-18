const authRoute = require('./auth.route');
const roomRoute = require('./room.route');
const positionRoute = require('./position.route');
const staffRoute = require('./staff.route');

function route(app) {
    app.use('/api/auth', authRoute);
    app.use('/api/room', roomRoute);
    app.use('/api/staff', staffRoute);
    app.use('/api/position', positionRoute);
};

module.exports = route;