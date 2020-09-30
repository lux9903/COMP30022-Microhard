import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import {Helmet} from 'react-helmet';
import axios from '../../helpers/axiosConfig';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import { set } from 'mongoose';


class Project_Edit extends Component{
    constructor(props) {
      super(props);

      this.componentDidMount = this.componentDidMount.bind(this);
      //this.handleClickListItem = this.handleClickListItem.bind(this);
      //this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
      //this.handleClose = this.handleClose.bind(this);
      this.state = {
        process : [],
        timeline : [],
        skills : [],
        contributors : [],
        name : "",
        description : "",
        status : "",
        show_status : "",

        open: false,
      };
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
          status: value
        });
    };
    
    handleClose = () => {
        //setOpen(false);
        this.setState({
            open: false
        });
    };
    
    handleOpen = () => {
        this.setState({
            open: true
        });
    };

  
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
            });
        })
        .catch((error) => {});
    }
    render(){
        //const {option} = this.props;
        return(
            <Fragment>
            <Helmet>
                <title>Microhard &middot; Profile </title>
            </Helmet>


            <div style={{padding: "10px", backgroundColor: '#094183'}}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
                        {this.state.name}
                    </Typography>
                </Container>
            </div>
            <br/>

            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {/* Contributors */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Contributors
                            </Typography>
                            <List>
                                {this.state.contributors.map(function(con, i){
                                    return (
                                        <ListItem>
                                            <ListItemText primary={con}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                        </Card>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Status
                            </Typography>
                            <FormControl>
                                <Select
                                    disableUnderline
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={"Inprogress"}>In Progress</MenuItem>
                                    <MenuItem value={"Completed"}>Complete</MenuItem>
                                    <MenuItem value={"Cancel"}>Cancel</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                        </Card>
                    </Grid>
                    {/* Rating */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Rating
                            </Typography>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Read only</Typography>
                                <Rating name="read-only" defaultValue={5.0} precision={0.5} readOnly />
                            </Box>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            
            {/* Timeline */}
            <Container>
                <Timeline>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">09:30 am</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>Eat</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </Container>

            <Container maxWidth="md">
                <Typography gutterBottom variant="h5" component="h2">
                    Description
                </Typography>

                {this.state.description===""? 
                <Typography gutterBottom variant="body2">
                    No Description Yet
                </Typography>
                : 
                <Typography gutterBottom variant="body2">
                    {this.state.description}
                </Typography>
                }
            </Container>
            </Fragment>
        );
    }
}

  
export default withRouter(Project_Edit);



//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/*export default function Album() {
  const classes = useStyles();

  return (
    <Fragment>
        <Helmet>
          <title>Microhard &middot; Profile </title>
        </Helmet>


        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    MicroHard
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    IT project that i been currently participate for my bachelor degree.
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
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Lyn" secondary="Manager"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Luc" secondary="Designer"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Huy" secondary="Vice"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Alice" secondary="Nobody"/>
                            </ListItem>
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
                        <FormControl className={classes.margin}></FormControl>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                //input={<BootstrapInput />}
                            >
                                <MenuItem>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem>In Progress</MenuItem>
                                <MenuItem>Completed</MenuItem>
                                <MenuItem>Cancel</MenuItem>
                            </Select>
                        <Typography>
                            In Progress.
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>

                //rating stuff
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Rating
                        </Typography>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Read only</Typography>
                            <Rating name="read-only" defaultValue={2.5} precision={0.5} readOnly />
                        </Box>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        
        //timeline stuff
        <Container className={classes.timeline}>
            <Timeline>
                <TimelineItem>
                    <TimelineOppositeContent>
                        <Typography color="textSecondary">09:30 am</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography>Eat</Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </Container>

        <Container className={classes.cardGrid} maxWidth="md">
            <Typography gutterBottom variant="h5" component="h2">
                Introduction
            </Typography>
            <Typography gutterBottom variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque finibus fermentum. Aliquam viverra pharetra ante, ut iaculis augue tristique nec. Aenean non eros ultrices velit dictum pellentesque. Suspendisse nec odio purus. Integer id velit massa. Pellentesque vel neque nunc. Suspendisse dictum laoreet sollicitudin. Proin ut scelerisque urna. Praesent id tortor dictum, blandit lorem nec, iaculis lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse maximus elit eget condimentum luctus. Quisque a est id risus gravida posuere eu quis neque. Morbi rutrum ipsum ipsum, id scelerisque metus lobortis eget. Nulla aliquet, velit eget imperdiet condimentum, risus turpis aliquet felis, a accumsan sem massa eget felis. Phasellus congue justo id justo venenatis, sit amet tempor mi consectetur. Nullam ut mi ipsum.
                Nam auctor arcu eget fermentum efficitur. Duis elementum, nunc vel condimentum interdum, nisi ligula tincidunt erat, non varius ex felis sit amet sapien. Integer eu mi mattis, consectetur odio at, tincidunt lectus. Sed at eros nec augue mollis accumsan. Mauris vehicula scelerisque tellus, eget lacinia ex finibus quis. Pellentesque elit purus, volutpat nec lacus sed, blandit blandit tellus. Phasellus congue leo laoreet ante lacinia, ac hendrerit ex fringilla. Sed felis ipsum, sollicitudin ut urna et, consequat porta justo. Morbi eleifend risus maximus, consectetur leo id, ullamcorper felis. Praesent arcu leo, ultrices in odio vel, tempor vestibulum leo.
            </Typography>
        </Container>
    </Fragment>
  );
}

componentDidMount(){
        let {id} = useParams();
        axios.get('/project/'+{id}).then((res) => {
        this.setState({
            name: res.data.project.name,
            description: res.data.project.description,
            contributors: res.data.project.contributors,
            skills: res.data.project.skills,
            status: res.data.project.status,
            show_status: res.data.project.show_status,
            process: res.data.project.process,
            timeline: res.data.project.timeline,
        });
      })
        .catch((error) => {});
    }
    const Project_Edit = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [show_status, setShow_Status] = useState("");
    const [contributors, setContributors] = useState([]);
    const [skills, setSkills] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [process, setProcess] = useState([]);

  
    useEffect(() => {
        let {id} = useParams();
        axios.get('/project/'+{id}).then((res) => {
            setName(res.data.project.name);
            setDescription();
            setStatus();
            setShow_Status();
            setContributors();
            setSkills();
            setTimeline();
            setProcess();
        })
        .catch((error) => {});
    }, []);


        handleClickListItem(event){
        this.setState({anchorEl: event.currentTarget});
    };
    
    handleMenuItemClick(event, index){
        this.setState({selectedIndex: index});
        this.setState({anchorEl:null})
        this.setState({status:this.options[index]});
    };
    
    handleClose(){
        this.setState({anchorEl:null});
    };
*/