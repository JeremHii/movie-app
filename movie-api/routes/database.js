const express = require('express');
const router = express.Router();
const {DatabaseController} = require("../controllers/database");

router.get('/can-populate', async (req, res) => await DatabaseController.canPopulate(req, res))
router.get('/populate', async (req, res) => await DatabaseController.populate(req, res));

module.exports = router;
