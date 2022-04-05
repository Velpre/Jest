import express from "express";
import * as path from "path";
import { MoviesApi } from "./moviesApi.js";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

const app = express();
app.use(bodyParser.json());
const mongoClient = new MongoClient(process.env.MONGODB_URL)


mongoClient.connect().then(async () => {
    //Lister alle databaser (ikke i bruk akkurat nå)
    const databases = await mongoClient.db().admin().listDatabases()
    //Sender inn valgte databasen
    app.use("/api/movies", MoviesApi(mongoClient.db( process.env.MONGODB_DATABASE || "MoviesDatabase"))); //Sier at vi skal connecte på en av de 2 DB
})



app.use(express.static("../client/dist/"));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});