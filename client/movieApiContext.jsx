import React from "react";

export const MovieApiContext = React.createContext({
    async listMovies() {
        return fetchJSON(`/api/movies`);
    },
    async createMovie(movie) {
        fetch("/api/movies", {
            method: "post",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
});