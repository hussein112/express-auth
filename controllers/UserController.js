const User = require("../models/User");

module.exports.details = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Something went Wrong' });
    }
}