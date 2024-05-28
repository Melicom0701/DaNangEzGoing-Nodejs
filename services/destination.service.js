const { Sequelize } = require("sequelize");
const db = require("../models");
const DestinationReview_Like = db.DestinationReview_Like;
const destination = db.Destination;
const DestinationReviews = db.DestinationReview;
const SavedDestination = db.SavedDestination;
const Des_Items = db.Des_Items;
const Category = db.Categories;
const Categories_Item = db.Categories_Item;

const addDestination = async (
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
  userId,
) => {
  try {
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
      userId,
    });


    return newDestination;
  } catch (error) {
    throw new Error(`Error adding destination: ${error.message}`);
  }
};
const saveDestination = async (destinationId, userId) => {
  try {
    const saved = await SavedDestination.findOne({
      where: {
        destinationId,
        userId,
      },
    });
    if (saved) {
      await saved.destroy();
      return { message: "unsaved" };
    } else {
      const newSaved = await SavedDestination.create({
        destinationId,
        userId,
      });
      return { message: "saved" };
    }
  } catch (error) {
    throw new Error(`Error saving destination: ${error.message}`);
  }
};
const getLikes = async (reviewId) => {
  try {
    const likes = await DestinationReview_Like.findAndCountAll({
      where: {
        destinationReviewId: reviewId,
      },
    });
    return likes;
  } catch (error) {
    throw new Error(`Error getting likes: ${error.message}`);
  }
};


const LikeStatus = async (destinationReviewId, userId) => {
  try {
    const isLiked = await DestinationReview_Like.findOne({
      where: {
        destinationReviewId,
        userId,
      },
    });
    if (isLiked) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(`Error liking review: ${error.message}`);
  }
};
const LikeReview = async (destinationReviewId, userId) => {
  //check if exist then delete
  try {
    const like = await DestinationReview_Like.findOne({
      where: {
        destinationReviewId,
        userId,
      },
    });
    if (like) {
      await like.destroy();
      return { message: "unliked" };
    } else {
      const newLike = await DestinationReview_Like.create({
        destinationReviewId,
        userId,
      });
      return { message: "liked" };
    }
  } catch (error) {
    throw new Error(`Error liking review: ${error.message}`);
  }
};
const addReview = async (review, image, rating, destinationId, userId) => {
  try {
    const newReview = await DestinationReviews.create({
      review,
      image,
      rating,
      destinationId,
      userId,
    });

    return newReview;
  } catch (error) {
    throw new Error(`Error adding review: ${error.message}`);
  }
};
const getReviews = async (destinationId) => {
  //join user and destination table
  try {
    const reviews = await DestinationReviews.findAll({
      where: {
        destinationId,
      },
      include: [
        {
          model: db.User,
          attributes: ["name", "email", "username", "avatar"],
        },
        {
          model: db.Destination,
          attributes: ["name", "location"],
        },
      ],
    });

    return reviews;
  } catch (error) {
    throw new Error(`Error getting reviews: ${error.message}`);
  }
};

const getFoodItems = async (_limit, page) => {
  const limit = _limit ? _limit : 10;
  const offset = page ? page * limit : 0;
  try {
    const destinations = await destination.findAndCountAll({
      limit,
      offset,
      where: {
        category: "food",
      },
    });
    //get top review (most recently )
    destinations.rows.forEach(async (dest) => {
      const review = await DestinationReviews.findOne({
        where: {
          destinationId: dest.id,
        },
        order: [["createdAt", "DESC"]],
      });
      if (review) {
        dest.dataValues.review = review.dataValues;
      } else {
        dest.dataValues.review = null;
      }
    });

    return destinations;
  } catch (error) {
    throw new Error(`Error getting destinations: ${error.message}`);
  }
};
const getTravelItems = async (_limit, page) => {
  const limit = _limit ? _limit : 10;
  const offset = page ? page * limit : 0;
  try {
    const destinations = await destination.findAndCountAll({
      limit,
      offset,
      where: {
        category: "travel",
      },
    });
    return destinations;
  } catch (error) {
    throw new Error(`Error getting destinations: ${error.message}`);
  }
};
const getbookingItems = async (_limit, page) => {
  const limit = _limit ? _limit : 10;
  const offset = page ? page * limit : 0;
  try {
    const destinations = await destination.findAndCountAll({
      limit,
      offset,
      where: {
        category: "booking",
      },
    });
    return destinations;
  } catch (error) {
    throw new Error(`Error getting destinations: ${error.message}`);
  }
};

