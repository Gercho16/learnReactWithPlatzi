import React from 'react';
import {Link} from 'react-router-dom';

import './styles/Home.css';
import platziconfLogoImage from '../images/platziconf-logo.svg'
import Astronauts from '../images/astronauts.svg';

function Home() {
    return (
        <div className="Home">
            <div className="container">
                <div className="row">
                    <div className="Home__col col-12 col-md-4">
                        <img src={platziconfLogoImage} alt="Platzi conf Logo" className="img-fluid mb-2"/>    
                        <h1>Print your badges</h1>
                        <Link to="/badges" className="btn btn-primary">Start</Link>
                    </div>
                    <div className="Home__col d-none d-md-block col-md-8">
                        <img src={Astronauts} alt="Astronauts" className="img-fluid p-4"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;