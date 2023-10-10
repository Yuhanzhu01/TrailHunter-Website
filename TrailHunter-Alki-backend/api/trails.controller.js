import TrailsDAO from "../dao/trailsDAO.js";


export default class TrailsController {

    static async apiGetTrails(req, res, next) {
        const trailsPerPage = req.query.trailsPerPage ?
            parseInt(req.query.trailsPerPage) : 10;

        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.avg_rating) {
            filters.avg_rating = req.query.avg_rating;
        }

        const { trailList, totalNumTrails } = await
            TrailsDAO.getTrails({ filters, page, trailsPerPage });

        let response = {
            trails: trailList,
            page: page,
            filters: filters,
            entries_per_page: trailsPerPage,
            total_results: totalNumTrails,
        };
        res.json(response);
    }

    static async apiGetTrailsByName(req, res, next) {
        try {
            let name = req.params.name || {}
            let trail = await TrailsDAO.getTrailsByName(name);
            if (!trail) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(trail);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetTrailsByStates(req, res, next) {
        const trailsPerPage = req.query.trailsPerPage ?
            parseInt(req.query.trailsPerPage) : 10;

        const page = req.query.page ? parseInt(req.query.page) : 0;

        let states = req.params.states || {}
        let filters = {}
        filters.state_name = states

        const { trailList, totalNumTrails } = await
            TrailsDAO.getTrails({ filters, page, trailsPerPage });

        let response = {
            trails: trailList,
            page: page,
            filters: filters,
            entries_per_page: trailsPerPage,
            total_results: totalNumTrails,
        };
        res.json(response);
    }

    // Api to get specific trail by id -- Yuhan Dec13
    static async apiGetTrailById(req, res, next){
        try{
            // Get the trail id from request parameters
            let id = req.params.id  || {}
            // Get the trail obj from TrailsDAO
            let trail = await TrailsDAO.getTrailById(id);
            // Check if the trail obj undefined or not
            if (!trail) {
                res.status(404).json({error: `Unble to get the trail from TrailsDAO with ID: ${id}`});
                return;
            }
            res.json(trail);
        } catch (e) {
            console.log(`Having errors using TrailsDAO to get the trail with ID: ${id} [error msg: ${e}]`);
            res.status(500).json({error: e});
        }
    }

    // Api to get all the ratings
    static async apiGetRatings(req, res, next){
        try {
            let ratings = await TrailsDAO.getRatings();
            res.json(ratings);
        } catch (e) {
            console.log(`Unable to get all the ratings from TrailsDAO with error: ${e}`);
            res.status(500).json({error: e});
        }
    }
    // api to get all the states -- Dec 12 Yuhan
    static async apiGetStates(req, res, next){
        try {
            let states = await TrailsDAO.getStates();
            res.json(states);
        } catch (e) {
            console.log(`Unable to get all the states from TrailsDAO with error: ${e}`);
            res.status(500).json({error: e});
        }
    }



}