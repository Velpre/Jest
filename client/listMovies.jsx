import {useLoading} from "./useLoading";
import React, {useContext} from "react";
import { MovieApiContext } from "./movieApiContext";

export function ListMovies() {
    const { listMovies } = useContext(MovieApiContext);
    const {loading, error, data} = useLoading(async ()=>listMovies());

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div id="error-text">{error.toString()}</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Movies in the database</h1>

            {data.map((movie) => (
                <MovieCard key={movie.title} movie={movie}/>
            ))}
        </div>
    );
}

function MovieCard({movie}) {
    return <div>
        <h3>{movie.title}</h3>
        <p>{movie.fullplot}</p>
        <p>{movie.directors}</p>
        {
            movie.countries.map((c, index) => {
                return (<p key={index}>{c}</p>)
            })}
        {movie.poster ? <img src={movie.poster} alt="pic" width={100}/> : null}
    </div>;
}