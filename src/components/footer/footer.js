import React, {PropTypes} from 'react'

require('./footer.scss');

export default class footer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {

        return(
            <div className="footer-container">
                    <div className="nav-container-footer">
                        <a>
                            <img className="gz-logo" src="images/icons/GZ-logo.png"/>
                        </a>
                        <span className="nav-container">
                            <a href="http://aucklandelections.nz" className="nav-item">Home</a>
                            <a href="http://details.aucklandelections.nz/how-to-vote" className="nav-item">How To Vote</a>
                            <a href="http://details.aucklandelections.nz/criteria" className="nav-item">Our Criteria</a>
                            <a href="http://localelections.generationzero.org.nz" className="nav-item">Other Cities</a>
                            <a href="http://details.aucklandelections.nz/about-us" className="nav-item">About Us</a>
                        </span>
                    </div>
                    <div className="authorised-by">Authorised by Leroy Beckett, Generation Zero, 21 Shaddock Street, AKL</div>
            </div>
        );
    }

}
