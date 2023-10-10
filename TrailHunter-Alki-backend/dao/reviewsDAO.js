import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviewCollection;

export default class ReviewsDAO {
    static async injectDB(dbClient) {
        if (reviewCollection) {
            return;
        }
        try {
           reviewCollection = await dbClient.db(process.env.TRAILHUNTER_NS).collection('reviews');
           console.log("Connects to reviewCollection successfully!");
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewsDAO: ${e}`);
        }
    }

    static async addReview(trailId, userName, userId, review, date) {
        try {
            const reviewDoc = {
                name: userName,
                user_id: userId,
                date: date,
                review: review,
                trail_id: ObjectId(trailId)
            }
            const addResponse = await reviewCollection.insertOne(reviewDoc);
            return addResponse;

        }catch(e) {
            console.error(`Unable to add a review in reviewCollection: ${e}`, {
                "trail id": trailId,
                "user name": user.name,
                "user id": user._id,
                "date": date,
                "review": review
            })
            return {error: e};
        }
    }

    // DAO service to update an existing review -- Yuhan Dec08
    static async updateReview(reviewId, userId, review, date) {
        try {
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId),
            }
            const updateDoc = {
                $set: { 
                    review: review, 
                    date: date, 
                } 
            }
            const updateResponse = await reviewCollection.updateOne(filter, updateDoc)
            return updateResponse;
        }
        catch(e) {
            console.error(`Unable to update the existing review from review Collection with error: ${e}`, {
                "review id": reviewId,
                "user id": userId,
                "review": review,
                "date": date,
            });
            return { error: e};
        }
    }

    // DAO service to delete an existing review
    static async deleteReview(reviewId, userId) {
        try {
            const query = {
                _id: ObjectId(reviewId),
                user_id: userId,
            }
            const deleteResponse = await reviewCollection.deleteOne(query);
            return deleteResponse;
        }
        catch(e) {
            console.error(`Unable to delete an existing review from reviewCollection with error: ${e}`, {
                "review id": reviewId,
                "user id": userId,
            });
            return { error: e };
        }
    }
}