const {tmdbInstance} = require("./instance");

class TmdbAPI {
    static lang = "fr-FR"
    static async getMovie(id) {
        return (await tmdbInstance.get(`/movie/${id}`, {params: {language: TmdbAPI.lang}})).data
    }

    static async getMovieCredits(id) {
        return (await tmdbInstance.get(`/movie/${id}/credits`, {params: {language: TmdbAPI.lang}})).data
    }

    static async getPopularMovies(page) {
        return (await tmdbInstance.get(`/movie/popular`, {params: {page, language: TmdbAPI.lang}})).data.results
    }

    static async getGenres() {
        return (await tmdbInstance.get(`/genre/movie/list`, {params: {language: TmdbAPI.lang}})).data.genres
    }

    static async searchMovies(query) {
        return (await tmdbInstance.get(`/search/movie`, {params: {query, language: TmdbAPI.lang}})).data.results
    }

    static async searchPersons(query) {
        return (await tmdbInstance.get(`/search/person`, {params: {query, language: TmdbAPI.lang}})).data.results
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