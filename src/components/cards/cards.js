import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';

require('./cards.scss');

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expandedIds: [],
            showScoreBreakDown: false,
            candidates: [
                {
                    key: "Chloe SwarBrick",
                    firstName: "Chloe",
                    lastName: "SwarBrick",
                    ticket: "Independent",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90cb5120db7d91b47e026_chloe.png",
                    scores: {
                        transport: [
                            "A",
                            "B"
                        ],
                        housing: [
                            "D"
                        ],
                        environment: [],
                        political: "A-"
                    }
                },
                {
                    key: "Phil Goff",
                    firstName: "Phil",
                    lastName: "Goff",
                    ticket: "Independent",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57ba8f08846cc19e60ad1ce3_goff.jpg",
                    scores: {
                        transport: [
                            "A",
                            "B"
                        ],
                        housing: [
                            "D"
                        ],
                        environment: [],
                        political: "A-"
                    }
                },
                {
                    key: "Mark Thomas",
                    firstName: "Mark",
                    lastName: "Thomas",
                    ticket: "Independent",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90d18120db7d91b47e0f8_Mark.png",
                    scores: {
                        transport: [
                            "A",
                            "B"
                        ],
                        housing: [
                            "D"
                        ],
                        environment: [],
                        political: "A-"
                    }
                },
                {
                    key: "Vic Crone",
                    firstName: "Vic",
                    lastName: "Crone",
                    ticket: "Independent",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c80df5efe2a97529d5b7f4_crone.png",
                    scores: {
                        transport: [
                            "A",
                            "B"
                        ],
                        housing: [
                            "D"
                        ],
                        environment: [],
                        political: "A-"
                    }
                },
            ]
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow(candidateId){
        this.setState({expandedIds:this.state.expandedIds.concat(candidateId)});
    };

    handleHide (candidateId) {
        this.setState({expandedIds:this.state.expandedIds.filter((val) => {return val !== candidateId})});
    };

    render() {
        let councillorCards = this.state.candidates.map(candidate => {
            if(this.props.localBoard === candidate.board || !candidate.board) {
                return (<div key={candidate.key} className="councillor-card">
                    <div className="councillor-details">
                        <div className="councillor-image__container">
                            <img className="councillor-image__value" height={175} width={175} src={candidate.image}/>
                        </div>
                        <div className="councillor-info">
                            <h1 className="councillor-info__name">{candidate.firstName}</h1>
                            <h1 className="councillor-info__name">{candidate.lastName}</h1>
                            <h3 className="councillor-info__ticket">{candidate.ticket}</h3>
                            <div>
                                <img className="councillor-info__category" src="Transport-Icon.png"/>
                                <img className="councillor-info__category" src="Housing-Icon.png"/>
                                <img className="councillor-info__category" src="Environment-Icon.png"/>
                            </div>
                            <div className="councillor-info__scores">
                                <div
                                    className="councillor-info__score councillor-info__category councillor-info__transport">
                                    <div className="councillor-info__score-value">
                                        A+
                                    </div>
                                </div>
                                <div
                                    className="councillor-info__score councillor-info__category councillor-info__housing">
                                    <div className="councillor-info__score-value">
                                        B
                                    </div>
                                </div>
                                <div
                                    className="councillor-info__score councillor-info__category councillor-info__environment">
                                    <div className="councillor-info__score-value">
                                        F-
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="councillor-score-breakdown-button">
                            {!this.state.expandedIds.some((val) => val === candidate.key)
                                ?
                                <FlatButton label="Show Score Breakdown"
                                            onTouchTap={() => this.handleShow(candidate.key)}/>
                                :
                                <FlatButton label="Hide Score Breakdown"
                                            onTouchTap={() => this.handleHide(candidate.key)}/>
                            }
                        </div>
                    </div>
                    {this.state.expandedIds.some((val) => {
                        return val === candidate.key
                    }) ?
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
                        : ''
                    }
                </div>)
            }
        });


        return <div className="candidate-main">{councillorCards}</div>
    }

}
