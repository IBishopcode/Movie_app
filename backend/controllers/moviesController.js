// const https = require('https')
const Movie = require('../models/movie.model')
const User = require('../models/user.model')
const superagent = require('superagent');
const jwt = require('jsonwebtoken')

getRequest = url => {
    return superagent.get(url).then(res => {
        return res.body
    });
}

const getUrl = uri => {
    const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY
    console.log(MOVIE_DB_KEY)
    return `https://api.themoviedb.org/3/${uri}?api_key=${MOVIE_DB_KEY}&language=en-US&page=1`
}


module.exports = {
    getAll:(req,res) => {
        return getRequest(getUrl('movie/popular')).then(response => {
            res.json(response);
        }).catch(error => {
            res.json(error);
        })
    },
    findOne:(req,res) => {
        const id = req.params.id
        // getUrl variable is movieDB API endpoint URI
        return getRequest(getUrl(`movie/${id}`)).then(response => {
            console.log(id)
            res.json(response);
        }).catch(error => {
            res.json(error);
        })
    },
    create: (req, res) => {
        console.log("Inside create")
        const { id, tagline, overview, poster_path, title } = req.body;
        const movie = {
            tmdbid: id,
            tagline,
            overview,
            poster_path,
            title

        };
        const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true });
        const user_id = decodedJwt.payload.user_id;
        console.log("user id: "+ user_id)
        //using upsert will update the record if it already exist in the DB
        //if it doesn't exist it will create it
        Movie.findOneAndUpdate(
            { tmdbid: movie.tmdbid },// this is what we are looking for in the DB to know if it exist
            movie, //this is the data we will use to either update or create a record
            {
                upsert: true, // this enables us to update or create in one single command
                new: true, // returning updated movie object
                setDefaultsOnInsert: true,
                runValidators:true
            })
            .then((updatedMovie) => {
                console.log(updatedMovie)
                User.findByIdAndUpdate(user_id, {
                    $addToSet: { favorites: updatedMovie._id },
                },
                    {new:true, useFindAndModify:false}
                )
                    .populate("favorites", "-__v")
                    .then((updatedUser) => {
                        console.log(updatedUser)
                        res.json({
                            message: " Congratulations you have favorited " + updatedMovie.title,
                            updatedMovie,
                            updatedUser
                        })
                    })
                    .catch((err) => {
                        res.status(400).json(err)
                    })
                
                
        } )
            .catch((err => {
                console.log(err)
                res.status(400).json(err)
            }));
    },
    findFavorites: (req, res) => {
        const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
        const user_id = decodedJwt.payload.user_id;
        console.log("user id: " + user_id)
        User.findById(user_id)
            .populate("favorites", "-__v")
            .then((userObj) => {
                console.log(userObj)
                res.json(userObj.favorites)
            })
            .catch((err) => {
                console.log(err)
                res.json(err)
            })
    },
    delete: (req, res) =>
    {
    Movie.findByIdAndDelete(req.params.id)
    .then(deletedMovie => res.json(  deletedMovie ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
}

}

