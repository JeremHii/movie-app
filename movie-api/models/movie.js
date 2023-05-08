const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        static associate(models) {
            Movie.belongsTo(models.Director, {
                foreignKey: 'directorId',
                as: 'director'
            })
            Movie.belongsToMany(models.Genre, {
                through: 'movie_genres',
                foreignKey: 'movieId',
                as: 'genres'
            })
        }
    }

    Movie.init(
        {
            title: DataTypes.STRING,
            releaseDate: DataTypes.DATEONLY,
            synopsis: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lang: DataTypes.STRING,
            poster: {
                type: DataTypes.STRING,
                allowNull: true
            },
            background: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: 'movie',
        }
    );

    return Movie;
};