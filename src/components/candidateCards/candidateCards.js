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

const localBoardsColumns = ['B','C','D','E','R','S','T','U','V','W'];
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
        this.getCandidates();
    }

    getCandidates(){
        let mayorAndCouncillorCandidates = this.getCandidatesOfType(mayorAndCouncillorsDataUrl,mayorAndCouncillorsJsonpCallback, true);
        let localBoardCandidates = this.getCandidatesOfType(localBoardsDataUrl,localBoardsJsonpCallback, false);
        Promise.all([mayorAndCouncillorCandidates,localBoardCandidates])
            .then(values => {
                let combinedCandidates = values[0].concat(values[1]);

                let sortedCandidates = this.sortCandidates(combinedCandidates);

                this.setState({candidates: sortedCandidates});
            })
            .catch(err => console.debug(err));
    }

    sortCandidates (candidates) {
        return candidates.sort((a, b) => {
            if(b.overallValue === a.overallValue){
                return (b.firstName+b.lastName).toUpperCase() < (a.firstName+a.lastName).toUpperCase()
            } else {
                return b.overallValue - a.overallValue;
            }
        })
    };

    getCandidatesOfType(dataUrl, callback, isMayorOrCouncillor) {
        return new Promise((resolve, reject) => {
            jsonp(dataUrl, {"name": callback}, (err, data) => {
                this.jsonpCallback(err, data, isMayorOrCouncillor)
                    .then(value => resolve(value))
                    .catch(err => reject(err));
            });
        });
    }

    jsonpCallback(err,data, isMayorOrCouncillor) {
        return new Promise((resolve, reject) => {
            if(!err){
                let rows = data.table.rows;
                let newCandidates = [];
                map(rows, (row) => {
                    let candidate;
                    if(isMayorOrCouncillor){
                        candidate = this.createMayorOrCouncillorCandidate(row);
                    } else {
                        candidate = this.createLocalBoardCandidate(row);
                    }

                    newCandidates.push(candidate);
                });
                resolve(newCandidates)
            } else {
                reject(err);
            }
        })
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
            'competence': val.c[22]  ? val.c[22].v.trim() : '?',
            'ticket': val.c[23] ? val.c[23].v.trim() : '',
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
            'standingForLocalBoard': val.c[2] ? val.c[2].v : '',
            'subdivision': val.c[3] ? val.c[3].v : '',
            'overallValue': val.c[4] ? val.c[4].v : '?',
            'transport': val.c[5] ? val.c[5].v : '?',
            'housing': val.c[6] ? val.c[6].v : '?',
            'cycling': val.c[7]? val.c[7].v : '?',
            'environment': val.c[8] ? val.c[8].v : '?',
            'overall': val.c[9] && val.c[9].v ? val.c[8].v : '?',
        };
    }

    render() {
        let mayorCandidates = [];
        let councillorCandidates = [];
        let localBoardCandidates = [];

        this.state.candidates.map(candidate => {
            if(candidate.standingForMayor || (candidate.standingForCouncillor && (this.props.ward == candidate.standingForCouncillor)) || (candidate.standingForLocalBoard && (this.props.localBoard == candidate.standingForLocalBoard))) {

                let candidateEl = <Candidate key={candidate.key} candidate={candidate}></Candidate>

                if(candidate.standingForMayor){
                    mayorCandidates.push(candidateEl);
                } else if(candidate.standingForCouncillor){
                    councillorCandidates.push(candidateEl);
                } else {
                    localBoardCandidates.push(candidateEl);
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

        let councillors = <div className="candidates__section card-3">
            <div className="candidates__title">
                {('Scores for Councillor (' + this.props.ward + ')').toUpperCase()}
            </div>
            <div className="candidates__inner">
                {councillorCandidates}
            </div>
        </div>;

        let localBoard = <div className="candidates__section card-3">
            <div className="candidates__title">
                {('Scores for ' + this.props.localBoard + ' Local Board').toUpperCase()}
            </div>
            <div className="candidates__inner">
                {localBoardCandidates}
            </div>
        </div>;

        return <div className='candidates'>
            {this.props.localBoard && localBoardCandidates.length > 0 ? localBoard: ''}
            {this.props.ward ? councillors : ''}
            {this.state.candidates.length > 0 ? mayor : ''}
            {this.state.candidates.length === 0 ? <CircularProgress mode="indeterminate"/> : '' }
            </div>
    }
}
