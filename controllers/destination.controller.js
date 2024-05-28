const DestinationService = require("../services/destination.service");

const jwt = require("jsonwebtoken");
const addDestination = async (req, res) => {
  try {
    const {name,description,location,image,startTime,endTime,averageRating,averagePrice,date,x,y,category} = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;    
    const newDestination = await DestinationService.addDestination(name, description, location,image, startTime,endTime,averageRating,averagePrice, x, y,category,userId);
    res.status(201).send("Success!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saveDestination = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.headers.authorization) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const save = await DestinationService.saveDestination(id, userId);
    res.status(201).json(save);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
const getLikes = async (req, res) => {  
  const { reviewId } = req.params;
  try{
  const likes = await DestinationService.getLikes(reviewId);
  res.status(200).json(likes);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }


}
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
const LikeStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log(reviewId)
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const like = await DestinationService.LikeStatus(reviewId, userId);
    res.status(201).json(like);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }

}
const LikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const like = await DestinationService.LikeReview(reviewId, userId);
    res.status(201).json(like);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}
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
const addReview = async (req, res) => {
  try {
    const { review, image, rating, userId } = req.body;
    const destinationId = req.params.id;
    console.log(destinationId);
    const newReview = await DestinationService.addReview(
      review,
      image,
      rating,
      destinationId,
      userId
    );
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await DestinationService.getReviews(id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
    const destination = await DestinationService.updateDestination(req,res)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await DestinationService.deleteDestination(req,res);
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
const getMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await DestinationService.getMenu(id);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const addMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const { categories } = req.body;
    const menu = await DestinationService.addMenu(id, name, price, image, categories);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const categories = await DestinationService.getCategories(name);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await DestinationService.addCategory(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getSavedDestinations = async (req, res) => {
  console.log("aasdads")
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const destinations = await DestinationService.getSavedDestinations(userId);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getAllDestination = async (req, res) => {
  try {
    const { _start, _end,q } = req.query;
    const result = await DestinationService.getAllDestination(_start, _end,q);
    const length = result.count;
    const destination = result.rows;
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    res.set('X-Total-Count', length)

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDestination,
  addDestination,
  getDestination,
  updateDestination,
  getSavedDestinations,
  deleteDestination,
  getFoodItems,
  getTravelItems,
  getbookingItems,
  getDestinationById,
  addReview,
  LikeStatus,
  getReviews,
  LikeReview,
  getLikes,
  saveDestination,
  getMenu,
  addMenu,
  getCategories,
  addCategory,
};
