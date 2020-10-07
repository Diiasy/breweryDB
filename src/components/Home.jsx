import React from 'react';
import '../layouts/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div className="home">
            <div className="bg d-flex flex-column justify-content-center align-items-center">
                <h1>Welcome on <i>find your beer</i>.</h1>
                <Link className="search-beers" to='/beers'>Seach for beers</Link>
            </div>
        </div>
    )
}

export default Home;
