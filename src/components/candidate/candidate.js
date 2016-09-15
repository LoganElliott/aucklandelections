import React, { Component, PropTypes } from 'react';

import CandidateDetails from '../candidateDetails/candidateDetails';
import CandidateBreakdown from '../candidateBreakdown/candidateBreakdown'


export default class Candidate extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            expandedIds: [],
            categoriesShown: [],
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
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

    render() {
        return (
            <div key={this.props.candidate.key} className='councillor-card'>
                <CandidateDetails candidate={this.props.candidate}
                                  expandedIds={this.state.expandedIds}
                                  handleShow={this.handleShow}
                                  handleHide={this.handleHide}
                                  selectCategory={this.selectCategory}/>
                <CandidateBreakdown candidate={this.props.candidate}
                                    selectCategory={this.selectCategory}
                                    categoriesShown={this.state.categoriesShown}
                                    expandedIds={this.state.expandedIds}/>
            </div>
        );
    }
}
