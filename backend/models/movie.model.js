const  mongoose  = require("mongoose");

const MovieSchema = new mongoose.Schema({
    tmdbid: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
},
    { timestamps: true })
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;