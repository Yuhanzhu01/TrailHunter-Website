import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;


let trailCollection;

export default class TrailsDAO {

    static async injectDB(dbClient) {
        if (trailCollection) {
            return;
        }
        try {
            trailCollection = await dbClient.db(process.env.TRAILHUNTER_NS)
                    .collection("trails");
                    console.log("Connects to trailCollection successfully!");
                    
        }
        catch(e) {
            console.error(`Unable to connect to trail collection from db: ${process.env.MOVIEREVIEWS_NS} with error: ${e}`);
        }
    }



    static async getTrailsByName(name) {
        try {
            return await trailCollection.aggregate([
                {
                    $match: {
                        name: name,
                    }
                },
            ]).next();
        } catch(e) {
            console.error(`Something went wrong in getTrailsByName: ${e}`);
            throw e;
        }
    }

    // DAO service to get specific trail by id
    static async getTrailById(id) {
        try {
            return await trailCollection.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {$lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'trail_id',
                    as: 'reviews',
                }
            }
            ]).next();
        } catch (e) {
            console.error (`Unable to get trail by id: ${id} from trailCollection with error: ${e}`);
            throw e;
        }
    }

    static async getTrails({
        filters = null,
        page = 0,
        trailsPerPage = 10,
    } = {} ) {
        let query;
        
        if (filters) {
            if ("name" in filters) {
                // query = { $text: { $search: filters['name']}};
                query = { $text: { $search: filters['name']}};

// const blogPosts = await BlogPostModel.find({  $text: { $search: `"${req.query["your-search-quey"] }"`  } })

            } else if ("state_name" in filters) {
                query = { "state_name" : { $eq: filters['state_name']}}
            }
        }

        let cursor;
        try {
            cursor = await trailCollection.find(query)
                                .limit(trailsPerPage)
                                .skip(trailsPerPage * page);
            const trailList = await cursor.toArray();
            const totalNumTrails = await trailCollection.countDocuments(query);
            return {trailList, totalNumTrails};
        } catch (e) {
            console.error(`unable to issue find command, ${e}`);
            return { trailList: [], totalNumTrails: 0};
        }
    }

    static async getTrailsByStates(states) {
        try {
            return await trailCollection.aggregate([
                {
                    $match: {
                        state_name: states,
                    }
                },
            ]).next();
        } catch(e) {
            console.error(`Something went wrong in getTrailsByStates: ${e}`);
            throw e;
        }
    }


    // DAO service to get all the ratings
    static async getRatings(){
        let ratings = [];
        try {
            ratings = await trailCollection.distinct("avg_rating");
            return ratings;
        } catch (e){
            console.error(`Unable to get ratings from trail collection, ${e}`);
            return ratings;
        }
    }

    // DAO service to get all the states
    static async getStates(){
        let states = [];
        try {
            states = await trailCollection.distinct("state_name");
            return states;
        } catch (e){
            console.error(`Unable to get states from trail collection, ${e}`);
            return states;
        }
    }

    static async postTrailByWishlists(wishlistsId) {
        let wishIdArray = wishlistsId
        let objectIds = wishIdArray.map(id => new ObjectId(id))
        console.log(objectIds)
        let query = {
            _id : {$in : objectIds}
        };

        let cursor; 
        try {
            cursor = await trailCollection.find(query);
            const wishlistsTrail = await cursor.toArray();
            return {wishlistsTrail};

        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {wishlistsTrail: [], totalNumTrails: 0};
        }
    }

    static async postTrailByCompletes(completesId) {
        let compIdArray = completesId
        let objectIds = compIdArray.map(id => new ObjectId(id))
        console.log(objectIds)
        let query = {
            _id : {$in : objectIds}
        };

        let cursor; 
        try {
            cursor = await trailCollection.find(query);
            const completesTrail = await cursor.toArray();
            return {completesTrail};

        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {completesTrail: [], totalNumTrails: 0};
        }
    }




}