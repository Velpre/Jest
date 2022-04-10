import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchJSON} from "./http";

function FormInput({ label, value, onChangeValue }) {
    return (
        <div>
            <label>
                <strong>{label}</strong>
                <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
            </label>
        </div>
    );
}



export function AddMovie({createMovie}) {
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [year1, setYear] = useState("");
    const [country, setCountry] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        //Function vi sender fra testen -Mock function
        createMovie({title})
        await fetchJSON("/api/movies/new", {
            method: "post",
            json: {title, year1, plot, country},
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
            <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />            <FormInput label={"Year:"} value={year1} onChangeValue={setYear} />
            <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
            <FormInput label={"Country:"} value={country} onChangeValue={setCountry} />
            <button>Submit</button>
        </form>
    );
}