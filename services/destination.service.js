const { Sequelize } = require('sequelize');
const  db = require('../models');
const destination = db.Destination;
const DestinationReviews = db.DestinationReview;

const addDestination = async (name, description, location,image, startTime,endTime,averageRating,averagePrice, x, y,category) => {
    try {
        console.log(x);
        console.log(y);
        
        const newDestination = await destination.create({
            name,
            description,
            location,
            image,
            startTime,
            endTime,
            averageRating,
            averagePrice,
            x,
            y,
            category,
        });

        return newDestination;
    } catch (error) {
        throw new Error(`Error adding destination: ${error.message}`);
    }
}
const getFoodItems = async (page,_limit) => {
    const limit = _limit? _limit : 10;
    const offset = page ? page * limit : 0;
    try {
        const destinations = await destination.findAndCountAll({
            limit,
            offset,
            where: {
                category: 'food'
            }
        });
        //get top review (most recently )
        destinations.rows.forEach(async (dest) => {
            const review = await DestinationReviews.findOne({
                where: {
                    destinationId: dest.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if (review) {
                dest.dataValues.review = review.dataValues;
            } else {
                dest.dataValues.review = null;
            }
        }
        );

        return destinations;
    } catch (error) {
        throw new Error(`Error getting destinations: ${error.message}`);
    }
}
const getTravelItems = async (page,_limit) => {
    const limit = _limit? _limit : 10;
    const offset = page ? page * limit : 0;
    try {
        const destinations = await destination.findAndCountAll({
            limit,
            offset,
            where: {
                category: 'travel'
            }
        });
        return destinations;
    } catch (error) {
        throw new Error(`Error getting destinations: ${error.message}`);
    }
}
const getbookingItems = async (page,_limit) => {
    const limit = _limit? _limit : 10;
    const offset = page ? page * limit : 0;
    try {
        const destinations = await destination.findAndCountAll({
            limit,
            offset,
            where: {
                category: 'booking'
            }
        });
        return destinations;
    } catch (error) {
        throw new Error(`Error getting destinations: ${error.message}`);
    }
}

const getDestination = async (page,_limit) => {
    const limit = _limit? _limit : 10;
    const offset = page ? page * limit : 0;
    try {
        const destinations = await destination.findAndCountAll({
            limit,
            offset,
        });
        return destinations;
    } catch (error) {
        throw new Error(`Error getting destinations: ${error.message}`);
    }
}
const updateDestination = async (id, title, description, image, date, x, y) => {
    try {
        const { id } = req.params;
        const { title, description, image, date, x, y } = req.body;
        const destination = await destination.findByPk(id);
        if (destination) {
            destination.title = title;
            destination.description = description;
            destination.image = image;
            destination.date = date;
            destination.x = x;
            destination.y = y;
            await destination.save();
            res.status(200).json(destination);
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await destination.findByPk(id);
        if (destination) {
            await destination.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getDestinationById = async (id) => {
    try {
        const _destination = await destination.findByPk(id);
        return _destination;
    } catch (error) {
        throw new Error(`Error getting destination: ${error.message}`);
    }
}

const getDestinationByCategory = async (category) => {
    try {
        const destinations = await destination.findAll({
            where: {
                category
            }
        });
        return destinations;
    } catch (error) {
        throw new Error(`Error getting destinations: ${error.message}`);
    }
}

module.exports = {
    addDestination,
    getDestination,
    updateDestination,
    deleteDestination,
    getFoodItems,
    getTravelItems,
    getDestinationById,
    getbookingItems
    
}