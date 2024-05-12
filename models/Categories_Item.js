module.exports = (sequelize, DataTypes) => {
    const Categories_Item = sequelize.define('Categories_Item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },  
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

    }, {});
    Categories_Item.associate = function (models) {
        Categories_Item.belongsTo(models.Categories, {
            foreignKey: 'categoryId',
            onDelete: 'CASCADE',
        });
        Categories_Item.belongsTo(models.Des_Items, {
            foreignKey: 'itemId',
            onDelete: 'CASCADE',
        });
        };
    return Categories_Item;
}