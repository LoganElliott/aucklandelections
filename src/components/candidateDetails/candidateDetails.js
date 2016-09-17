import React, { Component, PropTypes } from 'react';
import ReactImageFallback from "react-image-fallback";
import RaisedButton from 'material-ui/RaisedButton';

const categories = ['transport', 'housing', 'environment', 'competence'];

export default class CandidateDetails extends Component {
    constructor(props, context){
        super(props, context);

    }

    getCandidateBreakdownColourClass (candidate) {
        if(candidate.standingForMayor){
            return 'candidate-breakdown-mayor-button';
        } else if(candidate.standingForCouncillor) {
            return 'candidate-breakdown-candidate-button';
        }
    };

    render() {
        let candidateGrade = candidate => <div className="candidate-grade-bubble"><div className="candidate-grade">{candidate.overall}</div></div>;

        let candidateImage = candidate => <div className='candidate-image__container'>
            <ReactImageFallback
                className='candidate-image__value'
                height={175}
                width={175}
                src={candidate.image}
                fallbackImage='images/candidates/missing.jpg'>
            </ReactImageFallback>
            {candidateGrade(candidate)}
        </div>;

        let candidateScores = candidate =>
            <div className="candidate-info__scores-container">
                <div>
                    {categories.map(category =>
                        <img key={candidate+category+'breakdown-images'} className='candidate-info__category'
                             src={'images/icons/' + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
                        />
                    )}
                </div>
                <div className='candidate-info__scores'>
                    {categories.map(category =>
                        <div key={candidate+category+'breakdown-scores'}
                             className={'candidate-info__score candidate-info__category candidate-info__' + category}>
                            <div className='candidate-info__score-value'>
                                {candidate[category]}
                            </div>
                        </div>)}
                </div>
            </div>;

        let candidateMarkersConsensus = candidate => <div className='candidate-info-markers-consensus'>
            <hr className='candidate-info-markers-consensus-line'/>
            <div className='candidate-info-markers-consensus-title'>
                {'Marker\'s Consensus'}
                <br/>
            </div>
            '{candidate.consensus}'
            <hr className='candidate-info-markers-consensus-line'/>
        </div>;

        let candidateInfo = candidate => <div className='candidate-info candidate-info-container'>
            <div className='candidate-info-markers-consensus-scores'>
                {!this.props.expandedIds.some((val) => val === candidate.key)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
            </div>
        </div>;

        let breakdownButton = (candidate) => <div className='candidate-score-breakdown-button'>
            {!this.props.expandedIds.some((val) => val === candidate.key)
                ?
                <RaisedButton label='Show Score Breakdown'
                              className={this.getCandidateBreakdownColourClass(candidate)}
                            disabled={!candidate.consensus}
                            onTouchTap={() => {this.props.handleShow(candidate.key);this.props.selectCategory(candidate.key, 'transport');}}
                />
                :
                <RaisedButton label='Hide Score Breakdown'
                              className={this.getCandidateBreakdownColourClass(candidate)}
                              onTouchTap={() => this.props.handleHide(candidate.key)}
                />
            }
        </div>;

        let cardColourClass;
        if(this.props.candidate.standingForMayor){
            cardColourClass = 'candidate-mayor';
        } else if(this.props.candidate.standingForCouncillor){
            cardColourClass = 'candidate-councillor';
        }

        return (
            <div className={'candidate-details ' + cardColourClass}>
                {candidateImage(this.props.candidate)}
                <div>
                    <h1 className='candidate-info__name candidate-info__name-first'>{this.props.candidate.firstName}</h1>
                    <h1 className='candidate-info__name'>{this.props.candidate.lastName.toUpperCase()}</h1>
                    <h3 className='candidate-info__ticket'>{this.props.candidate.ticket}</h3>
                </div>
                {candidateInfo(this.props.candidate)}
                {breakdownButton(this.props.candidate)}
            </div>
        );
    }
}
