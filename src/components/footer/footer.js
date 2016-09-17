import React from 'react'
import ShareButtons from '../../components/shareButtons/shareButtons';
import NavMenu from '../../components/navMenu/navMenu';

require('./footer.scss');

export default class footer extends React.Component {
    constructor(context) {
        super(context);
    }

    render() {
        return(
            <div className="footer">
                <div className="footer__icon-nav-container">
                    <NavMenu/>
                </div>
                <ShareButtons/>
                <div className="footer__authorised-by">Authorised by Leroy Beckett, Generation Zero, 21 Shaddock Street, AKL</div>
            </div>
        );
    }

}
