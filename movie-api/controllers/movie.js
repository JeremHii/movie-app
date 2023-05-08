const {BaseController} = require("./base");
const {MovieRepository} = require("../repositories/movie");

class MovieController extends BaseController {
    static repository = MovieRepository
}

module.exports = {MovieController}
