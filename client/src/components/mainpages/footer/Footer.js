import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faInstagramSquare, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";


const  footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="about-us">
                    <h2>About Me</h2>
                    
                    <div className="sec"></div>
                    <p>
                        Doan Tuan Dat<br />
                    </p>                    
                    <ul>
                        <li> <Link to="#"> <FontAwesomeIcon icon={faFacebookSquare} size="2x"></FontAwesomeIcon></Link> </li> <br/>
                        <li> <Link to="#"> <FontAwesomeIcon icon={faTwitterSquare} size="2x"/> </Link> </li> <br/>
                        <li> <Link to="#"> <FontAwesomeIcon icon={faInstagramSquare} size="2x"/> </Link> </li> <br/>
                    </ul>
                </div>

                <div className="quick-link">
                    <h2>Quick Links</h2>
                    <div className="sec"></div>
                    <ul>
                        <li>
                            <Link to="#">About Us</Link>
                        </li>

                        <li>
                            <Link to="#">New Products</Link>
                        </li>

                        <li>
                            <Link to="#">Registration</Link>
                        </li>
                    </ul>
                </div>

                <div className="contact-us">
                    <h2>Contact Us</h2>
                    <div className="sec"></div>
                    <ul>
                        <li> <i className="fas fa-phone-square"></i> 0905724256 </li>
                        <li> <i className="fas fa-map-marked-alt"></i> HCM city, Vietnam </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default footer
