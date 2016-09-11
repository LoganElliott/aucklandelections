import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';

require('./cards.scss');

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        const nameStyle = {
          color: 'snow',
            textWeight: '300',
            margin: 0
        };

        return(
            <div className="cards-container">
                <div className="councillor-image__container">
                    <img className="councillor-image__value" height={175} width={175} src="https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90cb5120db7d91b47e026_chloe.png"/>
                </div>
                <div className="councillor-info">
                    <h1 style={nameStyle}>Chloe</h1>
                    <h1 style={nameStyle}>SwarBrick</h1>
                    <h3 className="councillor-ticket">Independent</h3>
                    <div>
                        <img className="councillor-score__category" src="Transport-Icon.png"/>
                        <img className="councillor-score__category" src="Housing-Icon.png"/>
                        <img className="councillor-score__category" src="Environment-Icon.png"/>
                    </div>
                    <div className="councillor-scores">
                        <div className="councillor-score councillor-score__transport">
                            <div className="councillor-score__value">
                                A+
                            </div>
                        </div>
                        <div className="councillor-score councillor-score__housing">
                            <div className="councillor-score__value">
                                B
                            </div>
                        </div>
                        <div className="councillor-score councillor-score__environment">
                            <div className="councillor-score__value">
                                F-
                            </div>
                        </div>
                    </div>
                </div>
                <div className="councillor-score-breakdown-button">
                    <FlatButton label="Show Score Breakdown"></FlatButton>
                </div>
            </div>
        );
    }

}
