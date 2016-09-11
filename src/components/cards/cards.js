import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';

require('./cards.scss');

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showScoreBreakDown: false
        };
    }

    render() {
        let scoreBreakDown;
        if(this.state.showScoreBreakDown){
            scoreBreakDown =
                <div className="councillor-details">
                    <h4 className="councillor-questions councillor-questions__question">
                        Capital Transport Expenditure
                        <span className="councillor-info__transport councillor-questions__breakdown-value">
                            A+
                        </span>
                    </h4>
                    <h4 className="councillor-questions councillor-questions__question">
                        Top Transport Priorities
                        <span className="councillor-info__transport councillor-questions__breakdown-value">
                            B+
                        </span>
                    </h4>

                    <h4 className="councillor-questions councillor-questions__question">
                        Compact City Model
                        <span className="councillor-info__housing councillor-questions__breakdown-value">
                            B+
                        </span>
                    </h4>
                </div>
        }

        let councillorImage =
            <div className="councillor-image__container">
                <img className="councillor-image__value" height={175} width={175} src="https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90cb5120db7d91b47e026_chloe.png"/>
            </div>;

        let councillorScores =
            <div className="councillor-info__scores">
                <div className="councillor-info__score councillor-info__category councillor-info__transport">
                    <div className="councillor-info__score-value">
                        A+
                    </div>
                </div>
                <div className="councillor-info__score councillor-info__category councillor-info__housing">
                    <div className="councillor-info__score-value">
                        B
                    </div>
                </div>
                <div className="councillor-info__score councillor-info__category councillor-info__environment">
                    <div className="councillor-info__score-value">
                        F-
                    </div>
                </div>
            </div>;

        let councillorInfo =
            <div className="councillor-info">
                <h1 className="councillor-info__name">Chloe</h1>
                <h1 className="councillor-info__name">SwarBrick</h1>
                <h3 className="councillor-info__ticket">Independent</h3>
                <div>
                    <img className="councillor-info__category" src="Transport-Icon.png"/>
                    <img className="councillor-info__category" src="Housing-Icon.png"/>
                    <img className="councillor-info__category" src="Environment-Icon.png"/>
                </div>
                {councillorScores}
            </div>;

        return(
            <div className="councillor-card">
                <div className="councillor-details">
                    {councillorImage}
                    {councillorInfo}
                    <div className="councillor-score-breakdown-button">
                        <FlatButton label="Show Score Breakdown" onTouchTap={() =>  this.setState({showScoreBreakDown:!this.state.showScoreBreakDown})}></FlatButton>
                    </div>
                </div>
                {scoreBreakDown}
            </div>

        );
    }

}
