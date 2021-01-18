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

/**
 * Create one movie's review in the db
 *
 * @param req.body.movie {Object} Movie Object JSON containing:
 * @param {String} req.body.movie.userId
 * @param {String} req.body.movie.title
 * @param {String} req.body.movie.genre
 * @param {String} req.body.movie.year
 * @param {String} req.body.movie.plot
 *
 *
 * @param {String} imageUrl Obtained when added
 * @param {Number} likes initialized at 0
 * @param {Number} dislikes initialized at 0
 * @param {Array} usersLiked initializes as empty array
 * @param {Array} usersDisliked initializes as empty array
 *
 */
exports.addMovie = (req, res) => {
    const newMovie = new Movie({
        ...req.body.movie,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    newMovie.save()
        .then(() => res.status(201).json({ message: 'New movie created!' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateMovie = (req, res) => {
    res.end('Update One Movie');
};

/**
 * Delete one movie's review from the db
 *
 * @param req.params.id {String} MongoDB ID of the selected movie
 */
exports.deleteMovie = (req, res) => {
    Movie.findOne({ _id: req.params.id })
        .then((movie) => {
            const filename = movie.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Movie.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Movie deleted!' }))
                    .catch(error => res.status(400).json({ error }));
            });
        }).catch((error) => res.status(500).json({ error }));
};

exports.likes = (req, res) => {
    res.end('Handles likes or dislikes');
};