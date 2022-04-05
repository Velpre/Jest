import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {fetchJSON} from "./http.js";
import {ListMovies} from "./listMovies";

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

function AddMovie() {
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [year1, setYear] = useState("");
    const [country, setCountry] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        await fetchJSON("/api/movies/new", {
            method: "post",
            json: { title, year1, plot, country},
        });
        setTitle("");
        setYear("");
        setPlot("");
        setCountry("");
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Movie</h1>
            <div>
                Title:
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                Year:
                <input value={year1} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div>Plot:</div>
            <div>
                <textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
            </div>
            <div>
                Country:
                <input value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <button>Submit</button>
        </form>
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