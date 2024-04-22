const User = require("../models/User");
const JWT = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60;
const createJWT = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = createJWT(user._id);

        // cookieOptions = {
        //     maxAge: maxAge * 1000,
        //     httpOnly: true,
        //     domain: 'backend-auth-express.onrender.com',
        //     secure: true,
        //     sameSite: "lax",
        //     partitioned: true
        // }
        // res.cookie('jwt', token, cookieOptions)
        res.status(200).json({
            user_id: user._id,
            token
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports.logout_post = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).end()
}