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

exports.signup = (req, res, next) => {
    if (pwdCheck.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    role: req.body.role
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

exports.login = (req, res, next) => {

};
