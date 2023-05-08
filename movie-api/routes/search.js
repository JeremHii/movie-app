const express = require('express');
const router = express.Router();
const {TmdbAPI} = require("../services/tmdb/api");
const {GenreRepository} = require("../repositories/genre");
const {DirectorRepository} = require("../repositories/director");
const {MovieRepository} = require("../repositories/movie");
const {Op} = require("sequelize");

router.get('/', async (req, res) => {
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
})

module.exports = router;
