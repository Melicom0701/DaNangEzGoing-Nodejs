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
const getAllItems = async (req, res) => {
    try {
        const results = await searchService.getAllItems();
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
const filterSearch = async (req, res) => {
    try {
        //e = localtion
        //p = price 
        //s = star
        //localhost:8000/search/filterSearch?e=Quận Hải Châu, Quận Liên Chiểu, Huyện Hòa Vang&p=85000&s=4.5
        const {e,p,t,s} = req.query;
        const q = {e,p,t,s};
        
        const results = await searchService.filterSearch(q);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    searchByCategory,
    searchByName,
    getAllItems,
    filterSearch
}