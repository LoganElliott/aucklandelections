import React, {PropTypes} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Email from 'material-ui/svg-icons/communication/email';
import Link from 'material-ui/svg-icons/content/link';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

require('./councillorCard.scss');

export default class councillorCard extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expandedIds: [],
            councilors : [
                {
                    key: 1,
                    email: 'info@generationzero.org.nz',
                    website: 'http://www.generationzero.org/',
                    name: 'Generation Zero',
                    board: 'Waitamata',
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
                    board: 'Waitamata',
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
                    board: 'Waitamata',
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
                    board: 'Waitamata',
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
                    board: 'Waitamata',
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
                    board: 'Waitamata',
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

        this.handleWebsiteClick = this.handleWebsiteClick.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
    }

    handleWebsiteClick(website) {
        window.open(website, '_blank');
    }

    handleExpand(councilorId){
        this.setState({expandedIds:this.state.expandedIds.concat(councilorId)});
    };

    handleReduce (councilorId) {

        this.setState({expandedIds:this.state.expandedIds.filter((val) => {return val !== councilorId})});

    };

     render() {

         const grade = {
             color: 'green',
             fontSize: '300%'
         };

         const width = {
           width: "400px"
         };

         const councillors = this.state.councilors.map(councillor =>
         <span>
             <Card
                 key={councillor.key}
                 expanded={this.state.expandedIds.some((val) => {return val === councillor.key})}>
                 <CardHeader
                     title={councillor.name}
                     subtitle={councillor.board + ' local board'}
                     avatar={councillor.avatar}
                     actAsExpander={true}
                     showExpandableButton={true}
                     style={width}
                 >
                     <span style={grade}>{councillor.grade}</span>
                 </CardHeader>
                 <CardText>
                     <List>
                         <ListItem
                             primaryText={councillor.email}
                             leftIcon={<Email />}
                             disabled
                         />
                         <ListItem
                             primaryText={councillor.website}
                             leftIcon={<Link />}
                             onClick={() => this.handleWebsiteClick(councillor.website)}
                         />
                     </List>
                 </CardText>
                 <CardText expandable={true}>
                     <list>
                         {councillor.scores.map(
                             score => <ListItem
                                 key={score.key}
                                 primaryText={score.name}
                                 leftAvatar={<Avatar size={40} src={score.avatar}/>}
                                 rightAvatar={<Avatar>{score.score}</Avatar>}/>
                         )
                         }
                     </list>
                 </CardText>
                 <CardActions>
                     {
                         !this.state.expandedIds.some((val) => {return val === councillor.key})
                             ? <FlatButton label="Show scores" onTouchTap={() => this.handleExpand(councillor.key)} />
                             : <FlatButton label="Hide scores" onTouchTap={() => this.handleReduce(councillor.key)} />
                     }
                 </CardActions>
             </Card>
         </span>
         );

        return(
            <div id="container">
                {councillors}
            </div>
        );
    }

}
