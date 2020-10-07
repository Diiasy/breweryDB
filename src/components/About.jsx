import React from 'react';
import '../layouts/Home.css';

function About() {
    return(
        <div className="home">
            <div className="bg d-flex flex-column justify-content-start align-items-start p-5">
                <p>This app was developped as an assignment for PXL.Widgets Heroes</p>
                <p>It uses the BreweryDB API and allows to search beers by name, country and type.</p>
                <p className="font-weight-bold">Enjoy!</p>
            </div>
        </div>
    )
}

export default About;