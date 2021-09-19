const mongoose = require('mongoose')
const movieModel = require('./model')

exports.getMovies = async (req, res) => {
    const query = req.query

    let movies = await movieModel.find()

    if(movies == null){
        return res.status(404).json({success:false,message : "Movies not found"})
    }

    let filtered

    if(query.title){
        filtered = movies.filter( (movie) => {
            return movie.title.includes(query.title)
        })
    }
    else if(query.rating){
        // filtered = await movieModel.find({rating: query.rating})
        filtered = movies.filter( (movie) => {
            return movie.rating < query.rating
        })
        
    }
    else{
        filtered = movies
    }
    res.status(200).json({ movies: filtered })
}

exports.getMovie = async (req, res) => {
    const movieTitle = req.params.movie

    const movie = await movieModel.findOne({title : movieTitle})
    // console.log(movie)
    res.status(200).json({ movie: movie })
}

exports.addMovie = async (req, res) => {
    const { title, mainActor, rating, projectionTimeOne, projectionTimeTwo, projectionTimeThree } = req.body
    const data = {
        title: title ,
        mainActor: mainActor,
        rating: rating,
        projectionTimeOne: projectionTimeOne,
        projectionTimeTwo: projectionTimeTwo,
        projectionTimeThree: projectionTimeThree
    }
    // console.log(data)
    let movie = await movieModel.findOne({title : data.title})
    console.log(movie)
    if(movie == null){
        movie = await movieModel.create(data)
        // console.log(movie)
        return res.status(201).json({ movie: movie })
    }
    return res.status(404).json({success:false,message : "Movies already exists"})
}



exports.deleteMovie = async (req,res) => {

    const movieTitle = req.params.movie
    // console.log(movieTitle);
    await movieModel.deleteOne({title : movieTitle})

    const movies = await movieModel.find()
    
    res.status(200).json({ movies: movies })
    
}
