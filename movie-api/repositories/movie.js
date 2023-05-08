const {Movie, Director, Genre} = require('../models');
const {BaseRepository} = require("./base");
const {GenreRepository} = require("./genre");

class MovieRepository extends BaseRepository {
    static model = Movie
    static includes = {both: [{model: Director, as: "director"}, {model: Genre, as: "genres"}]};

    static async update(id, data){
        const item = await this.getOne(id)
        if(item) {
            await item.update(data)
            if(data.genreIds) await item.setGenres(data.genreIds)
        }

        return await this.getOne(id)
    }
}

module.exports = {MovieRepository}