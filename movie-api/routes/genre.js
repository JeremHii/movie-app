const express = require('express');
const {GenreController} = require("../controllers/genre");
const router = express.Router();

router.get('/', (req, res) => GenreController.getAll(req, res));
router.get('/:id', (req, res) => GenreController.getOne(req, res));
router.post('/', (req, res) => GenreController.create(req, res));
router.patch('/:id', (req, res) => GenreController.update(req, res));
router.delete('/:id', (req, res) => GenreController.delete(req, res));

module.exports = router;
