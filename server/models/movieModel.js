const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieModel = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    imageUrl: { type: String, required: true },
    plot: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Map, of: String, required: true },
    usersDisliked: { type: Map, of: String, required: true }
});

module.exports = mongoose.model('Movie', movieModel);