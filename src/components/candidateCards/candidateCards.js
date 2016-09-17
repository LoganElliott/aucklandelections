import React, {PropTypes} from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import map from 'lodash/map';
import jsonp from 'jsonp';

import Candidate from '../candidate/candidate'

require('./candidateCards.scss');

const googleSpreadSheetKey = '1qK6ph0ZU1dGsTjkeIiPLjVRpyRQKo_ItDrnqMZmRjUU';
const query = 'SELECT%20B%2C%20D%2C%20F%2C%20H%2C%20J%2C%20L%2C%20N%2C%20P%2C%20R%2C%20T%2C%20V%2C%20X%2C%20Z%20%2CAB%20%2C%20AD%2C%20AF%2C%20AG%2C%20AI%2C%20AN%2C%20AO%2C%20AP%2C%20AQ%2C%20AR%2C%20AS%2C%20AT%2C%20AU';
const dataUrl = 'https://spreadsheets.google.com/a/google.com/tq?key=' + googleSpreadSheetKey + '&tq=' + query + '&tqx=responseHandler:getCandidates';

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            candidates: [],

        };
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
            if(a){
                transport.push(a.v)
            }
        });
        map(val.c.slice(9,12), (a) => {
            if(a) {
                housing.push(a.v);
            }
        });
        map(val.c.slice(12,15), (a) => {
            if(a) {
                environment.push(a.v);
            }
        });
        scores.transport = transport;
        scores.housing = housing;
        scores.environment = environment;
        scores.competence = val.c[15] ? [val.c[15].v] :[];

        let name = val.c[0].v.trim();
        let nameSplit = name.split(' ');
        let image = 'images/candidates/' + name.replace(/\s/g,'-') + '.png';

        return {
            'key': nameSplit[0]+nameSplit[1],
            'firstName' : nameSplit[0],
            'lastName' : nameSplit[1],
            'image': image,
            'scores': scores,
            'consensus': val.c[16] ? val.c[16].v: '',
            'overallValue': val.c[17] ? val.c[17].v : '?',
            'overall': val.c[18]  ? val.c[18].v : '?',
            'transport': val.c[19]  ? val.c[19].v : '?',
            'housing': val.c[20]  ? val.c[20].v : '?',
            'environment': val.c[21]  ? val.c[21].v : '?',
            'competence': val.c[22]  ? val.c[22].v : '?',
            'ticket': val.c[23] ? val.c[23].v : '',
            'standingForMayor': val.c[24] ? val.c[24].v : '',
            'standingForCouncillor': val.c[25] ? val.c[25].v : '',
        };
    }

    render() {


        let mayorCandidates = [];
        let councillorCandidates = [];
        let localBoardCandidates = [];

        let sortCandidates = () => {
            return this.state.candidates.sort((a, b) => {
                if(b.overallValue === a.overallValue){
                    return (b.firstName+b.lastName).toUpperCase() < (a.firstName+a.lastName).toUpperCase()
                } else {
                    return b.overallValue - a.overallValue;
                }
            })
        };

        sortCandidates().map(candidate => {
            if(candidate.standingForMayor || (candidate.standingForCouncillor && (this.props.ward == candidate.standingForCouncillor))) {

                let candidateEl = <Candidate key={candidate.key} candidate={candidate}></Candidate>

                if(candidate.standingForMayor){
                    mayorCandidates.push(candidateEl);
                } else if(candidate.standingForCouncillor){
                    councillorCandidates.push(candidateEl);
                }
            }
        });

        let mayor = <div className="candidate-section card-3">
            <div className="candidate-section-title">
                {'Scores for Mayor of Auckland'.toUpperCase()}
                </div>
            <div className="candidate-section-inner">
                {mayorCandidates}
            </div>
        </div>;

        let councillor = <div className="candidate-section card-3">
            <div className="candidate-section-title">
                {('Scores for Councillor (' + this.props.ward + ')').toUpperCase()}
            </div>
            <div className="candidate-section-inner">
                {councillorCandidates}
            </div>
        </div>;

        return <div className='candidate-main'>
            {this.props.ward ? councillor : ''}
            {this.state.candidates.length > 0 ? mayor : ''}
            {this.state.candidates.length === 0 ? <CircularProgress mode="indeterminate"/> : '' }
            </div>
    }
}
