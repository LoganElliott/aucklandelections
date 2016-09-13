import React, {PropTypes} from 'react'

require('./footer.scss');

export default class footer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {

        return(
            <div className="footer-container">
                    <a>
                        <img className="gz-logo" src="images/icons/GZ-logo.png"/>
                    </a>
                    <span className="nav-container">
                        <span className="nav-item">Home</span>
                        <span className="nav-item">Categories</span>
                        <span className="nav-item">About</span>
                        <span className="nav-item">Contact</span>
                    </span>
            </div>
        );
    }

}
