import { Router } from "express";


export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const movies = await mongoDatabase.collection("movies")
            .find({
                countries:{
                    $in:["Ukraine"]
                },
                year:{
                    $gte: 2000,
                },
            }).sort({
                metacritic:-1 //Sorterer oppover eller nedover med 1 eller -1
            })
            .map(({title, year, fullplot, countries,  directors, poster, imdb})=>{  //velger hva slags info skal retuneres fra db - bruker det hos clienten
                return {title, year, fullplot, directors, poster, countries, imdb}
            })
            .limit(100) //limit på antall
            .toArray();

        res.json(movies);
    });

    router.post("/new", (req, res) => {
            const { title, plot, year1, country } = req.body;
            console.log(title, plot, year1, country)
            const year = parseInt(year1)
            const countries = [country]
            mongoDatabase.collection("movies").insertOne({ title, plot, year, countries});
            res.sendStatus(204);
    });

    return router;
}