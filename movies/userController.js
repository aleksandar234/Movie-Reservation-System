const mongoose = require('mongoose')
const userModel = require('./usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


exports.getUsers = async (req, res) => {
    // const query = req.query
    // console.log(req.query);
    let users = await userModel.find()

    if(users == null){
        return res.status(404).json({success:false,message : "No users found"})
    }

    // let filtered

    // if(query.name){
    //     filtered = users.filter( (user) => {
    //         return user.name.includes(query.name)
    //     })
    // }
    // else{
    //     filtered = users
    // }
    res.status(200).json({ users: users })
}

exports.getUser = async (req, res) => {
    const userEmail = req.params.user

    const user = await userModel.findOne({email : userEmail})

    if (!user) {
        res.statusMessage = `No user with email '${userEmail}' was found`
        res.status(404).end()
    } else {
        // console.log(user)
        res.status(200).json({ user: user })
    }
}


exports.postUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const data = {
        first_name: first_name ,
        last_name: last_name,
        email: email,
        password: password
    }

    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(data.password, salt);

    let user = await userModel.findOne({email : data.email})
    // console.log(user)
    if(user == null){
        user = await userModel.create(data)
        // console.log(user)
        return res.status(201).json({ user: user })
    }
    return res.status(404).json({success:false,message : "User already exists! "})
}


exports.loginUser = async (req, res) => {
    const body = req.body
    let user = await userModel.findOne({email : body.email})
    if(!user) {
        return res.status(404).json({success:false, message : "User doesn't exist! "})
    }
    // hesirati password

    const validPassword = await bcrypt.compare(body.password, user.password);

    jwt.sign({user: user}, 'secretKey', (err, token) => {
        if (err) throw err
        else {
            if(validPassword) return res.status(200).json({token, user: user, validPassword })
            else return res.status(403).json({success:false, message: "LogIn Failed"})
        }
    });
}
