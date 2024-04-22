const { Router } = require('express');
const UserController = require("../controllers/UserController");
const jwt = require('jsonwebtoken');

const router = Router();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
router.get("/user/:id", verifyToken, UserController.details);


module.exports = router;