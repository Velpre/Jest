import { ListMovies } from "../listMovies.jsx";
import { MovieApiContext } from "../movieApiContext";
import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";


const movies = [{ title: "movie 1", countries: ["Ukraine"] }, { title: "movie 2", countries: ["Ukraine"] }];


async function renderListMovies(listMovies) {
    const element = document.createElement("div");
    await act(async () =>
        ReactDOM.render(
            <MovieApiContext.Provider value={{ listMovies }}>
                <ListMovies />
            </MovieApiContext.Provider>,
            element
        )
    );
    return element;
}

describe("ListMovies component", () => {

    it("shows loading screen", async () => {
        const element = await renderListMovies(() => new Promise(() => {}));
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows movies", async () => {
        const element = await renderListMovies(async () => movies)
        expect(
            Array.from(element.querySelectorAll("h3")).map((e) => e.innerHTML)
        ).toEqual(["movie 1", "movie 2"]);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows error", async () => {
        const element = await renderListMovies(async () => {
            throw new Error("Something went wrong");
        });

        expect(element.querySelector("#error-text").innerHTML).toEqual( "Error: Something went wrong");
        expect(element.innerHTML).toMatchSnapshot();
    });
});