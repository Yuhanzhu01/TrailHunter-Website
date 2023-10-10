import ReviewsDAO from "../dao/reviewsDAO.js";

// Author: Sifan
export default class ReviewsController {
   // add post review by Yuhan
    static async apiPostReview (req, res, next){
        try { 
            const trailId = req.body.trail_id;
            const userId = req.body.user_id;
            const userName = req.body.name;
            const review = req.body.review; 
            const date = new Date(); 
            
            // the response comes from the reviewDAO function add review
            const reviewResponse = await ReviewsDAO.addReview(
                trailId,
                userName,
                userId,
                review,
                date
            );
            
            var { error } = reviewResponse;

            if (error) {
                res.status(500).json({error:"Unable to post review."});
            } else {
                res.json({status:"success"});
            }
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
    
    static async apiUpdateReview(req, res, next) {
        try { 
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const review = req.body.review; 
            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                date
            );
            
            var { matchedCount, modifiedCount } = reviewResponse;
            if (!matchedCount) {
                res.status(500).json({ error: "Unable to find the given review."});
            } else if (!modifiedCount) {
                res.status(500).json({ error: "Unable to update the review" });
            } else {
                res.json({ status: "Put success" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    
    // Api to delete an existing review
    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );
            
            var { error } = reviewResponse;

            if (error) {
                res.status(500).json({error: `Having error from the response of deleting an existing review from ReviewsDAO with error: ${error}`});
            } else {
                res.json({status:"success"});
            }
        } catch (e) {
            res.status(500).json({error: `Unable to update review from ReviewsDAO with error: ${e}`});
        }
    }
}
