import express from 'express';
import cors from 'cors';
import trails from './api/trails.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", trails);
app.use("/api/v1/trails", trails);
app.use("*", (req, res) => {
    res.status(404).json({error: "not found"});
})

export default app;