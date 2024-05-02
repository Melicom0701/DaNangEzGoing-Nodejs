


const validateInput = (req, res, next) => {
    let {name, description, location,image, startTime,endTime,averageRating,averagePrice, x, y,category} = req.body;
    if (!name || !description || !location || !image || !startTime || !endTime || !averageRating || !averagePrice || !x || !y || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (name.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters" });
    }
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    req.body.startTime = startTime;
    req.body.endTime = endTime;
    if (startTime >= endTime) {
        return res.status(400).json({ error: "End time must be greater than start time" });
    }
    

    if (averageRating < 0 || averageRating > 5) {
        return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }
    if (averagePrice < 0) {
        return res.status(400).json({ error: "Price must be greater than 0" });
    }
    if (category !== 'food' && category !== 'travel' && category !== 'booking') {
        return res.status(400).json({ error: "Invalid category" });
    }
    next();


}
module.exports = {
    validateInput
}
