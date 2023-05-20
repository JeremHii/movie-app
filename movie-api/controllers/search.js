const {MovieRepository} = require("../repositories/movie");
const {Op} = require("sequelize");
const {DirectorRepository} = require("../repositories/director");
const {GenreRepository} = require("../repositories/genre");
const {TmdbAPI} = require("../services/tmdb/api");

class SearchController {
    static async searchInDb(req, res) {
        if(!req.query.query || req.query.query.trim().length < 3){
            res.status(400).json({message: "Votre recherche doit inclure au moins trois caractères."})
            return
        }
        const movies = await MovieRepository.getAll({where: {
                title: {
                    [Op.like]: `%${req.query.query}%`,
                },
            }})

        const directors = await DirectorRepository.getAll({where: {
                [Op.or]: [
                    {
                        firstName: {
                            [Op.like]: `%${req.query.query}%`,
                        },
                    },
                    {
                        lastName: {
                            [Op.like]: `%${req.query.query}%`,
                        },
                    },
                ],

            }})

        const genres = await GenreRepository.getAll({where: {
                name: {
                    [Op.like]: `%${req.query.query}%`,
                },

            }})

        res.json({movies, directors, genres})
    }

    static async searchPoster(req, res) {
        if(!req.query.query || req.query.query.trim().length < 3){
            res.status(400).json({message: "Votre recherche doit inclure au moins trois caractères."})
            return
        }
        const movies = await TmdbAPI.searchMovies(req.query.query)
        res.json(movies.filter((movie) => movie.poster_path !== null).map((movie) => TmdbAPI.getImageUrl(movie.poster_path)))
    }

    static async searchBackground(req, res) {
        if(!req.query.query || req.query.query.trim().length < 3){
            res.status(400).json({message: "Votre recherche doit inclure au moins trois caractères."})
            return
        }
        const movies = await TmdbAPI.searchMovies(req.query.query)
        res.json(movies.filter((movie) => movie.backdrop_path !== null).map((movie) => TmdbAPI.getImageUrl(movie.backdrop_path, "original")))
    }

    static async searchPersonPicture(req, res) {
        if(!req.query.query || req.query.query.trim().length < 3){
            res.status(400).json({message: "Votre recherche doit inclure au moins trois caractères."})
            return
        }
        const persons = await TmdbAPI.searchPersons(req.query.query)
        res.json(persons.filter((person) => person.profile_path !== null).map((person) => TmdbAPI.getImageUrl(person.profile_path)))
    }
}

module.exports = {SearchController}