const getDestination = async (_limit, page) => {
  const limit = _limit ? _limit : 10;
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
};
const updateDestination = async (req,res) => {
  try {
    const { id } = req.params;
    const { name, description, location, image, startTime, endTime, averageRating, averagePrice, x, y, category } = req.body;
    const destinationX = await destination.findByPk(id);
    if (destination) {
      destinationX.name = name;
      destinationX.location = location
      destinationX.description = description;
      destinationX.image = image;
      destinationX.startTime = startTime;
      destinationX.endTime = endTime;
      destinationX.averageRating = averageRating;
      destinationX.averagePrice = averagePrice;
      destinationX.x = x;
      destinationX.y = y;
      destinationX.category = category;
      await destinationX.save();
      res.status(200).json(destinationX);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const des = await destination.findByPk(id);
    if (des) {
      await des.destroy();
      res.status(200).json({ message: "Destination deleted" });
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  }
  catch (error) {
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
};
const getMenu = async (destinationId) => {
  try {
    const menu = await Des_Items.findAll({
      where: {
        destinationId,
      },
      include:[
        {
          model: destination,
          attributes: ["name","location"],
        },
        {
          model: Categories_Item,
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
      ]
    });
    return menu;
  } catch (error) {
    throw new Error(`Error getting menu: ${error.message}`);
  }
};
const addMenu = async (destinationId, name, price, image, categories) => {
  try {
    const newMenu = await Des_Items.create({
      destinationId,
      name,
      price,
      image,
    });
    const id = newMenu.dataValues.id;
    categories = JSON.parse(categories);    

    categories.forEach((category) => {
      addCategoryToItem(id, category);
    });


    return newMenu;
  } catch (error) {
    throw new Error(`Error adding menu: ${error.message}`);
  }
};
const addCategoryToItem = async (itemId, Category_name) => {
  try 
  {
    const categoryId = await getCategoryId(Category_name);
    Categories_Item.create({
      itemId,
      categoryId,
    });
  }
  catch (error) {
    throw new Error(`Error adding category to item: ${error.message}`);
  }
};
const getCategories = async (searchText) => {
  searchText = searchText.toLowerCase();

  try {
    const categories = await Category.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${searchText}%`,
        },
      },
    });
    return categories;
  } catch (error) {
    throw new Error(`Error getting categories: ${error.message}`);
  }
};
const getCategoryId = async (name) => {
  name = name.toLowerCase();
  try {
    console.log(name)
    //find all
    const category = await Category.findOne({
      where: {
        name,
      },

    });
    if (category) {
      return category.id;
    } else {
      const newCategory = await Category.create({
        name,
      });
      return newCategory.dataValues.id;
    }
  } catch (error) {
    throw new Error(`Error getting category id: ${error.message}`);
  }
};
const getSavedDestinations = async (userId) => {
  try {
    const saved = await SavedDestination.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: destination,
        },
      ],
    });
    return saved;
  } catch (error) {
    throw new Error(`Error getting saved destinations: ${error.message}`);
  }

}
const getAllDestination = async (_start, _end,q) => {
  try {
    if (!_start) _start = 0;
    if (!_end) _end = 10;
    if (!q) q = "";
    _start = parseInt(_start); 
    _end = parseInt(_end);
    
    //q could be id, name,location

    const destinations = await destination.findAndCountAll({
        limit: _end - _start,
        offset: _start,
        where: {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.like]: `%${q}%`,
              },
            },
            {
              id: {
                [Sequelize.Op.like]: `%${q}%`,
              },
            },
          ],
      }
  });
    return destinations;
  } catch (error) {
    throw new Error(`Error getting destinations: ${error.message}`);
  }
}

module.exports = {
  addDestination,
  getSavedDestinations,
  getDestination,
  updateDestination,
  getAllDestination,
  deleteDestination,
  getFoodItems,
  getTravelItems,
  getDestinationById,
  getbookingItems,
  getLikes,
  addReview,
  getReviews,
  LikeStatus,
  LikeReview,
  saveDestination,
  getMenu,
  addMenu,
  getCategories,
  getCategoryId,
};
