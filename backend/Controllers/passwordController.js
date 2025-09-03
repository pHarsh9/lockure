const asyncHandler = require('express-async-handler')
const Password = require('../Models/passwordModel')
const User = require('../Models/userModel')

//@desc Get passwords
//@route GET /api/passwords
//@access PRIVATE
const getPasswords = asyncHandler(async (req, res)=>{
    const passwords = await Password.find({user: req.user.id.toString()})
    res.status(200).json(passwords)
})

//@desc Set passwords
//@route POST /api/passwords
//@access PRIVATE
const setPasswords = asyncHandler(async (req, res)=>{
    if(!(req.body.text && req.body.password)){
        res.status(400)
        throw new Error('Please add text field')
    }
    const password = await Password.create({
        text: req.body.text,
        password: req.body.password,
        user: req.user.id
    })
    res.status(200).json(password)
    
})

//@desc Update passwords
//@route PUT /api/passwords/:id
//@access PRIVATE
const updatePasswords = asyncHandler(async (req, res)=>{
    const password = await Password.findById(req.params.id)
    if(!password){
        res.status(400)
        throw new Error('password not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Check for logged in user and password user
    if(password.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedpassword = await Password.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedpassword)
})

//@desc Delete passwords
//@route DELETE /api/passwords/:id
//@access PRIVATE
const deletePasswords = asyncHandler(async (req, res)=>{
    const password = await Password.findById(req.params.id)
    if(!password){
        res.status(400)
        throw new Error('password not found')
    }
    
    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Check for logged in user and password user
    if(password.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await password.deleteOne();
    res.status(200).json({id: req.params.id})
})



module.exports = { getPasswords, setPasswords, updatePasswords, deletePasswords }