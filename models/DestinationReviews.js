module.exports = (sequelize, DataTypes) => {
    const DestinationReview = sequelize.define('DestinationReview', {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        image : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        rating: {
            type: DataTypes.INTEGER,
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },



    });
    DestinationReview.associate = (models) => {
        DestinationReview.belongsTo(models.Destination, {
            foreignKey: 'destinationId',
            onDelete: 'CASCADE',
        });
    };
    return DestinationReview;
}