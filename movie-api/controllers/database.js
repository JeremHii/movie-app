const {MovieRepository} = require("../repositories/movie");
const {Op} = require("sequelize");
const {DirectorRepository} = require("../repositories/director");
const {GenreRepository} = require("../repositories/genre");
const {TmdbAPI} = require("../services/tmdb/api");

class DatabaseController {
    static async canPopulate(req, res){
        res.status(200).send(await GenreRepository.count() === 0 && await DirectorRepository.count() === 0 && await MovieRepository.count() === 0)
    }
    static async populate(req, res){
        if(await GenreRepository.count() > 0 || await DirectorRepository.count() > 0 || await MovieRepository.count() > 0){
            res.status(400).json({"message": "Il y a déjà des données enregistrées dans la base de données !"})
            return
        }

        const pageCount = parseInt(req.query.pageCount) || 10;

        if(pageCount > 30){
            res.status(400).json({"message": "Vous ne pouvez pas demander autant de films, maximum 30 pages."})
            return
        }

        let genres = await TmdbAPI.getGenres()

        console.log(`Fetched ${genres.length} genres`)

        for(let genre of genres){
            genre.internalId = (await GenreRepository.create({name: genre.name})).id
        }

        let movies = []

        for(let i = 1; i < pageCount+1; i++){
            movies.push(...(await TmdbAPI.getPopularMovies(i)))
        }

        console.log(`Fetched ${movies.length} movies`)

        let directors = []

        let i = 0;
        for(let movie of movies){
            let director = await TmdbAPI.getMovieDirector(movie.id)
            if(director){
                director = await TmdbAPI.getPeople(director.id)
                movie.directorId = director.id
            }
            if(director && !directors.find((directorToFind) => directorToFind.id === director.id)){
                directors.push(director)
            }
            i++
        }

        console.log(`Fetched ${directors.length} directors`)

        for(let director of directors){
            director.internalId = (await DirectorRepository.create({
                firstName: director.name.split(" ")[0],
                lastName: director.name.split(" ").slice(1).join(" "),
                nationality: "Inconnue",
                birthDate: new Date(director.birthday),
                picture: director.profile_path ? TmdbAPI.getImageUrl(director.profile_path) : null,
                biography: director.biography
            })).id
        }

        for(let movie of movies){
            const movieDirector = directors.find((director) => director.id === movie.directorId)
            const movieDb = await MovieRepository.create({
                title: movie.title,
                releaseDate: movie.release_date,
                synopsis: movie.overview.length > 2 ? movie.overview : null,
                lang: movie.original_language,
                poster: movie.poster_path ? TmdbAPI.getImageUrl(movie.poster_path) : null,
                background: movie.backdrop_path ? TmdbAPI.getImageUrl(movie.backdrop_path, "original") : null,
                directorId: movieDirector ? movieDirector.internalId : null
            })

            const movieGenreIds = movie.genre_ids.map((genreId) => genres.find((genre) => genre.id === genreId).internalId)

            const genresDb = await GenreRepository.getAll({where: {id: movieGenreIds}})
            await movieDb.addGenres(genresDb)
        }


        res.status(201).json({"message": "La base de données a été remplie de données !"})
    }
}

module.exports = {DatabaseController}