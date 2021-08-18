const MovieController = require('../controllers/moviesController');

const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.get("/api/movie", MovieController.getAll);
    app.get("/api/movie/:id", MovieController.findOne);
    app.post("/api/movie/favorites", authenticate, MovieController.create);
}