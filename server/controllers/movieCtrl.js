const Movie = require('../models/movieModel');
const fs = require('fs');


/**
 * Return all movie's reviews in the db as JSON objects
 */
exports.getAllMovie = (req, res) => {
    Movie.find()
        .then((movies) => {
            res.status(200).json(movies);
        }).catch((error) => {
        res.status(400).json({error});
    });
};

/**
 * Return one movie's review in the db as JSON object
 *
 * @param req.params.id {String} MongoDB ID of the selected movie
 */
exports.getOneMovie = (req, res) => {
    Movie.findOne({_id: req.params.id}
    ).then((movies) => {
        res.status(200).json(movies);
    }).catch((error) => res.status(400).json({error}));
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