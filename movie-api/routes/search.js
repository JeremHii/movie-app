const express = require('express');
const router = express.Router();
const {SearchController} = require("../controllers/search");
router.get('/', async (req, res) => await SearchController.searchInDb(req, res))
router.get('/poster', async (req, res) => await SearchController.searchPoster(req, res))
router.get('/background', async (req, res) => await SearchController.searchBackground(req, res))
router.get('/person-picture', async (req, res) => await SearchController.searchPersonPicture(req, res))

module.exports = router;
