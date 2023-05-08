const {BaseController} = require("./base");
const {DirectorRepository} = require("../repositories/director");

class DirectorController extends BaseController {
    static repository = DirectorRepository
}

module.exports = {DirectorController}
