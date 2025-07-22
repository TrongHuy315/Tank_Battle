const homeRoutes = require('./home.routes.js');

module.exports = function (app) {
    app.use('/home', homeRoutes);
};
