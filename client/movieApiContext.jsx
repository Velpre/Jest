import React from "react";
import {fetchJSON} from "./http";

export const MovieApiContext = React.createContext({
    async listMovies() {
        return fetchJSON(`/api/movies`);
    },
    async createMovie(movie) {
        fetch("/api/movies/new", {
            method: "post",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
});