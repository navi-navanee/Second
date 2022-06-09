const asyncHandler = require ('express-async-handler')
const Admin=require('../models/adminModel')
const User=require('../models/userModel')
const generateToken = require('../utils/generateToken');


const admin= asyncHandler(async (req,res) => { 
    const { name, email, password} =req.body;
    console.log(req.body);

    const adminExist=await Admin.findOne({email})

    if(adminExist) {
        res.status(400)
        throw new Error ('admin alredy Exist')
    }

    const admin =await Admin.create({
        name,
        email,
        password
    })
    
    if(admin) {
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            token:generateToken(admin._id),
        })
    }else{
        res.status(400)
        throw new Error("Error Occured !")
    }
})

const authAdmin= asyncHandler(async (req,res) => {
    const { email, password} =req.body;

    const admin =await Admin.findOne({ email });

    if(admin &&  (await admin.matchPassword(password))) {
        res.json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            token:generateToken(admin._id)
        })
    }else {
        res.status (400)
        throw new Error ("Invalid Email or Psssword !" )
    }

})

// get userDetails

const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });


//delete user 
const deleteUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.query.id);
      await user.remove();
      res.json({});
    } catch (error) {
      res.json(error);
    }
  });

  //get a user 
const getuser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });
  
  //update a user details
  const updateUser = asyncHandler(async (req, res) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
      const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.json(error);
    }
  });
  


module.exports = { admin , authAdmin ,getAllUsers,deleteUser ,getuser ,updateUser }