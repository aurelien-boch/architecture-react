import React, {useEffect, useState} from 'react';
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import useAxios from "axios-hooks";

const App = () => {
    const [{data, loading, error}, refetch] = useAxios("https://catfact.ninja/fact");

    if (loading)
        return <p>Loading...</p>
    if (error)
        return <p>Error!</p>
    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}

export default App;
