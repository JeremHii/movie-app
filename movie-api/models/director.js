const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Director extends Model {
        static associate(models) {
            Director.hasMany(models.Movie, {
                foreignKey: 'directorId',
                as: 'movies'
            })
        }
    }

    Director.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            nationality: {
                type: DataTypes.STRING,
                allowNull: true
            },
            birthDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            biography: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: 'director',
        }
    );

    return Director;
};