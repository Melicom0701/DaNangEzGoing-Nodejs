module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },


    }, {});
    Role.associate = function (models) {
        Role.hasOne(models.User, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE',
        });
    };
   
    return Role;
}



