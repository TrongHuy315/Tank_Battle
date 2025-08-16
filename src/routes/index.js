const homeRoutes = require('./home.routes.js');
const profileRoutes = require('./profile.routes.js');
const introductionRoutes = require('./introduction.routes.js');
const registerRoutes = require('./register.routes.js');
const loginRoutes = require('./login.routes.js');

module.exports = function (app) {
    app.use('/home', homeRoutes);
    app.use('/profile', profileRoutes);
    app.use('/introduction', introductionRoutes);
    app.use('/register', registerRoutes);
    app.use('/login', loginRoutes);
};
