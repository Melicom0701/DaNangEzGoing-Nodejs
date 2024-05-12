module.exports = (sequelize, DataTypes) => {
    const Destination = sequelize.define('Destination', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        startTime : {
            type: DataTypes.TIME,
            defaultValue: '08:00:00',
        },
        endTime : {
            type: DataTypes.TIME,
            defaultValue: '22:00:00'
        },

        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        averagePrice: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },

        x: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        y: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isActive : {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        category : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

    }, {});
    Destination.associate = function (models) {
    };
    return Destination;
}