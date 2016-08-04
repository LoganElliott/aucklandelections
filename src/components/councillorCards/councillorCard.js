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
            email: 'info@generationzero.org.nz',
            website: 'http://www.generationzero.org/',
            name: 'Generation Zero',
            board: 'Waitamata',
            avatar: 'gzLogo.jpg',
            grade: 'A+',
            expanded: false,
            scores: {
                density: {
                    name: 'Density Done Well',
                    score: 'A+',
                    statement: 'Wooo housing choices for everyone, I really want people to have houses close to where they live and play. With good public transport access'
                },
                climateChange : {
                    name: 'Climate Change Ideas',
                    score: 'A+',
                    statement: 'Save the planet!'

                },
            }
        };

        this.handleWebsiteClick = this.handleWebsiteClick.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
    }

    handleWebsiteClick() {
        window.open(this.state.website, '_blank');
    }

    handleExpandChange (expanded) {
        this.setState({expanded: expanded});
    };

    handleExpand(){
        this.setState({expanded: true});
    };

    handleReduce () {
        this.setState({expanded: false});
    };

     render() {
         const grade = {
           color: 'green',
             fontSize: '300%'
         };

        return(
            <div id="councillorCard">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={this.state.name}
                        subtitle={this.state.board + ' local board'}
                        avatar={this.state.avatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                    >
                        <span style={grade}>{this.state.grade}</span>
                    </CardHeader>
                    <CardText>
                        <List>
                            <ListItem
                                primaryText={this.state.email}
                                leftIcon={<Email />}
                                disabled
                            />
                            <ListItem
                                primaryText={this.state.website}
                                leftIcon={<Link />}
                                onClick={this.handleWebsiteClick}
                            />
                        </List>
                    </CardText>
                    <CardText expandable={true}>
                        <List>
                            <ListItem
                                primaryText={this.state.scores.density.name}
                                leftAvatar={<Avatar size={40} src={'DensityDoneWell.png'}/>}
                                rightAvatar={<Avatar>{this.state.scores.density.score}</Avatar>}
                                secondaryText={this.state.scores.density.statement}
                            />
                            <ListItem
                                primaryText={this.state.scores.climateChange.name}
                                leftAvatar={<Avatar size={40} src={'climatechange.png'}/>}
                                rightAvatar={<Avatar>{this.state.scores.climateChange.score}</Avatar>}
                                secondaryText={this.state.scores.climateChange.statement}
                            />
                        </List>
                    </CardText>
                    <CardActions>
                        { !this.state.expanded ? <FlatButton label="Show scores" onTouchTap={this.handleExpand} /> : <FlatButton label="Hide scores" onTouchTap={this.handleReduce} /> }
                    </CardActions>
                </Card>
            </div>
        );
    }

}
