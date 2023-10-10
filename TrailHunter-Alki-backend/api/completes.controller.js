import CompletesDAO from "../dao/completesDAO.js";
import TrailsDAO from "../dao/trailsDAO.js";

export default class CompletesController {
    
    static async apiUpdateCompletes(req, res, next) {
        try {
            const CompletesResponse = await CompletesDAO.updateCompletes(
                req.body._id,
                req.body.completes
            )

            var { error } = CompletesResponse
            if (error) {
                console.log(error);
                res.status(500).json({ error });
            }

            if (CompletesResponse.modifiedCount === 0) {
                throw new Error ("Unable to update completes.")
            }
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetCompletes(req,res,next) {
        try {
            let id = req.params.userId;
            let completes = await CompletesDAO.getCompletes(id);
            if (!completes) {
                res.status(404).json({ error: "not count" });
                return;
            }
            res.json(completes);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiPostTrailsByCompletes(req, res, next) {
        try {
            let compIdList = req.body.idList;
            console.log(compIdList)
            let completes = await TrailsDAO.postTrailByCompletes(compIdList);
            
            res.json(completes);
        } catch(e) {
            console.log(`getTrailsByCompletes API, ${e}`);
            res.status(500).json({ error: e });
        }

    }
}