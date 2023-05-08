const {Director, Movie} = require('../models');
const {BaseRepository} = require("./base");

class DirectorRepository extends BaseRepository {
    static model = Director
    static includes = {getOne: [{model: Movie, as: "movies"}]};
}

module.exports = {DirectorRepository}