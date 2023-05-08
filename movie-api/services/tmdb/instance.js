const axios = require("axios");

tmdbInstance = axios.create({baseURL: 'https://api.themoviedb.org/3'})
tmdbInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${process.env.TMDB_API_KEY}`
    config.headers["Content-Type"] = "application/json;charset=utf-8"

    return config
})

module.exports = {tmdbInstance}