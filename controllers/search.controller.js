const searchService = require('../services/search.service');



const searchByName = async (req, res) => {
    try {
        const { q } = req.query;
        const { c } = req.query;
        const results = await searchService.searchByName(q,c);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const searchByCategory = async (req, res) => {
    try {
        const { q } = req.query;
        const results = await searchService.searchByCategory(q);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    searchByCategory,
    searchByName,
}