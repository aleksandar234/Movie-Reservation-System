const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router()

const { makeReservation, getReservation, getReservations, deleteReservation, changeReservation } = require('./reserveController')

router.get('/getReservations', authenticateToken, getReservations)
router.get('/getReservation', authenticateToken, getReservation)
router.post('/makeReservation', authenticateToken, makeReservation)
router.delete('/:user/:movie', authenticateToken, deleteReservation)
router.put('/changeReservation', authenticateToken, changeReservation)

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // console.log(`got header: ${authHeader}`)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // console.log(`got token: ${token}`)
        jwt.verify(token, 'secretKey', (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            // console.log(`token is valid!`)
            // console.log(req.user)
            next()
        })
    } else {
        return res.sendStatus(401)
    }
}

module.exports = router
