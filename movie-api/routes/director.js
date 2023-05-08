const express = require('express');
const {DirectorController} = require("../controllers/director");
const router = express.Router();

router.get('/', (req, res) => DirectorController.getAll(req, res));
router.get('/:id', (req, res) => DirectorController.getOne(req, res));
router.post('/', (req, res) => DirectorController.create(req, res));
router.patch('/:id', (req, res) => DirectorController.update(req, res));
router.delete('/:id', (req, res) => DirectorController.delete(req, res));

module.exports = router;
