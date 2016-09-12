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
                    markersConsensus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90cb5120db7d91b47e026_chloe.png",
                    scores: {
                        transport: {
                            overall: "A+",
                            breakdown :[
                            "A",
                            "B"
                            ]
                        },
                        housing: {
                            overall: "B",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        environment: {
                            overall: "C",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        political: {
                            overall: "D-",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                    }
                },
                {
                    key: "Phil Goff",
                    firstName: "Phil",
                    lastName: "Goff",
                    ticket: "Independent",
                    markersConsensus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57ba8f08846cc19e60ad1ce3_goff.jpg",
                    scores: {
                        transport: {
                            overall: "A+",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        housing: {
                            overall: "B",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        environment: {
                            overall: "C",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        political: {
                            overall: "D-",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                    }
                },
                {
                    key: "Mark Thomas",
                    firstName: "Mark",
                    lastName: "Thomas",
                    ticket: "Independent",
                    markersConsensus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c90d18120db7d91b47e0f8_Mark.png",
                    scores: {
                        transport: {
                            overall: "A+",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        housing: {
                            overall: "B",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        environment: {
                            overall: "C",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        political: {
                            overall: "D-",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                    }
                },
                {
                    key: "Vic Crone",
                    firstName: "Vic",
                    lastName: "Crone",
                    ticket: "Independent",
                    markersConsensus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    image: "https://daks2k3a4ib2z.cloudfront.net/57ba84ee186c098b38c4abff/57c80df5efe2a97529d5b7f4_crone.png",
                    scores: {
                        transport: {
                            overall: "A+",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        housing: {
                            overall: "B",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        environment: {
                            overall: "C",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
                        political: {
                            overall: "D-",
                            breakdown :[
                                "A",
                                "B"
                            ]
                        },
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

    candidateBreakdownOpen (candidate) {
        return this.state.expandedIds.some((val) => val === candidate.key);
    }

    render() {

        let candidateImage = candidate => <div className="councillor-image__container">
            <img className="councillor-image__value" height={175} width={175} src={candidate.image}/>
        </div>;

        let candidateScores = candidate =>
        <div>
            <div>
                <img className="councillor-info__category" src="Transport-Icon.png"/>
                <img className="councillor-info__category" src="Housing-Icon.png"/>
                <img className="councillor-info__category" src="Environment-Icon.png"/>
                <img className="councillor-info__category" src="Competence-Icon.png"/>
            </div>
            <div className="councillor-info__scores">
            <div
                className="councillor-info__score councillor-info__category councillor-info__transport">
                <div className="councillor-info__score-value">
                    {candidate.scores.transport.overall}
                </div>
            </div>
            <div
                className="councillor-info__score councillor-info__category councillor-info__housing">
                <div className="councillor-info__score-value">
                    {candidate.scores.housing.overall}
                </div>
            </div>
            <div
                className="councillor-info__score councillor-info__category councillor-info__environment">
                <div className="councillor-info__score-value">
                    {candidate.scores.environment.overall}
                </div>
            </div>
            <div
                className="councillor-info__score councillor-info__category councillor-info__environment">
                <div className="councillor-info__score-value">
                    {candidate.scores.political.overall}
                </div>
            </div>
            </div>
        </div>;

        let candidateMarkersConsensus = candidate => <div className="councillor-info-markers-consensus">
            <hr className="councillor-info-markers-consensus-line"/>
            <div className="councillor-info-markers-consensus-title">
                Marker's Consensus
                <br/>
            </div>
            "{candidate.markersConsensus}"
            <hr className="councillor-info-markers-consensus-line"/>
        </div>;

        let candidateInfo = candidate => <div className="councillor-info councillor-info-container">
            <div>
                <h1 className="councillor-info__name councillor-info__name-first">{candidate.firstName}</h1>
                <h1 className="councillor-info__name">{candidate.lastName}</h1>
                <h3 className="councillor-info__ticket">{candidate.ticket}</h3>
            </div>

            <div className="councillor-info-markers-consensus-scores">
                {!this.candidateBreakdownOpen(candidate)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
            </div>
            </div>;

        let candidateBreakdown = candidate => {
            if (this.candidateBreakdownOpen(candidate))
                return <div className="councillor-details">
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
        };

        let councillorCards = this.state.candidates.map(candidate => {
            if(this.props.localBoard === candidate.board || !candidate.board) {
                return (<div key={candidate.key} className="councillor-card">
                    <div className="councillor-details">
                        {candidateImage(candidate)}
                        {candidateInfo(candidate)}
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
                    {candidateBreakdown(candidate)}
                </div>)
            }
        });


        return <div className="candidate-main">{councillorCards}</div>
    }

}
