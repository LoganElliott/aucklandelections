import React, { Component, PropTypes } from 'react';
import ReactImageFallback from "react-image-fallback";
import RaisedButton from 'material-ui/RaisedButton';

import {categories, iconImagesPath, candidateImagesPath} from '../../conf/conf';
import {getCandidateColourClass, getCandidateBreakdownColourClass} from '../../util/util';

require('./candidateDetails.scss');

export default class CandidateDetails extends Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        let candidateGrade = candidate => <div className="candidate-details-grade-bubble">
            <div className="candidate-details-grade-bubble-value">
                {candidate.overall}
            </div>
        </div>;

        let candidateImage = candidate => <div className='candidate-details-image__container'>
            <ReactImageFallback
                className='candidate-details-image__value'
                height={175}
                width={175}
                src={candidate.image}
                fallbackImage={candidateImagesPath + 'missing.jpg'}>
            </ReactImageFallback>
            {candidateGrade(candidate)}
        </div>;

        let candidateBasicInfo = candidate => <div>
            <h1 className='candidate-details-info__name candidate-info__name-first'>{candidate.firstName}</h1>
            <h1 className='candidate-details-info__name'>{candidate.lastName.toUpperCase()}</h1>
            <h3 className='candidate-details-info__ticket'>{candidate.ticket}</h3>
        </div>;

        let candidateScores = candidate =>
            <div className="candidate-details__scores">
                <div>
                    {categories.map(category =>
                        <img key={candidate+category+'breakdown-images'} className='candidate-details__category'
                             src={iconImagesPath + (candidate.standingForLocalBoard && category === 'competence' ? 'Cycling' : (category.charAt(0).toUpperCase() + category.slice(1))) + '-Icon.png'}
                        />
                    )}
                </div>
                <div className='candidate-details__scores-inner'>
                    {categories.map(category =>
                        <div key={candidate+category+'score'}
                             className={'candidate-details__scores-inner-score candidate-details__category candidate-details__category-' + category}>
                            <div className='candidate-details__scores-inner-score-value'>
                                {candidate.standingForLocalBoard && category === 'competence' ? candidate['cycling'] : candidate[category]}
                            </div>
                        </div>)}
                </div>
            </div>;

        let candidateMarkersConsensus = candidate => <div className='candidate-details__markers-consensus'>
            <div className='candidate-details__markers-consensus-title'>
                {'Marker\'s Consensus'.toUpperCase()}
                <br/>
            </div>
            <div className='candidate-details__markers-consensus-text'>
                '{candidate.consensus}'
            </div>
        </div>;

        let candidateInfoAndMarkersConsensus = candidate => <div className='candidate-details-info'>
            <div className="candidate-details__scores-marker-container">
                <hr className='candidate-details__line'/>
                {!this.props.expandedIds.some((val) => val === candidate.key)
                    ? candidateScores(candidate)
                    : candidateMarkersConsensus(candidate)
                }
                <hr className='candidate-details__line'/>
            </div>
        </div>;

        let breakdownButton = (candidate) => <div className='candidate-details-breakdown-button'>
            {!this.props.expandedIds.some((val) => val === candidate.key)
                ?
                candidate.standingForLocalBoard
                    ?
                    ''
                    :
                    <RaisedButton label='Show Score Breakdown'
                              className={getCandidateBreakdownColourClass(candidate)}
                            disabled={!candidate.consensus}
                            onTouchTap={() => {this.props.handleShow(candidate.key);this.props.selectCategory(candidate.key, 'transport');}}
                    />
                :
                <RaisedButton label='Hide Score Breakdown'
                              className={getCandidateBreakdownColourClass(candidate)}
                              onTouchTap={() => this.props.handleHide(candidate.key)}
                />
            }
        </div>;

        return (
            <div className={'candidate-details ' + getCandidateColourClass(this.props.candidate)}>
                {candidateImage(this.props.candidate)}
                {candidateBasicInfo(this.props.candidate)}
                {candidateInfoAndMarkersConsensus(this.props.candidate)}
                {breakdownButton(this.props.candidate)}
            </div>
        );
    }
}
