module.exports = (sequelize, DataTypes) => {
    const SavedDestination = sequelize.define('SavedDestination', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        },
        userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        },
        destinationId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        },
    }, {});
    SavedDestination.associate = function (models) {
        // associations can be defined here
    };
    return SavedDestination;
}