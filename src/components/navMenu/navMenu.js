import React from 'react'

require('./navMenu.scss');

export default class NavMenu extends React.Component {
    constructor(context) {
        super(context);
    }

    render() {
        return(
            <div className="nav">
                <a>
                    <img className="nav__gz-logo" src="images/icons/GZ-logo.png"/>
                </a>
                <span className="nav__items">
                        <a href="http://aucklandelections.nz" className="nav__items-item">Home</a>
                        <a href="http://details.aucklandelections.nz/how-to-vote" className="nav__items-item">How To Vote</a>
                        <a href="http://details.aucklandelections.nz/criteria" className="nav__items-item">Our Criteria</a>
                        <a href="http://localelections.generationzero.org.nz" className="nav__items-item">Other Regions</a>
                        <a href="http://details.aucklandelections.nz/about-us" className="nav__items-item">About Us</a>
                </span>
            </div>
        );
    }
}
