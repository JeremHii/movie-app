const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        static associate(models) {
            Genre.belongsToMany(models.Movie, {
                through: 'movie_genres',
                foreignKey: 'genreId',
                as: 'movies'
            })
        }
    }

    Genre.init(
        {
            name: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'genre',
        }
    );

    return Genre;
};