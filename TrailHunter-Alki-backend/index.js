import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import TrailsDAO from './dao/trailsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import CompletesDAO from './dao/completesDAO.js';
import WishlistsDAO from './dao/wishlistsDAO.js';
// yuhan checked 


async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.TRAILHUNTER_DB_URI
    )

    const port = process.env.PORT || 8000;

    try {
        await client.connect();
        console.log("Connects to mongo db client successfully!");
        await TrailsDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await CompletesDAO.injectDB(client);
        await WishlistsDAO.injectDB(client);

        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);