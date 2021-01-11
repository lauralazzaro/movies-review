const Movie = require('../models/movieModel');
const fs = require('fs');

exports.getAllMovie = (req, res, next) => {
    res.end('Get All Movies');
};

exports.getOneMovie = (req, res) => {
    res.end('Get One Movie');
};

exports.addMovie = (req, res) => {
    res.end('Create One Movie');
};

exports.updateMovie = (req, res) => {
    res.end('Update One Movie');
};

exports.deleteMovie = (req, res) => {
    res.end('Delete One Movie');
};

exports.likes = (req, res) => {
    res.end('Handles likes or dislikes');
};