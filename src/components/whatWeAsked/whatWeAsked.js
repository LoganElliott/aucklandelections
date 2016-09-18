import React from 'react'

require('./whatWeAsked.scss');

const whatWeAskedText = 'We asked every council candidate the same 14 questions on Transport, Housing and the Environment. We gave them points based on how well they answered and how well they matched Generation Zero\'s vision for a liveable low-carbon Auckland.';

export default class header extends React.Component {
    constructor(context) {
        super(context);
    }

    render() {
        return(
            <div className="what-we-asked">
                <div className="what-we-asked__title">
                    WHAT WE ASKED
                </div>
                <div className="what-we-asked__text">
                    {whatWeAskedText}
                </div>
            </div>
        );
    }
}
