import { AddMovie } from "../addMovie";
import React from "react";
import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import { MovieApiContext } from "../movieApiContext";

describe("add movie component", () => {
    it("shows movies form", () => {
        const element = document.createElement("div");
        ReactDOM.render(<MemoryRouter><AddMovie /></MemoryRouter>, element);
        expect(element.innerHTML).toMatchSnapshot();
        expect(
            Array.from(element.querySelectorAll("form label strong")).map(
                (e) => e.innerHTML
            )
        ).toEqual(["Title:", "Year:", "Plot:", "Country:"]);
    });

    it("adds movie on submit", () => {
        const createMovie = jest.fn();
        const title = "Test movie";
        const element = document.createElement("div");
        ReactDOM.render(<MemoryRouter>
            <MovieApiContext.Provider value={{ createMovie }}>
                <AddMovie/>
            </MovieApiContext.Provider>
        </MemoryRouter>, element);
        Simulate.change(element.querySelector("form input:nth-of-type(1)"), {
            target: { value: title},
        });
        Simulate.submit(element.querySelector("form"));
        expect(createMovie).toBeCalledWith({
            title: title,
            plot: "",
            country: "",
            year1: ""
        });
    });



});


