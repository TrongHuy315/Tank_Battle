const homeRoutes = require('./home.routes.js');
const chatRoutes = require('./chat.routes.js');
const profileRoutes = require('./profile.routes.js');
const introductionRoutes = require('./introduction.routes.js');
const registerRoutes = require('./register.routes.js');
const loginRoutes = require('./login.routes.js');
const gameRoutes = require('./game.routes.js');

module.exports = function (app) {
    // Thêm route mặc định để chuyển hướng từ trang chủ đến /home
    app.get('/', (req, res) => {
        res.redirect('/home');
    });
    
    app.use('/home', homeRoutes);
    app.use('/chat', chatRoutes);
    app.use('/profile', profileRoutes);
    app.use('/introduction', introductionRoutes);
    app.use('/register', registerRoutes);
    app.use('/login', loginRoutes);
    app.use('/game', gameRoutes);
};
