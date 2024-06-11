const statsService = require('../services/stats.service.js');
const getNumUsers = async (req, res) => {
    try {
        const numUsers = await statsService.getNumUsers();
        res.status(200).json(numUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getNumDestinations = async (req, res) => {
    try {
        const numDestinations = await statsService.getNumDestinations();
        res.status(200).json(numDestinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getNumReviews = async (req, res) => {
    try {
        const numReviews = await statsService.getNumReviews();
        res.status(200).json(numReviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getMonthlyUsers = async (req, res) => {
    try {
        const monthlyUsers = await statsService.getMonthlyUsers();
        res.status(200).json(monthlyUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getMonthlyDestinations = async (req, res) => {
    try {
        const monthlyDestinations = await statsService.getMonthlyDestinations();
        res.status(200).json(monthlyDestinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getMonthlyReviews = async (req, res) => {
    try {
        const monthlyReviews = await statsService.getMonthlyReviews();
        res.status(200).json(monthlyReviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    getNumUsers,
    getNumDestinations,
    getNumReviews,
    getMonthlyUsers,
    getMonthlyDestinations,
    getMonthlyReviews
}
