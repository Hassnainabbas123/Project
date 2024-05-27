const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "MynameisSyedSabihUlHasssanShahBukhari"


// CreateUser endpoint
router.post("/CreateUser",
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        //  yahan encryption ho rhi
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

// LoginUser endpoint
router.post("/LoginUser",
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "Please enter correct Email and Password" });
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                return res.status(400).json({ errors: "Please enter correct Email Password" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
);

module.exports = router;
