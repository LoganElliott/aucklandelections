import React, { Component, PropTypes } from 'react';

const minWidth = 1000;
const categories = ['transport', 'housing', 'environment', 'competence'];

export default class CandidateBreakdown extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
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
    }

    candidateBreakdownOpen (candidate) {
        return this.props.expandedIds.some((val) => val === candidate.key);
    }

    getCandidateBreakdownColourClass (candidate) {
        if(candidate.standingForMayor){
            return 'candidate-breakdown-mayor';
        } else if(candidate.standingForCouncillor) {
            return 'candidate-breakdown-candidate';
        }
    };

    getCandidateColourClass (candidate) {
        if(candidate.standingForMayor){
            return 'candidate-mayor';
        } else if(candidate.standingForCouncillor) {
            return 'candidate-councillor';
        }
    };

    render() {
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

            return <div key={candidate.key+category+'breakdown-scores'}>
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


        let candidateBreakdownIcons = (candidate) =>
            categories.map((category =>
                    <div key={category}
                         className='candidate-breakdown__category'>
                        <img className='candidate-breakdown__big-icon'
                             src={'images/icons/' + category.charAt(0).toUpperCase() + category.slice(1) + '-Icon.png'}
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
            if (this.candidateBreakdownOpen(candidate)) {
                return (
                    <div className={'candidate-breakdown ' + this.getCandidateColourClass(candidate)}>
                        <div className="candidate-breakdown__icons">
                            {candidateBreakdownIcons(candidate)}
                        </div>
                        <div className={'candidate-breakdown-inner ' + this.getCandidateBreakdownColourClass(candidate)}>
                            {candidateBreakdownDetails(candidate)}
                        </div>
                    </div>
                )
            } else {
                return '';
            }
        };

        return (
           /* window.innerWidth >= minWidth ? candidateBreakdown(this.props.candidate) : candidateBreakdownMobile(this.props.candidate)*/
            <div className={"candidate-breakdown-container " + this.getCandidateColourClass(this.props.candidate)}>
                {candidateBreakdown(this.props.candidate)}
                </div>

        )
    }
};
