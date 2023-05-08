const {Sequelize} = require("sequelize");
const MovieModel = require('./models/movie');
const DirectorModel = require('./models/director');
const GenreModel = require('./models/genre');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
});

const Movie = MovieModel(sequelize, Sequelize.DataTypes);
const Director = DirectorModel(sequelize, Sequelize.DataTypes);
const Genre = GenreModel(sequelize, Sequelize.DataTypes);

// Set up associations
Movie.associate({ Director, Genre });
Director.associate({ Movie });
Genre.associate({ Movie });

sequelize.sync()

module.exports = {Movie, Director, Genre}
