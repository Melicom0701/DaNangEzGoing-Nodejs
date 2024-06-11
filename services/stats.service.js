const {Sequelize} = require("sequelize");
const db = require("../models");



const getNumUsers = async () => {
    try {
        const numUsers = await db.User.count();
        return numUsers;
    } catch (error) {
        throw new Error(`Error getting number of users: ${error.message}`);
    }
}
const getNumDestinations = async () => {
    try {
        const numDestinations = await db.Destination.count();
        return numDestinations;
    } catch (error) {
        throw new Error(`Error getting number of destinations: ${error.message}`);
    }
}
const getNumReviews = async () => {
    try {
        const numReviews = await db.DestinationReview.count();
        return numReviews;
    } catch (error) {
        throw new Error(`Error getting number of reviews: ${error.message}`);
    }
}
const getMonthlyUsers = async () => {
    try {
        const monthlyUsers = await db.User.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'month'],
                [Sequelize.fn("count", Sequelize.col("id")), "count"],
            ],
            group: "month",
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'ASC']],

        });
        return monthlyUsers;
    } catch (error) {
        throw new Error(`Error getting monthly users: ${error.message}`);
    }
}
const getMonthlyDestinations = async () => {
    try {
        const monthlyDestinations = await db.Destination.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'month'],
                [Sequelize.fn("count", Sequelize.col("id")), "count"],
            ],
            group: "month",
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-01'), 'ASC']],
        });
        return monthlyDestinations;
    } catch (error) {
        throw new Error(`Error getting monthly destinations: ${error.message}`);
    }
}
const getMonthlyReviews = async () => {
    try {
        const monthlyReviews = await db.DestinationReview.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m-01"), "month"],
                [Sequelize.fn("count", Sequelize.col("id")), "count"],
            ],
            group: "month",
            order: [[Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m-01"), "ASC"]],
        });
        return monthlyReviews;
    } catch (error) {
        throw new Error(`Error getting monthly reviews: ${error.message}`);
    }
}


module.exports = {
    getNumUsers,
    getNumDestinations,
    getNumReviews,
    getMonthlyUsers,
    getMonthlyDestinations,
    getMonthlyReviews,

}

