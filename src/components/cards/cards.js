import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import map from 'lodash/map';
import jsonp from 'jsonp';

require('./cards.scss');

const googleSpreadSheetKey = '1qK6ph0ZU1dGsTjkeIiPLjVRpyRQKo_ItDrnqMZmRjUU';
const query = 'SELECT%20B%2C%20D%2C%20F%2C%20H%2C%20J%2C%20L%2C%20N%2C%20P%2C%20R%2C%20T%2C%20V%2C%20X%2C%20Z%20%2CAB%20%2C%20AD%2C%20AF%2C%20AG%2C%20AI%2C%20AN%2C%20AO%2C%20AP%2C%20AQ%2C%20AR%2C%20AS%2C%20AT%2C%20AU%2C%20AV';
const dataUrl = 'http://spreadsheets.google.com/a/google.com/tq?key=' + googleSpreadSheetKey + '&tq=' + query + '&tqx=responseHandler:getCandidates';


export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            expandedIds: [],
            showScoreBreakDown: false,
            candidates: [],
            scoreBreakdowns: {
                transport: {
                    totals: [
                        6, 6, 4, 5, 5, 5, 12, 7
                    ],
                    titles: [
                        'Transport Funding Levels',
                        'Top 3 Transport Priorities',
                        'Projects Doesn’t Support',
                        'Harbour Crossing/Rail to Shore',
                        'Rail to the Airport',
                        'Dominion Road Light Rail',
                        'Cycling Funding & Space',
                        'Non-Road Building Focus ',
                    ]
                },
                housing: {
                    totals: [
                        6,
                        8,
                        6,
                    ],
                    titles: [
                        'Sprawl vs Density, Up or Out',
                        'Unitary Plan Passing',
                        'Housing Ideas',
                    ],
                },
                environment: {
                    totals: [
                        5,
                        5,
                        5,
                    ],
                    titles: [
                        'Climate Change',
                        'Ideas Low-Carbon City',
                        'City for People or Cars',
                    ]
                },
                competence: {
                    totals: [15],
                    titles: ['How capable is this person?']
                }
            }
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
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
        let image = 'images/candidates/' + name.replace(' ','-') + '.png';

        return {
            'key': nameSplit[0]+nameSplit[1],
            'firstName' : nameSplit[0],
            'lastName' : nameSplit[1],
            'image': image,
            'scores': scores,
            'consensus': val.c[0].v == 'Phil Goff' ? 'test' :val.c[16].v,
            'overallValue': val.c[17].v,
            'overall': val.c[18].v ,
            'transport': val.c[19].v,
            'housing': val.c[20].v,
            'environment': val.c[21].v,
            'competence': val.c[22].v,
            'ticket': val.c[23] ? val.c[23].v : '',
            'standingForMayor': val.c[24] ? val.c[24].v : '',
            'standingForCouncillor': val.c[25] ? val.c[25].v : '',
            'standingForLocalBoard': val.c[26] ? val.c[26].v : '',
        };
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

        let candidateGrade = candidate => <div className="candidate-grade-bubble"><div className="candidate-grade">{candidate.overall}</div></div>;

        let candidateImage = candidate => <div className='councillor-image__container'>
            <img className='councillor-image__value' height={175} width={175} src={candidate.image}/>
            {candidateGrade(candidate)}
        </div>;

        let candidateScores = candidate =>
        <div>
            <div>
                <img className='councillor-info__category' src='images/icons/Transport-Icon.png'/>
                <img className='councillor-info__category' src='images/icons/Housing-Icon.png'/>
                <img className='councillor-info__category' src='images/icons/Environment-Icon.png'/>
                <img className='councillor-info__category' src='images/icons/Competence-Icon.png'/>
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
                className='councillor-info__score councillor-info__category councillor-info__environment'>
                <div className='councillor-info__score-value'>
                    {candidate.competence}
                </div>
            </div>
            </div>
        </div>;

        let candidateMarkersConsensus = candidate => <div className='councillor-info-markers-consensus'>
            <hr className='councillor-info-markers-consensus-line'/>
            <div className='councillor-info-markers-consensus-title'>
                Marker's Consensus
                <br/>
            </div>
            '{candidate.consensus}'
            <hr className='councillor-info-markers-consensus-line'/>
        </div>;

        let candidateInfo = candidate => <div className='councillor-info councillor-info-container'>
            <div>
                <h1 className='councillor-info__name councillor-info__name-first'>{candidate.firstName}</h1>
                <h1 className='councillor-info__name'>{candidate.lastName}</h1>
                <h3 className='councillor-info__ticket'>{candidate.ticket}</h3>
            </div>

            <div className='councillor-info-markers-consensus-scores'>
                {!this.candidateBreakdownOpen(candidate)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
            </div>
            </div>;

        let candidateBreakdown = candidate => {
            if (this.candidateBreakdownOpen(candidate))
                return <div className='councillor-breakdown'>
                    <div className="councillor-breakdown-icons">
                        <img className='councillor-breakdown-big-category' src='images/icons/Transport-Icon.png' />
                        <img className='councillor-breakdown-big-category' src='images/icons/Housing-Icon.png'/>
                        <img className='councillor-breakdown-big-category' src='images/icons/Environment-Icon.png'/>
                        <img className='councillor-breakdown-big-category' src='images/icons/Competence-Icon.png'/>
                    </div>
                    <div>

                    </div>
                </div>
        };

        let mayorCandidates = [];
        let councillorCandidates = [];
        let localBoardCandidates = [];

        this.state.candidates.sort((a, b) => b.overallValue - a.overallValue).map(candidate => {
            if(candidate.standingForMayor || (candidate.standingForCouncillor && (this.props.localBoard == candidate.standingForCouncillor)) || (candidate.standingForLocalBoard && (this.props.localBoard == candidate.standingForLocalBoard))) {
                let cardColourClass;
                if(candidate.standingForMayor){
                    cardColourClass = 'councillor-mayor';
                } else if(candidate.standingForCouncillor){
                    cardColourClass = 'councillor-councillor';
                } else if(candidate.standingForLocalBoard){
                    cardColourClass = 'councillor-local-board';
                }

                let candidateEl =
                    <div key={candidate.key} className='councillor-card'>
                        <div className={'councillor-details ' + cardColourClass}>
                            {candidateImage(candidate)}
                            {candidateInfo(candidate)}
                            <div className='councillor-score-breakdown-button'>
                                {!this.state.expandedIds.some((val) => val === candidate.key)
                                    ?
                                    <FlatButton label='Show Score Breakdown'
                                                onTouchTap={() => this.handleShow(candidate.key)}/>
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
                } else if(candidate.standingForLocalBoard){
                    localBoardCandidates.push(candidateEl);

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
