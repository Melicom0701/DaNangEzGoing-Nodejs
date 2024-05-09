module.exports = (sequelize, DataTypes) => {
    const Destination_Menu = sequelize.define('Destination_Menu', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        destinationId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        price: {
            type: DataTypes.FLOAT,
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {});
    Destination_Menu.associate = function (models) {
        Destination_Menu.belongsTo(models.Destination, {
            foreignKey: 'destinationId',
            onDelete: 'CASCADE',
        });
    };
    return Destination_Menu;

}