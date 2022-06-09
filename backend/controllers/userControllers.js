const asyncHandler = require ('express-async-handler')
const User =require('../models/userModel');
const generateToken = require('../utils/generateToken');

//Load input validation

const validateRegisterInput= require ('../validation/register')

//rgistation form
const registerUser= asyncHandler(async (req,res) => { 
    const { name, email, password} =req.body;
    const { errors, isValid } = await validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const userExist=await User.findOne({email})

    if(userExist) {
        errors.email = "This is Email is already Exist";
        return res.status(400).json(errors);
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

//LOGIN FORM


const validateLoginInput= require ('../validation/login')

const authUser= asyncHandler(async (req,res) => {
    const { email, password} =req.body;
    const { errors, isValid } = await validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
      }

    const user =await User.findOne({ email });

    // if(user &&  (await user.matchPassword(password))) {
    //     res.json({
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         token:generateToken(user._id)
    //     })
    // }else {
    //     res.status (400)
    //     throw new Error ("Invalid Email or Psssword !" )
    // }
    if (user) {
        let notMatch = await user.matchPassword(password);
        if (notMatch) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          errors.password = "Password inccorrest";
          res.status(400).json(errors);
        }
      } else {
        errors.email = "User not found";
        res.status(400).json(errors);
      }
   

})


module.exports = { registerUser , authUser }