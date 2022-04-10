import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {fetchJSON} from "./http.js";
import {ListMovies} from "./listMovies";
import {AddMovie} from "./addMovie";

function FrontPage() {
    return (
        <div>
            <h1>Movie Database</h1>
            <ul>
                <li>
                    <Link to={"/movies"}>List movies</Link>
                </li>
                <li>
                    <Link to={"/movies/new"}>Add new movie</Link>
                </li>
            </ul>
        </div>
    );
}

function Application() {

    async function listMovies() {
        return await fetchJSON("/api/movies");
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route
                    path={"/movies"}
                    element={<ListMovies listMovies={listMovies} />}
                />
                <Route path={"/movies/new"} element={<AddMovie />} />
            </Routes>
        </BrowserRouter>
    );
}
ReactDOM.render(<Application />, document.getElementById("app"));