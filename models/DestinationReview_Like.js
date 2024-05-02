module.exports = (sequelize, DataTypes) => {
    const DestinationReview_Like = sequelize.define('DestinationReview_Like', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        destinationReviewId: {
            type: DataTypes.INTEGER,
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
    DestinationReview_Like.associate = (models) => {
        DestinationReview_Like.belongsTo(models.DestinationReview, {
            foreignKey: 'destinationReviewId',
            onDelete: 'CASCADE',
        });
    };
    return DestinationReview_Like;
}
