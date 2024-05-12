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
        SavedDestination.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        });
        SavedDestination.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        onDelete: 'CASCADE',
        });
    };
    return SavedDestination;
}