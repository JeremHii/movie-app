const {Genre, Movie, Director} = require('../models');
const {BaseRepository} = require("./base");

class GenreRepository extends BaseRepository {
    static model = Genre
    static includes = {getOne: [{model: Movie, as: "movies", include: [{model: Director, as: "director"}, {model: Genre, as: "genres"}]}]};
}

module.exports = {GenreRepository}