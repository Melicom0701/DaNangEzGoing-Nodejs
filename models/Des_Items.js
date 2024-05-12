module.exports = (sequelize, DataTypes) => {
    const Des_Items = sequelize.define('Des_Items', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },);
    Des_Items.associate = function (models) {
        Des_Items.belongsTo(models.Destination, {
            foreignKey: 'destinationId',
            onDelete: 'CASCADE',
        });
        Des_Items.hasMany(models.Categories_Item, {
            foreignKey: 'itemId'
        });
        
    };
   
    return Des_Items;


}