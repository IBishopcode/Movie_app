const UserController = require('../controllers/user.controller');
const MovieController = require('../controllers/moviesController');

const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get('/api/users/favorites', authenticate, MovieController.findFavorites);
    app.delete('/api/users/favorites/:id', authenticate, UserController.removeFavorite);
}