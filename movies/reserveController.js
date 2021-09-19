const mongoose = require('mongoose')
const reserveModel = require('./reserveModel')
// const userModel = require('./userModel')


exports.getReservation = async (req, res) => {
    let reservation = await reserveModel.find()

    if(reservation == null){
        return res.status(404).json({success:false,message : "You did not make a reservation"})
    }

    res.status(200).json({ reservation: reservation })
}

exports.getReservations = async (req, res) => {
    let reservations = await reserveModel.find()

    if(reservations == null){
        return res.status(404).json({success:false,message : "No reservations found"})
    }
    res.status(200).json({ reservations: reservations })
}


exports.makeReservation = async (req, res) => {
    const { user_email, movieTitle, projectionDate, projectionTime, numberOfPpl } = req.body
    const data = {
        user_email: user_email ,
        movieTitle: movieTitle,
        projectionDate: projectionDate,
        projectionTime: projectionTime,
        numberOfPpl: numberOfPpl
    }

    console.log(`data=`, data)

    if(data.projectionTime == null){
        console.log(projectionTime);
        return res.status(404).json({success:false,message : "Didnt pick projection time"})
    }

    let reservs = await reserveModel.findOne({user_email: data.user_email, movieTitle: data.movieTitle})

    console.log(reservs);

    if(reservs == null) {
        reservs = await reserveModel.create(data)
        return res.status(201).json({ reservs: reservs })
    }

    return res.status(404).json({success:false,message : "Movie and User already in database"})
}


exports.deleteReservation = async (req,res) => {

    const userName = req.params.user
    const movieName = req.params.movie

    await reserveModel.deleteOne({user_email: userName, movieTitle: movieName})

    const reservations = await reserveModel.find()
    
    res.status(200).json({ reservations: reservations })
    
}

exports.changeReservation = async (req, res) => {
    const { user_email, movieTitle, projectionTime, numberOfPpl } = req.body
    const dataToUpdate = {
        user_email: user_email,
        movieTitle: movieTitle,
        projectionTime: projectionTime,
        numberOfPpl: numberOfPpl
    }

    if(dataToUpdate.projectionTime == null){
        console.log(projectionTime);
        return res.status(404).json({success:false,message : "Didnt pick projection time"})
    }

    let reservation = await reserveModel.findOne({user_email: dataToUpdate.user_email, movieTitle: dataToUpdate.movieTitle})

    if(reservation !== null){
        // console.log(reservation)
        // console.log(dataToUpdate)
       const reserv = await reserveModel.updateOne({user_email: dataToUpdate.user_email, movieTitle: dataToUpdate.movieTitle}, dataToUpdate); 
       return res.status(201).json({ reservation: reserv })
    }

    return res.status(404).json({success:false,message : "Reservation not Changed"})

}
