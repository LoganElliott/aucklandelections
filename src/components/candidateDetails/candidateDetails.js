import React, { Component, PropTypes } from 'react';
import ReactImageFallback from "react-image-fallback";
import FlatButton from 'material-ui/FlatButton';

const categories = ['transport', 'housing', 'environment', 'competence'];

export default class CandidateDetails extends Component {
    constructor(props, context){
        super(props, context);

    }

    render() {
        let candidateGrade = candidate => <div className="candidate-grade-bubble"><div className="candidate-grade">{candidate.overall}</div></div>;

        let candidateImage = candidate => <div className='councillor-image__container'>
            <ReactImageFallback
                className='councillor-image__value'
                height={175}
                width={175}
                src={candidate.image}
                fallbackImage='images   /candidates/missing.jpg'>
            </ReactImageFallback>
            {candidateGrade(candidate)}
        </div>;

        let candidateScores = candidate =>
            <div className="councillor-info__scores-container">
                <div>
                    {categories.map(category =>
                        <img key={candidate+category+'breakdown-images'} className='councillor-info__category'
                             src={'images/icons/' + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
                        />
                    )}
                </div>
                <div className='councillor-info__scores'>
                    {categories.map(category =>
                        <div key={candidate+category+'breakdown-scores'}
                             className={'councillor-info__score councillor-info__category councillor-info__' + category}>
                            <div className='councillor-info__score-value'>
                                {candidate[category]}
                            </div>
                        </div>)}
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
                {!this.props.expandedIds.some((val) => val === candidate.key)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
            </div>
        </div>;

        let breakdownButton = (candidate) => <div className='councillor-score-breakdown-button'>
            {!this.props.expandedIds.some((val) => val === candidate.key)
                ?
                <FlatButton label='Show Score Breakdown'
                            onTouchTap={() => {this.props.handleShow(candidate.key);this.props.selectCategory(candidate.key, 'transport');}}/>
                :
                <FlatButton label='Hide Score Breakdown'
                            onTouchTap={() => this.props.handleHide(candidate.key)}/>
            }
        </div>;

        let cardColourClass;
        if(this.props.candidate.standingForMayor){
            cardColourClass = 'councillor-mayor';
        } else if(this.props.candidate.standingForCouncillor){
            cardColourClass = 'councillor-councillor';
        }

        return (
            <div className={'councillor-details ' + cardColourClass}>
                {candidateImage(this.props.candidate)}
                <div>
                    <h1 className='councillor-info__name councillor-info__name-first'>{this.props.candidate.firstName}</h1>
                    <h1 className='councillor-info__name'>{this.props.candidate.lastName.toUpperCase()}</h1>
                    <h3 className='councillor-info__ticket'>{this.props.candidate.ticket}</h3>
                </div>
                {candidateInfo(this.props.candidate)}
                {breakdownButton(this.props.candidate)}
            </div>
        );
    }
}
