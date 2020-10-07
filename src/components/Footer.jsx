import React from 'react';
import '../layouts/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return(
        <div>
            <div className="spacer">
            </div>

            <footer className="footer">
                <div className="container-fluid my-2">
                    <div className="row justify-content-center">
                        <p>Created by Melanie Nachef for PXL.Widgets Heroes</p>
                        <a href="https://github.com/Diiasy/breweryDB"><FontAwesomeIcon className="social-media-icon" icon={faGithub}/></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;