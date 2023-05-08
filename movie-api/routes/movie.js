const express = require('express');
const {MovieController} = require("../controllers/movie");
const router = express.Router();

router.get('/', (req, res) => MovieController.getAll(req, res));
router.get('/:id', (req, res) => MovieController.getOne(req, res));
router.post('/', (req, res) => MovieController.create(req, res));
router.patch('/:id', (req, res) => MovieController.update(req, res));
router.delete('/:id', (req, res) => MovieController.delete(req, res));

module.exports = router;
