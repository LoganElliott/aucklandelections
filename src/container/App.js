import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddressSearcher from '../components/addresSearcher/AddressSearcher';
import Cards from '../components/cards/cards';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Housing',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                            key: 'transport',
                            name: 'Transport',
                            score: 'A+',
                            statement: 'I love to ride my bike or catch the train if it rains',
                            avatar: 'Transport-Icon.png'
                        },
                        {
                            key: 'density',
                            name: 'Density Done Well',
                            score: 'A+',
                            statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access',
                            avatar: 'Housing-Icon.png'
                        },
                        {
                            key: 'climate',
                            name: 'Climate Change Ideas',
                            score: 'A+',
                            statement: 'Save the planet!',
                            avatar: 'Environment-Icon.png'

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
                <Header/>
                <AddressSearcher setLocalBoard={this.setLocalBoard}/>
                {/*<CouncillorCard councilors={this.state.councilors} localBoard={this.state.localBoard}/>*/}
                <Cards localBoard={this.state.localBoard}/>
                <Footer/>
            </div>
        </MuiThemeProvider>
    );
  }
}
