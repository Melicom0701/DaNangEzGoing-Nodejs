const jwt = require("jsonwebtoken");
const validateInput = (req, res, next) => {
  let {
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
  } = req.body;
  console.log(req.body)
  if (
    !name ||
    !description ||
    !location ||
    !image ||
    !startTime ||
    !endTime ||
    !averageRating ||
    !averagePrice ||
    !x ||
    !y ||
    !category
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ error: "Name must be at least 3 characters" });
  }
  startTime = new Date(startTime);
  endTime = new Date(endTime);
  req.body.startTime = startTime;
  req.body.endTime = endTime;
  if (startTime >= endTime) {
    return res
      .status(400)
      .json({ error: "End time must be greater than start time" });
  }

  if (averageRating < 0 || averageRating > 5) {
    return res.status(400).json({ error: "Rating must be between 0 and 5" });
  }
  if (averagePrice < 0) {
    return res.status(400).json({ error: "Price must be greater than 0" });
  }
  if (category !== "food" && category !== "travel" && category !== "booking") {
    return res.status(400).json({ error: "Invalid category" });
  }
  next();
};
const validateReview = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.body.userId = userId;
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });
  

  let { review, image, rating, destinationId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  if (!review) return res.status(400).json({ error: "Review is required" });
  if (!rating) return res.status(400).json({ error: "Rating is required" });
  if (!image) req.body.image = null;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 0 and 5" });
  }
  next();
};
const validateAddMenu = async (req, res, next) => {
}
module.exports = {
  validateInput,
  validateReview,
};

