const {Genre} = require('../models');
const {BaseRepository} = require("./base");

class GenreRepository extends BaseRepository {
    static model = Genre
}

module.exports = {GenreRepository}