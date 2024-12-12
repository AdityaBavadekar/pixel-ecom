import Review from '../models/Review.js';

async function getReviewsByProductId(req, res) {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function addReview(req, res) {
    // TODO: Maybe same user should be able to post only 1 review at max for a particular product  
    try {
        const { productId, rating, content } = req.body;
        const review = new Review({
            authorId: req.userId,
            productId,
            rating,
            content
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function deleteReviewById(req, res) {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review with the provided id does not exist" });
        }
        if (review.authorId != req.userId){
            return res.status(404).json({ message: "You are not authorized for this action" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred" });
    }   
}

export { getReviewsByProductId, addReview, deleteReviewById };