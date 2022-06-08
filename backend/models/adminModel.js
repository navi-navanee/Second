const bcrypt = require('bcryptjs');
const mongoose=require('mongoose')

const adminSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email :{
            type:String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        }
    }
)

adminSchema.pre('save',async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt)
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const Admin=mongoose.model('Admin',adminSchema);

module.exports = Admin ;