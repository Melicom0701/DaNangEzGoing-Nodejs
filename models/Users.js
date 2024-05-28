module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    avatar : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    salt : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    phone : {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            notEmpty : true,
        },
    },
    gender : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    roleId : {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },

    birthDate : {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty : true,
        },
    },
    isActive : {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isDeleted : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
}
