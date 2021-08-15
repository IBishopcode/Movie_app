require("dotenv").config()
const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
const PORT = 7894
// const { getRequest } = require('./controllers/moviesController');
require('./routes/user.routes')(app)
require('./routes/movies.routes')(app)
require('./config/mongoose.config')

// const getUrl = uri => {
//     const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY
//     console.log(MOVIE_DB_KEY)
//     return `https://api.themoviedb.org/3/${uri}?api_key=${MOVIE_DB_KEY}&language=en-US&page=1`
// }

// app.get('/', (req, res) => {
//     res.json({'status': 'ok'})
// });

// // app.get variable is your localhost endpoint URI
// app.get('/movie', (req, res) => {
//     // getUrl variable is movieDB API endpoint URI
//     return getRequest(getUrl('movie/popular')).then(response => {
//         res.json(response);
//     }).catch(error => {
//         res.json(error);
//     })
// });

// app.get('/movie/:id', (req, res) => {
//     const id = req.params.id
//     // getUrl variable is movieDB API endpoint URI
//     return getRequest(getUrl(`movie/${id}`)).then(response => {
//         console.log(id)
//         res.json(response);
//     }).catch(error => {
//         res.json(error);
//     })
// })

// app.post('/movie/favorites', (req, res) => {
    
//      // 1. grab the movie id from req
//      const id = req.params.id
//      // 2. grab the user id from req or session
//      // 3. authenticate the user is actually logged in (if not return 403)
//      // 4. Check that the user hasn't favorited this movie already
//      // 4a. If the user has favorited it, return an error (code 400)
//      // 5. If user has not favorited it, add to database
//      // 5a. Before adding to database, ensure both user id and movie id are integers, not strings
//      // 6. Return successful 200 code 
    
//     res.status(404);
//     res.json({"status": "ok"})
// })



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));