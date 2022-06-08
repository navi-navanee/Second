const asyncHandler = require ('express-async-handler')
const User =require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser= asyncHandler(async (req,res) => { 
    const { name, email, password} =req.body;

    const userExist=await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error ('user alredy Exist')
    }

    const user =await User.create({
        name,
        email,
        password
    })
    
    if(user) {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Error Occured !")
    }
})

const authUser= asyncHandler(async (req,res) => {
    const { email, password} =req.body;

    const user =await User.findOne({ email });

    if(user &&  (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else {
        res.status (400)
        throw new Error ("Invalid Email or Psssword !" )
    }

})


module.exports = { registerUser , authUser }