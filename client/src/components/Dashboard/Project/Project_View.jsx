import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import {Helmet} from 'react-helmet';
import axios from '../../helpers/axiosConfig';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import IconButton from '@material-ui/core/IconButton';

//import { update } from '../../../../server/models/projectModel';

const styles = (theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: '#094183',
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    ListItem:{
        padding: "0px",
    },
    list:{
        maxHeight: 100,
        overflow: 'auto',
    },
});

class Project_View extends Component{
    constructor(props) {
      super(props);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleRating = this.handleRating.bind(this);
      this.state = {
        process : [],
        timeline : [],
        skills : [],
        contributors : [],
        name : "",
        description : "",
        status : "",
        show_status : "",
        rating: 0,
        input: "",
      };
    }

    handleRating(){
        axios.post('/project/like/anoymous/'+this.props.match.params.id).catch((error)=>{});
    }
    componentDidMount = () =>{
        axios.get('/project/'+this.props.match.params.id).then((res) => {
            this.setState({
                name: res.data.project.name,
                description: res.data.project.description,
                contributors: res.data.project.contributors,
                skills: res.data.project.skills,
                status: res.data.project.status,
                show_status: res.data.project.show_status,
                process: res.data.project.process,
                timeline: res.data.project.timeline,
                rating: res.data.project.rating,
            });
        })
        .catch((error) => {});
    }
    render(){
        //const {option} = this.props;
        const {classes} = this.props;
        const id= this.props.match.params.id;
        return(
            <Fragment>
            <Helmet>
              <title>Microhard &middot; Profile </title>
            </Helmet>
    
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
                        {this.state.name}
                    </Typography>
                </Container>
            </div>
    
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Contributor
                            </Typography>
                            <List className={classes.list} >
                                {this.state.contributors.map(function(cons, i){
                                    return (
                                        <ListItem className={classes.ListItem}>
                                            <ListItemText primary={cons}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Status
                            </Typography>
                            <Typography>
                                {this.state.status}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Rating
                            </Typography>
                            <Typography component="body2">
                                {this.state.rating} people likes
                            </Typography>
                            <IconButton>
                                <ThumbUpAltIcon onClick={this.handleRating}/>
                            </IconButton>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Description
                        </Typography>
                        <Typography component="body2">
                            {this.state.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Process
                        </Typography>
                        <Typography component="body2">
                            No process yet
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Timeline
                        </Typography>
                        <Timeline>
                            {this.state.timeline.map((item,i)=>{
                                return(
                                    <TimelineItem>
                                        <TimelineOppositeContent>
                                            <Typography color="textSecondary">{item.date}</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography>{item.description}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                )}
                            )}
                        </Timeline>
                    </CardContent>
                </Card>
            </Container>
            <br/>
            <br/>
        </Fragment>
    );}
}
export default withRouter(withStyles(styles)(Project_View));

//export default connect(mapStateToProps)(withStyles(styles)(Profile));

