import React, { Component, PropTypes } from 'react';

import {categories, scoreBreakdowns, iconImagesPath} from '../../conf/conf';
import {getCandidateColourClass, getCandidateBreakdownColourClass} from '../../util/util';

require('./candidateBreakdown.scss');

export default class CandidateBreakdown extends Component {
    constructor(props, context){
        super(props, context);
    }

    isCandidateBreakdownOpen (candidate, expandedIds) {
        return expandedIds.some((val) => val === candidate.key);
    }

    render() {
        let categoryBreakdown = (candidate, category) => {
            let breakdown = [];
            scoreBreakdowns[category].questions.map((v, index) => {
                breakdown.push(
                    <div key={candidate.key + v.title.replace(/\s/g,'')}
                         className="candidate-breakdown__category-score">
                        <div className="candidate-breakdown__category-icon-and-score">
                            <div>
                                <img className="candidate-breakdown__category-score-icon" src={v.image}/>
                            </div>
                            <span
                                className="candidate-breakdown__category-score-value">{candidate.scores[category][index]}/{v.total}
                            </span>
                        </div>
                        <div>
                            <div className="candidate-breakdown__category-score-title">{v.title}</div>
                        </div>
                    </div>
                );
            });

            return <div key={candidate.key+category+'breakdown-scores'}>
                <div className="candidate-breakdown__category-header">
                    <span className="candidate-breakdown__category-header-category">{category.toUpperCase()}</span>
                    <span className="candidate-breakdown__category-header-detailed-score"> - Detailed Scoring</span>
                    <span className="candidate-breakdown__category-header-total">/{scoreBreakdowns[category].total}</span>
                </div>
                <div className="candidate-breakdown__category-scores">
                    {breakdown}
                </div>
            </div>;
        };


        let candidateBreakdownIcons = (candidate) =>
            categories.map((category =>
                    <div key={category}
                         className='candidate-breakdown__category'>
                        <img className='candidate-breakdown__big-icon'
                             src={iconImagesPath + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
                             onClick={() => this.props.selectCategory(candidate.key, category)}
                        />
                        <span className={this.props.categoriesShown.some((val) => val === candidate.key + category) ? 'candidate-breakdown--selected' :''}>{category.toUpperCase()}</span>
                    </div>
            ));

        let candidateBreakdownDetails = (candidate) => {
            let breakdown = [];

            categories.map((category => {
                let currentBreakdown = categoryBreakdown(candidate, category);


                if(this.props.categoriesShown.some((val) => val === candidate.key + category && !breakdown.includes(currentBreakdown))){
                    breakdown = breakdown.concat(currentBreakdown);
                }
            }));
            return breakdown;
        };


        let candidateBreakdown = candidate => {
            if (this.isCandidateBreakdownOpen(candidate, this.props.expandedIds)) {
                return (
                    <div className={'candidate-breakdown ' + getCandidateColourClass(candidate)}>
                        <div className="candidate-breakdown__icons">
                            {candidateBreakdownIcons(candidate)}
                        </div>
                        <div className={'candidate-breakdown-inner ' + getCandidateBreakdownColourClass(candidate)}>
                            {candidateBreakdownDetails(candidate)}
                        </div>
                    </div>
                )
            } else {
                return '';
            }
        };

        return (
            <div className={"candidate-breakdown-container " + getCandidateColourClass(this.props.candidate)}>
                {candidateBreakdown(this.props.candidate)}
                </div>

        )
    }
};
