const {tmdbInstance} = require("./instance");

class TmdbAPI {
    static lang = "fr-FR"
    static async getMovie(id) {
        return (await tmdbInstance.get(`/movie/${id}?language=${TmdbAPI.lang}`)).data
    }

    static async getMovieCredits(id) {
        return (await tmdbInstance.get(`/movie/${id}/credits?language=${TmdbAPI.lang}`)).data
    }

    static async getPopularMovies(page) {
        const res =  (await tmdbInstance.get(`/movie/popular?page=${page}&language=${TmdbAPI.lang}`)).data.results
        return res
    }

    static async getGenres() {
        return (await tmdbInstance.get(`/genre/movie/list?language=${TmdbAPI.lang}`)).data.genres
    }

    static async getMovieDirector(id) {
        const credits = await TmdbAPI.getMovieCredits(id)
        return credits.crew.find((crewMember) => crewMember.job === "Director");
    }

    static async getPeople(id) {
        return (await tmdbInstance.get(`/person/${id}?language=${TmdbAPI.lang}`)).data
    }

    static getImageUrl(path, size) {
        return `https://image.tmdb.org/t/p/${size || "w500"}${path}`
    }



}

module.exports = {TmdbAPI}