const asyncHandler = require ('express-async-handler')
const Admin=require('../models/adminModel')
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


module.exports = { admin , authAdmin }