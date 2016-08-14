import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import CouncillorCard from '../components/councillorCards/councillorCard';

export default class App extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            councilors : [
                {
                    key: 1,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitemata',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },{
                    key: 2,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Whau',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },{
                    key: 3,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitemata',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },{
                    key: 4,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitemata',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },{
                    key: 5,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitemata',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },{
                    key: 6,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitemata',
                    avatar: 'gzLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                },
                {
                    key: 7,
                    email: 'admin@greaterauckland.org.nz',
                    website: 'http://www.greaterauckland.org.nz/',
                    name: 'Greater Auckland',
                    board: 'Albert-Eden',
                    avatar: 'greaterAucklandLogo.jpg',
                    grade: 'A+',
                    expanded: false,
                    scores: [
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'DensityDoneWell.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'climatechange.png'

                        },
                    ]
                }
            ]
        };

        this.setLocalBoard = this.setLocalBoard.bind(this);
    }

    setLocalBoard(localBoard){
        console.log(localBoard);
        this.setState({localBoard:localBoard});
    }

  render() {
    return (
        <MuiThemeProvider>
            <div>
                <AddressSearcher setLocalBoard={this.setLocalBoard}/>
                <CouncillorCard councilors={this.state.councilors} localBoard={this.state.localBoard}/>
            </div>
        </MuiThemeProvider>
    );
  }
}
