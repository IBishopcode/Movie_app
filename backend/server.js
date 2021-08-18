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


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));