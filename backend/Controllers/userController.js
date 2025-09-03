const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

//@desc Register user
//@route POST /api/users
//@access PUBLIC
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all the fiels')
        
    }
    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('USer already exists!')
        
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid details')
    }
})

//@desc Login user
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = await req.body
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password, user.password)){
        res.json({
             _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Register user
//@route POST /api/users/me
//@access PRIVATE
const getMe = asyncHandler(async(req, res)=>{
    res.status(200).json(req.user) 
})

//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}