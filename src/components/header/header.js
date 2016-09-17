import React from 'react'
import NavMenu from '../../components/navMenu/navMenu';

export default class header extends React.Component {
    constructor(context) {
        super(context);
    }

    render() {
        let headerStyles = {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            padding: '17px',
            zIndex: 1000,
            display: 'inline-block',
            alignItems: 'center',
            color: 'snow'
        };

        return(
            <div style={headerStyles}>
                <NavMenu/>
            </div>
        );
    }
}
