const express = require('express');
const cors = require('cors');
const {sequelize} = require("./models");
require('dotenv').config();
const app = express();

app.use(express.json()).use(cors());

app.use('/directors', require('./routes/director'));
app.use('/movies', require('./routes/movie'));
app.use('/genres', require('./routes/genre'));
app.use('/database', require('./routes/database'));
app.use('/search', require('./routes/search'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
