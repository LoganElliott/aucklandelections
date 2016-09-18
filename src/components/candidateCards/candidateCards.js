import React, {PropTypes} from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import map from 'lodash/map';
import jsonp from 'jsonp';

import Candidate from '../candidate/candidate'
import {candidateImagesPath} from '../../conf/conf';

require('./candidateCards.scss');

const googleSpreadSheetUrl = 'https://spreadsheets.google.com/a/google.com/tq?key=';
const commaSpace = '%2C%20';

const mayorAndCouncillorsColumns = ['B','D','F','H','J','L','N','P','R','T','V','X','Z', 'AB','AD','AF','AG','AI','AN','AO','AP','AQ','AR','AS','AT','AU'];
const mayorAndCouncillorsGoogleSpreadSheetKey = '1qK6ph0ZU1dGsTjkeIiPLjVRpyRQKo_ItDrnqMZmRjUU';
const mayorAndCouncillorsQuery = mayorAndCouncillorsColumns.slice(1).reduce( (pre, cur) => pre + commaSpace + cur,'SELECT%20B');
const mayorAndCouncillorsJsonpCallback = 'getMayorAndCouncillors';
const mayorAndCouncillorsDataUrl = googleSpreadSheetUrl + mayorAndCouncillorsGoogleSpreadSheetKey + '&tq=' + mayorAndCouncillorsQuery + '&tqx=responseHandler:' + mayorAndCouncillorsJsonpCallback;

const localBoardsColumns = ['B','C','D','E','S','T','U','V','W'];
const localBoardsGoogleSpreadSheetKey = '1u51qnVBZtF_NdCdcsFHO-i5rbpu54NagFU6TgMpmg4c';
const localBoardsQuery = localBoardsColumns.slice(1).reduce( (pre, cur) => pre + commaSpace + cur,'SELECT%20B');
const localBoardsJsonpCallback = 'getLocalBoards';
const localBoardsDataUrl = googleSpreadSheetUrl + localBoardsGoogleSpreadSheetKey + '&tq=' + localBoardsQuery + '&tqx=responseHandler:' + localBoardsJsonpCallback;

export default class card extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            candidates: [],
        };
    }

    componentDidMount () {
        this.getCandidates(mayorAndCouncillorsDataUrl,mayorAndCouncillorsJsonpCallback, true);
        this.getCandidates(localBoardsDataUrl,localBoardsJsonpCallback, false);
    }

    getCandidates(dataUrl, callback, isMayorOrCouncillor) {
        jsonp(dataUrl,{"name": callback}, (err,data) => this.jsonpCallback(err,data, isMayorOrCouncillor));
    }

    jsonpCallback(err,data, isMayorOrCouncillor) {
        if(!err){
            let rows = data.table.rows;
            let cads = [];
            map(rows, (row) => {
                let candidate;
                if(isMayorOrCouncillor){
                    candidate = this.createMayorOrCouncillorCandidate(row);
                } else {
                    candidate = this.createLocalBoardCandidate(row);
                }

                cads.push(candidate);
            });
            this.setState({candidates: this.state.candidates.concat(cads)});
        } else {
            console.debug(err);
        }
    }

    createMayorOrCouncillorCandidate(val){
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
        let image = candidateImagesPath + name.replace(/\s/g,'-') + '.png';

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

    createLocalBoardCandidate(val){
        let firstName = val.c[0].v.trim();
        let lastName = val.c[1].v.trim();
        let image = candidateImagesPath + firstName + '-' +lastName + '.png';

        return {
            'key': firstName+lastName,
            'firstName' : firstName,
            'lastName' : lastName,
            'image': image,
            'localBoard': val.c[2] ? val.c[2].v : '',
            'subdivision': val.c[3] ? val.c[3].v : '',
            'publicTransport': val.c[4] ? val.c[4].v : '?',
            'housing': val.c[5] ? val.c[5].v : '?',
            'cycling': val.c[6] ? val.c[6].v : '?',
            'climateChange': val.c[7] ? val.c[7].v : '?',
            'overallValue': val.c[8] ? val.c[8].v : '?',
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

        let mayor = <div className="candidates__section shadow">
            <div className="candidates__title">
                {'Scores for Mayor of Auckland'.toUpperCase()}
                </div>
            <div className="candidates__inner">
                {mayorCandidates}
            </div>
        </div>;

        let councillor = <div className="candidates__section card-3">
            <div className="candidates__title">
                {('Scores for Councillor (' + this.props.ward + ')').toUpperCase()}
            </div>
            <div className="candidates__inner">
                {councillorCandidates}
            </div>
        </div>;

        return <div className='candidates'>
            {this.props.ward ? councillor : ''}
            {this.state.candidates.length > 0 ? mayor : ''}
            {this.state.candidates.length === 0 ? <CircularProgress mode="indeterminate"/> : '' }
            </div>
    }
}
