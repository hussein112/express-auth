const mangoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt");

const UserSchema = new mangoose.Schema({
    username: {
        type: String,
        required: [true, "Email is Required!"],
        unique: [true, "Username already exists!"],
        lowercase: true
    },
    name: {
        type: String,
        required: [true, "Name is Required!"],
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: [true, "Email already exists!"],
        lowercase: true,
        validate: [isEmail, 'Please enter a Valid Email.']
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minLength: [8, 'Minimum Password Length is 6']
    }
})


UserSchema.statics.login = async (username, password) => {
    if(username){
        const user = await User.findOne({username});
        if(user){
            if(password){
                const auth = await bcrypt.compare(password, user.password);
                if(auth){
                    return user;
                }
                throw Error("Incorrect Password"); 
            }
            throw Error("Password is required");
        }
        throw Error("Incorrect username");
    }
    throw Error("Username is Required");
}

const User = mangoose.model('user', UserSchema)

module.exports = User;