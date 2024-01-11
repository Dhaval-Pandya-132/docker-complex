import React, { useEffect, useState } from "react";
import axios from 'axios'


const Fib = () => {
    const [seenIndex, setSeenIndex] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState("");

    const renderSeenIndexes = () => {
        return seenIndex.map(({ number }) => number).join(', ');
    }

    const renderValues = () => {

        return Object.entries(values).map(([key, value]) =>
        (<div key={key} >
            For index {key} I calculated {value}
        </div >));

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: index
        })
        setIndex("");
    }


    useEffect(() => {
        const fetchValues = async () => {
            const values = await axios.get("/api/values/current");
            setValues(values.data);

        }
        const fetchIndexes = async () => {
            const seenIndexes = await axios.get("/api/values/all");
            setSeenIndex(seenIndexes.data);
        }
        const fetchVal = async () => {
            await fetchValues();
            await fetchIndexes();
        }
        fetchVal();
    }, []);

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>Enter your index</label>
            <input value={index} onChange={event => setIndex(event.target.value)}></input>
            <button>Submit</button>
        </form>
        <h3>Indexes i have seen </h3>
        {renderSeenIndexes()}
        <h3>Calculated values </h3>
        {renderValues()}
        {/* {Object.entries(values).map(([key, value]) => (<div key={key}>{value}</div>))} */}
    </div>)


}

export default Fib