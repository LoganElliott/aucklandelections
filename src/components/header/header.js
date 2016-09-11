import React, {PropTypes} from 'react'

require('./header.scss');

export default class header extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {

        return(
            <div className="header-container">
                    <a>
                        <img className="gz-logo" src="GZ-logo.png"/>
                    </a>
                    <span className="nav-container">
                        <span className="nav-item">Home</span>
                        <span className="nav-item">Our Criterea</span>
                        <span className="nav-item">About Us</span>
                    </span>
            </div>
        );
    }

}
