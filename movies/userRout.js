const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router()

const { getUsers, postUser, getUser, loginUser } = require('./userController')

router.get('/getUsers', authenticateToken, getUsers)
router.post('/postUser', postUser)
router.get('/:user', authenticateToken, getUser)
router.post('/logIn', loginUser)

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
