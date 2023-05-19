const {Director, Movie, Genre} = require('../models');
const {BaseRepository} = require("./base");

class DirectorRepository extends BaseRepository {
    static model = Director
    static includes = {getOne: [{model: Movie, as: "movies", include: [{model: Genre, as: "genres"}]}]};
}

module.exports = {DirectorRepository}