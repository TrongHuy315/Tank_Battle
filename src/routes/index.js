const demoRoutes = require('./demo.routes.js');

module.exports = function (app) {
    app.use('/api/demo', demoRoutes);
};
