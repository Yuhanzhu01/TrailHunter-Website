import WishlistsDAO from "../dao/wishlistsDAO.js";
import TrailsDAO from "../dao/trailsDAO.js";

export default class WishlistsController {
    
    static async apiUpdateWishlists(req, res, next) {
        try {
            const WishlistsReponse = await WishlistsDAO.updateWishlists(
                req.body._id,
                req.body.wishlists
            )

            var { error } = WishlistsReponse
            if (error) {
                console.log(error);
                res.status(500).json({ error });
            }

            if (WishlistsReponse.modifiedCount === 0) {
                throw new Error ("Unable to update wishlists.")
            }
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetWishlists(req,res,next) {
        try {
            let id = req.params.userId;
            let wishlists = await WishlistsDAO.getWishlists(id);
            if (!wishlists) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(wishlists);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiPostTrailsByWishList(req, res, next) {
        try {
            let wishIdList = req.body.idList;
            console.log(wishIdList)
            let wishlists = await TrailsDAO.postTrailByWishlists(wishIdList);
            
            res.json(wishlists);
        } catch(e) {
            console.log(`getTrailsByWishList API, ${e}`);
            res.status(500).json({ error: e });
        }

    }
}