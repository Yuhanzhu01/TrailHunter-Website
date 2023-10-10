let completesCollection;

export default class CompletesDAO {
    static async injectDB(conn) {
        if (completesCollection){
            return;
        }
        try {
            completesCollection = await conn.db(process.env.TRAILHUNTER_NS)
                                .collection('completes');
        }
        catch(e) {
            console.error(`Unable to connect in CompletesDAO: ${e}`);
        }
    }

    static async updateCompletes(userId, completes) {
        try {
            const updateResponse = await completesCollection.updateOne(
                { _id: userId },
                { $set: { completes: completes } },
                { upsert: true }
            )
            return updateResponse
        }
        catch (e) {
            console.error(`Unable to update completes: ${e}`);
            return { error: e};
        }
    }

    static async getCompletes(id) {
        let cursor;
        try {
            cursor = await completesCollection.find({
                _id: id
            })
            const completes = await cursor.toArray();
            return completes[0];
        } catch(e) {
            console.error(`Something went wrong in getCompletes: ${e}`);
            throw e;
        }
    }
}