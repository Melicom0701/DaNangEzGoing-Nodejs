const DestinationService = require("../services/destination.service");

const addDestination = async (req, res) => {
  try {
    const {name,description,location,image,startTime,endTime,averageRating,averagePrice,date,x,y,category} = req.body;
    const newDestination = await DestinationService.addDestination(name, description, location,image, startTime,endTime,averageRating,averagePrice, x, y,category);
    res.status(201).send("Success!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFoodItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  console.log(page)
  console.log(limit)
  const offset = page ? page * limit : 0;
  try {
    const destinations = await DestinationService.getFoodItems(limit, offset);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTravelItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const offset = page ? page * limit : 0;
  try {
    const destinations = await DestinationService.getTravelItems(limit, offset);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getbookingItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const offset = page ? page * limit : 0;
  try {
    const destinations = await DestinationService.getbookingItems(
      limit,
      offset
    );
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDestination = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const offset = page ? page * limit : 0;
  try {
    const destinations = await DestinationService.getDestination(limit, offset);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, date, x, y } = req.body;
    const destination = await DestinationService.updateDestination(
      id,
      title,
      description,
      image,
      date,
      x,
      y
    );
    if (destination) {
      res.status(200).json(destination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await DestinationService.deleteDestination(id);
    if (destination) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await DestinationService.getDestinationById(id);
        if (destination) {
        res.status(200).json(destination);
        } else {
        res.status(404).json({ message: "Destination not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

module.exports = {
  addDestination,
  getDestination,
  updateDestination,
  deleteDestination,
  getFoodItems,
  getTravelItems,
  getbookingItems,
  getDestinationById,
};
