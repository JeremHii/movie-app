const {BaseController} = require("./base");
const {GenreRepository} = require("../repositories/genre");

class GenreController extends BaseController {
    static repository = GenreRepository
}

module.exports = {GenreController}
