import { ListMovies } from "../listMovies.jsx";

import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";



describe("ListMovies component", () => {
    //Sjekker at den rendrer ListMovies som forrige gang (Snapshot)
    it("shows loading screen", () => {
        const domElement = document.createElement("div");
        ReactDOM.render(<ListMovies />, domElement);
        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("shows movies", async () => {
        const movies = [{ title: "movie 1", countries: ["Ukraine"] }, { title: "movie 2", countries: ["Ukraine"] }];
        const domElement = document.createElement("div");
        await act(async () => {
            ReactDOM.render(<ListMovies listMovies={() => movies} />, domElement);
        });
        expect(
            Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
        ).toEqual(["movie 1", "movie 2"]);
        expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("shows error", async () => {
        const domElement = document.createElement("div");
        await act(async () => {
            ReactDOM.render(<ListMovies listMovies={() => {
                throw new Error("Something went wrong")
            }} />, domElement);
        });
        expect(domElement.querySelector("#error-text").innerHTML).toEqual( "Error: Something went wrong");
        expect(domElement.innerHTML).toMatchSnapshot();
    });
});