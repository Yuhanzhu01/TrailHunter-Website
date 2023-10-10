let wishlistsCollection;

export default class WishlistsDAO {
    static async injectDB(conn) {
        if (wishlistsCollection){
            return;
        }
        try {
            wishlistsCollection = await conn.db(process.env.TRAILHUNTER_NS)
                                .collection('wishlists');
        }
        catch(e) {
            console.error(`Unable to connect in WishlistsDAO: ${e}`);
        }
    }

    static async updateWishlists(userId, wishlists) {
        try {
            const updateResponse = await wishlistsCollection.updateOne(
                { _id: userId },
                { $set: { wishlists: wishlists } },
                { upsert: true }
            )
            return updateResponse
        }
        catch (e) {
            console.error(`Unable to update wishlists: ${e}`);
            return { error: e};
        }
    }

    static async getWishlists(id) {
        let cursor;
        try {
            cursor = await wishlistsCollection.find({
                _id: id
            })
            const wishlists = await cursor.toArray();
            return wishlists[0];
        } catch(e) {
            console.error(`Something went wrong in getWishlists: ${e}`);
            throw e;
        }
    }
}