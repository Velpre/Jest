import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { MoviesApi } from "../moviesApi";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);

beforeEach(function () {
    jest.setTimeout(50000) // ms
});

beforeAll(async () => {
    await mongoClient.connect(); //Connecter på clienten
    const database = mongoClient.db("test_database"); //Angir hvilken DB skal den jobbe med
    await database.collection("movies").deleteMany({}); //Sletter alle movies fra test database
    app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
    mongoClient.close(); //Stenger connection etter at testene er kjørt
});

describe("movies api", () => {
    it("adds a new movie", async () => {
        await request(app)
            .post("/api/movies/new")
            .send({
                title: "My Test Movie",
                country: "Ukraine",
                year1: 2020,
            })
            .expect(204);
        expect(
            (await request(app).get("/api/movies").expect(200)).body.map(
                ({ title }) => title
            )
        ).toContain("My Test Movie");
    });

    it("lists existing movies", async () => {
        expect(
            (await request(app).get("/api/movies").expect(200)).body.map(
                ({ title }) => title
            )
        ).toContain("My Test Movie");
    });
});