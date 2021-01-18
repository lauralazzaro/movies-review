const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
require('dotenv').config();

const pwdCheck = new passwordValidator();

pwdCheck
    .is().min(8)        // Minimum length 8
    .is().max(100)      // Maximum length 100
    .has().uppercase()       // Must have uppercase letters
    .has().lowercase()       // Must have lowercase letters
    .has().digits(2)   // Must have at least 2 digits
    .has().not().spaces();   // Should not have spaces

/**
 * Signup functionality expect the body request to be as follows:
 *
 * @param {Object} req.body - JSON object contain password, email and role attributes in body
 * @param {String} req.body.email - User's email for registration
 * @param {String} req.body.password - User's password that will be encrypted
 * @param {String} req.body.role - User's role by default is 'user' when not specified as 'admin'
 */
exports.signup = (req, res) => {
    const pwd = req.body.password;
    const email = req.body.email;
    const role = req.body.role || 'user';

    if (pwdCheck.validate(pwd)) {
        bcrypt.hash(pwd, 10)
            .then((hash) => {
                const user = new User({
                    email,
                    password: hash,
                    role
                });
                user.save()
                    .then(() => res.status(201).json({message: 'User created!'}))
                    .catch((error) => res.status(400).json({error}));
            })
            .catch((error) => res.status(500).json({error}));
    } else {
        console.error('Invalid password');
    }
};

/**
 * Login functionality expect the body request to be as follows:
 *
 * @param {Object} req.body - JSON object contain password, email
 * @param {String} req.body.password - User's password
 * @param {String} req.body.email - User's email
 */
exports.login = (req, res) => {
    const emailReq = req.body.email;
    const password = req.body.password;

    User.findOne({email: emailReq})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: 'User not found'});
            }
            bcrypt.compare(password, user.password)
                .then((valid) => {
                    if (!valid) {
                        throw new Error('Invalid password');
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.JWT_TOKEN,
                            {expiresIn: '24h'}
                        )
                    });
                    console.log(res);
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};
