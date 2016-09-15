import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import map from 'lodash/map';
import jsonp from 'jsonp';

require('./cards.scss');

const googleSpreadSheetKey = '1qK6ph0ZU1dGsTjkeIiPLjVRpyRQKo_ItDrnqMZmRjUU';
const query = 'SELECT%20B%2C%20D%2C%20F%2C%20H%2C%20J%2C%20L%2C%20N%2C%20P%2C%20R%2C%20T%2C%20V%2C%20X%2C%20Z%20%2CAB%20%2C%20AD%2C%20AF%2C%20AG%2C%20AI%2C%20AN%2C%20AO%2C%20AP%2C%20AQ%2C%20AR%2C%20AS%2C%20AT%2C%20AU';
const dataUrl = 'https://spreadsheets.google.com/a/google.com/tq?key=' + googleSpreadSheetKey + '&tq=' + query + '&tqx=responseHandler:getCandidates';
const categories = ['transport', 'housing', 'environment', 'competence'];

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            expandedIds: [],
            categoriesShown: [],
            showScoreBreakDown: false,
            candidates: [],
            scoreBreakdowns: {
                transport: {
                    questions:[
                        {
                            total: 6,
                            title: 'Transport Funding Levels',
                            image: 'images/scores/transport/spend.png'
                        },
                        {
                            total: 6,
                            title: 'Top 3 Transport Priorities',
                            image: 'images/scores/transport/prio.png'
                        },
                        {
                            total: 4,
                            title: 'Projects Doesn\'t Support',
                            image: 'images/scores/transport/not.png'
                        },
                        {
                            total: 5,
                            title: 'Harbour Crossing/Rail to Shore',
                            image: 'images/scores/transport/awhc.png'
                        },
                        {
                            total: 5,
                            title: 'Rail to the Airport',
                            image: 'images/scores/transport/airport.png'
                        },
                        {
                            total: 5,
                            title: 'Dominion Road Light Rail',
                            image: 'images/scores/transport/lr.png'
                        },
                        {
                            total: 12,
                            title: 'Cycling Funding & Space',
                            image: 'images/scores/transport/cycling.png'
                        },
                        {
                            total: 7,
                            title: 'Non-Road Building Focus',
                            image: 'images/scores/transport/roads.png'
                        },
                    ],
                    total: 50
                },
                housing: {
                    questions: [
                        {
                            total: 6,
                            title: 'Sprawl vs Density, Up or Out',
                            image: 'images/scores/housing/Compact-City.png'
                        },
                        {
                            total: 8,
                            title: 'Unitary Plan Passing',
                            image: 'images/scores/housing/Unitary-Plan.png'
                        },
                        {
                            total: 6,
                            title: 'Housing Ideas',
                            image: 'images/scores/housing/HousingIdeas.png'
                        }
                    ],
                    total: 20
                },
                environment: {
                   questions: [
                        {
                            total: 5,
                            title: 'Climate Change',
                            image: 'images/scores/environment/ClimateChange.png'
                        },
                        {
                            total: 5,
                            title:'Ideas Low-Carbon City',
                            image: 'images/scores/environment/GreatIdea.png'
                        },
                        {
                            total: 5,
                            title:'City for People or Cars',
                            image: 'images/scores/environment/PeopleVSCars.png'
                        }
                    ],
                    total : 15
                },
                competence: {
                    questions: [
                        {
                            total: 15,
                            title: 'How capable is this person?',
                            image: 'images/scores/competence/Competence.png'
                        }
                    ],
                    total: 15
                }
            }
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    componentDidMount () {
        this.getCandidates();
    }

    getCandidates() {
        jsonp(dataUrl,{"name": 'getCandidates'}, (err,data) => this.jsonpCallback(err,data));
    }

    jsonpCallback(err,data) {
        if(!err){
            let rows = data.table.rows;
            let cads = [];
            map(rows, (row) => {
                let candidate = this.createCandidate(row);

                cads.push(candidate);
            });
            this.setState({candidates: cads});
        } else {
            console.debug(err);
        }
    }

    createCandidate(val){
        let scores = [];
        let transport = [];
        let housing = [];
        let environment = [];

        map(val.c.slice(1,9), (a) => {
            transport.push(a.v);
        });
        map(val.c.slice(9,12), (a) => {
            housing.push(a.v);
        });
        map(val.c.slice(12,15), (a) => {
            environment.push(a.v);
        });

        scores.transport = transport;
        scores.housing = housing;
        scores.environment = housing;
        scores.competence = [val.c[15].v];

        let name = val.c[0].v;
        let nameSplit = name.split(' ');
        let image = 'images/candidates/' + name.replace(/\s/g,'-') + '.png';

        return {
            'key': nameSplit[0]+nameSplit[1],
            'firstName' : nameSplit[0],
            'lastName' : nameSplit[1],
            'image': image,
            'scores': scores,
            'consensus': val.c[16] ? val.c[16].v: '',
            'overallValue': val.c[17].v,
            'overall': val.c[18].v ,
            'transport': val.c[19].v,
            'housing': val.c[20].v,
            'environment': val.c[21].v,
            'competence': val.c[22].v,
            'ticket': val.c[23] ? val.c[23].v : '',
            'standingForMayor': val.c[24] ? val.c[24].v : '',
            'standingForCouncillor': val.c[25] ? val.c[25].v : '',
        };
    }

    handleShow(candidateId){
        this.setState({expandedIds:this.state.expandedIds.concat(candidateId)});
    };

    handleHide (candidateId) {
        this.setState({expandedIds:this.state.expandedIds.filter((val) => {return val !== candidateId})});
    };

    selectCategory (candidateId, category) {
        let filterOutCandidate = this.state.categoriesShown.filter((val) => {
            return val.indexOf(candidateId) === -1
        });
        this.setState({categoriesShown: filterOutCandidate}, () =>{
            this.setState({categoriesShown:this.state.categoriesShown.concat(candidateId + category)});
        });
    }

    candidateBreakdownOpen (candidate) {
        return this.state.expandedIds.some((val) => val === candidate.key);
    }

    render() {
        let candidateGrade = candidate => <div className="candidate-grade-bubble"><div className="candidate-grade">{candidate.overall}</div></div>;

        let candidateImage = candidate => <div className='councillor-image__container'>
            <img className='councillor-image__value' height={175} width={175} src={candidate.image}/>
            {candidateGrade(candidate)}
        </div>;

        let candidateScores = candidate =>
        <div className="councillor-info__scores-container">
            <div>
                {categories.map(category =>
                    <img className='councillor-info__category'
                         src={'images/icons/' + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
                    />
                )}
            </div>
            <div className='councillor-info__scores'>
            <div
                className='councillor-info__score councillor-info__category councillor-info__transport'>
                <div className='councillor-info__score-value'>
                    {candidate.transport}
                </div>
            </div>
            <div
                className='councillor-info__score councillor-info__category councillor-info__housing'>
                <div className='councillor-info__score-value'>
                    {candidate.housing}
                </div>
            </div>
            <div
                className='councillor-info__score councillor-info__category councillor-info__environment'>
                <div className='councillor-info__score-value'>
                    {candidate.environment}
                </div>
            </div>
            <div
                className='councillor-info__score councillor-info__category councillor-info__competence'>
                <div className='councillor-info__score-value'>
                    {candidate.competence}
                </div>
            </div>
            </div>
        </div>;

        let candidateMarkersConsensus = candidate => <div className='councillor-info-markers-consensus'>
            <hr className='councillor-info-markers-consensus-line'/>
            <div className='councillor-info-markers-consensus-title'>
                {'Marker\'s Consensus'}
                <br/>
            </div>
            '{candidate.consensus}'
            <hr className='councillor-info-markers-consensus-line'/>
        </div>;

        let candidateInfo = candidate => <div className='councillor-info councillor-info-container'>


            <div className='councillor-info-markers-consensus-scores'>
                {!this.candidateBreakdownOpen(candidate)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
            </div>
            </div>;

        let categoryBreakdown = (candidate, category) => {
            let breakdown = [];

            this.state.scoreBreakdowns[category].questions.map((v, index) => {
                breakdown.push(
                    <div key={candidate.key + v.title.replace(/\s/g,'')}
                         className="candidate-breakdown__category-score">
                        <div className="candidate-breakdown__category-icon-and-score">
                            <div>
                                <img className="candidate-breakdown__category-score-icon" src={v.image}/>
                            </div>
                            <span
                                className="candidate-breakdown__category-score-value">{candidate.scores[category][index]}/{v.total}</span>
                        </div>
                        <div>
                            <div className="candidate-breakdown__category-score-title">{v.title}</div>
                        </div>
                    </div>
                );
            });

            return <div>
                <div className="candidate-breakdown__category-header">
                    <span className="candidate-breakdown__category-header-category">{category.toUpperCase()}</span>
                    <span className="candidate-breakdown__category-header-detailed-score"> - Detailed Scoring</span>
                    <span className="candidate-breakdown__category-header-total">/{this.state.scoreBreakdowns[category].total}</span>
                </div>
                <div className="candidate-breakdown__category-scores">
                    {breakdown}
                </div>
            </div>;
        };

        let candidateBreakdownDetails = (candidate) => {
            let breakdown = [];
            categories.map((category => {
                if(this.state.categoriesShown.some((val) => val === candidate.key + category)){
                    breakdown = breakdown.concat(categoryBreakdown(candidate, category));
                }
            }));
            return breakdown;
        };

        let getCandidateBreakdownColourClass = (candidate) => {
            if(candidate.standingForMayor){
                return 'candidate-breakdown-mayor';
            } else if(candidate.standingForCouncillor) {
                return 'candidate-breakdown-councillor';
            }
        };

        let getCandidateColourClass = (candidate) => {
            if(candidate.standingForMayor){
                return 'councillor-mayor';
            } else if(candidate.standingForCouncillor) {
                return 'councillor-councillor';
            }
        };

        let candidateBreakdown = candidate => {
            if (this.candidateBreakdownOpen(candidate))
                return <div className={'candidate-breakdown ' + getCandidateColourClass(candidate)} >
                    <div className="candidate-breakdown__icons">
                        {categories.map((category =>
                            <div className='candidate-breakdown__category'>
                                <img className='candidate-breakdown__big-icon'
                                     src={'images/icons/' + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
                                     onClick={() => this.selectCategory(candidate.key, category)}
                                />
                                {category.toUpperCase()}
                            </div>
                        ))}
                    </div>

                    <div className={'candidate-breakdown-inner ' + getCandidateBreakdownColourClass(candidate)}>
                            {candidateBreakdownDetails(candidate)}
                    </div>
                </div>
        };

        let mayorCandidates = [];
        let councillorCandidates = [];
        let localBoardCandidates = [];

        this.state.candidates.sort((a, b) => b.overallValue - a.overallValue).map(candidate => {
            if(candidate.standingForMayor || (candidate.standingForCouncillor && (this.props.ward == candidate.standingForCouncillor))) {
                let cardColourClass;
                if(candidate.standingForMayor){
                    cardColourClass = 'councillor-mayor';
                } else if(candidate.standingForCouncillor){
                    cardColourClass = 'councillor-councillor';
                }

                let candidateEl =
                    <div key={candidate.key} className='councillor-card'>
                        <div className={'councillor-details ' + cardColourClass}>
                            {candidateImage(candidate)}
                            <div>
                                <h1 className='councillor-info__name councillor-info__name-first'>{candidate.firstName}</h1>
                                <h1 className='councillor-info__name'>{candidate.lastName}</h1>
                                <h3 className='councillor-info__ticket'>{candidate.ticket}</h3>
                            </div>
                            {candidateInfo(candidate)}
                            <div className='councillor-score-breakdown-button'>
                                {!this.state.expandedIds.some((val) => val === candidate.key)
                                    ?
                                    <FlatButton label='Show Score Breakdown'
                                                onTouchTap={() => {this.handleShow(candidate.key);this.selectCategory(candidate.key, 'transport');}}/>
                                    :
                                    <FlatButton label='Hide Score Breakdown'
                                                onTouchTap={() => this.handleHide(candidate.key)}/>
                                }
                            </div>
                        </div>
                        {candidateBreakdown(candidate)}
                    </div>;

                if(candidate.standingForMayor){
                    mayorCandidates.push(candidateEl);
                } else if(candidate.standingForCouncillor){
                    councillorCandidates.push(candidateEl);
                }
            }
        });

        return <div className='candidate-main'>
                <div className="candidate-section">
                    {mayorCandidates}
                </div>
                <div className="candidate-section">
                    {councillorCandidates}
                </div>
                <div className="candidate-section">
                    {localBoardCandidates}
                </div>
            </div>
    }
}
