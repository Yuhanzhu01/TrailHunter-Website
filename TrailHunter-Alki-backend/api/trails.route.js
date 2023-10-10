import express from 'express';
import TrailsController from './trails.controller.js';
import ReviewsController from './reviews.controller.js';
import CompletesController from './completes.controller.js';
import WishlistsController from './wishlists.controller.js';
//updated by Yuhan Dec8

const router = express.Router();

router.route("/").get(TrailsController.apiGetTrails);
router.route("/states/:states").get(TrailsController.apiGetTrailsByStates);
router.route("/name/:name").get(TrailsController.apiGetTrailsByName);
//Get trail by id -- Yuhan Dec 13
router.route("/id/:id").get(TrailsController.apiGetTrailById);

// Get all the ratings
// router.route("/ratings").get(TrailsController.apiGetRatings);
// Get all the states -- Dec12 Yuhan 
router.route("/states").get(TrailsController.apiGetStates);

// Add a new review
router.route("/review").post(ReviewsController.apiPostReview);

// Update an existing review
router.route("/review").put(ReviewsController.apiUpdateReview);

// Delete an existing review
router.route("/review").delete(ReviewsController.apiDeleteReview);


router.route("/completes").put(CompletesController.apiUpdateCompletes);
router.route("/completes/:userId").get(CompletesController.apiGetCompletes);
router.route("/completes/idList/").post(CompletesController.apiPostTrailsByCompletes);

router.route("/wishlists").put(WishlistsController.apiUpdateWishlists);
router.route("/wishlists/:userId").get(WishlistsController.apiGetWishlists);
router.route("/wishlists/idList/").post(WishlistsController.apiPostTrailsByWishList);

export default router;