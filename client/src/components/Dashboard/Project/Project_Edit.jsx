import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import {Helmet} from 'react-helmet';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
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
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import {Formik, Field, Form} from 'formik';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ClearIcon from '@material-ui/icons/Clear';

import Con_items from './Contributors';
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
    input: {
        color: "white",
        fontSize:50,
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

class Project_Edit extends Component{
    constructor(props) {
      super(props);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.update = this.update.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleNameOnChange = this.handleNameOnChange.bind(this);
      this.handleDescChange = this.handleDescChange.bind(this);
      this.handleDescOnChange = this.handleDescOnChange.bind(this);
      this.handleContributorAdd = this.handleContributorAdd.bind(this);
      this.handleContributorOnChange = this.handleContributorOnChange.bind(this);
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

        open: false,
      };
    }
    
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    
    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleNameChange(event){
        if(event.key ==='Enter'){
            axios.post('/project/update/'+this.props.match.params.id, {"name":event.target.value}).catch((error) => {});
            this.update();
        }
    };

    handleNameOnChange(e){
        this.setState({
            name: e.target.value,
        });
    }

    handleDescChange = (event) => {
        axios.post('/project/update/'+this.props.match.params.id, {"description":this.state.description}).catch((error) => {});
        this.update();
    };

    handleDescOnChange(e){
        this.setState({
            description: e.target.value,
        });
    }

    handleStatusChange = event => {
        axios.post('/project/update/'+this.props.match.params.id, {"status":event.target.value}).catch((error) => {});
        this.update();
    };
    
    //create a skills
    handleSkillCreate = news => {
        this.setState({skills: [...this.state.skills, news]});
        axios.post('/project/update/'+this.props.match.params.id, {"skills":this.state.skills}).catch((error) => {});
        this.update();
    };

    //delete a skills
    handleSkillDelete = change => {
        var skills = [...this.state.skills]; // make a separate copy of the array
        var index = this.state.skills.indexOf(change)
        if (index !== -1) {
          skills.splice(index, 1);
        }
        axios.post('/project/update/'+this.props.match.params.id, {"skills":skills}).catch((error) => {});
        this.update();
    };

    //upate a skills
    handleSkillUpdate = (prev, news) => {
        this.handleSkillDelete(prev);
        this.handleSkillCreate(news);
    };

    handleStepCreate = (no,name) => {
        axios.post('project/process/'+this.props.match.params.id,{no:name}).catch((error) => {});
        this.update();
    }

    handleStepDelete = (no,name) => {
        axios.post('project/process/remove/'+this.props.match.params.id,{no:name}).catch((error) => {});
        this.update();
    }

    handleContributorAdd(event){
        axios.post('/project/add_people/'+this.props.match.params.id, {"new_users":[this.state.input]}).catch((error) => {});
        this.update();
    };

    handleContributorOnChange(event){
        this.setState({
            input: event.target.value,
        });
    }

    update(){
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
                input: "",
                rating: res.data.project.rating,
            });
        })
        .catch((error) => {});
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
                        <TextField
                            value = {this.state.name}
                            onKeyDown={this.handleNameChange}
                            onChange={this.handleNameOnChange}
                            fullWidth
                            InputProps={{
                                className: classes.input,
                                disableUnderline: true
                            }}
                            inputProps={{style: { textAlign: 'center' }}}
                        />
                    </Typography>
                </Container>
            </div>

            <Container className={classes.cardGrid} maxWidth="md">
                <div>
                <Grid container spacing={4}>
                    {/* Contributors */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Contributors
                            </Typography>
                            { this.state.contributors.length>0 ? (
                                <List className={classes.list}>
                                    {this.state.contributors.map(function(cons,i){
                                        return <Con_items name={cons} id={id}/>})}
                                </List>
                            ) : (
                                <Typography>
                                    No contributor yet
                                </Typography>
                            )}
                            <TextField
                                label="Add new contributor"
                                onChange={this.handleContributorOnChange}
                                value={this.state.input}
                                fullWidth
                                InputProps={{disableUnderline: true }}
                            />
                            <Button fullWidth onClick={this.handleContributorAdd} size="small" variant="contained" color="primary">Add</Button>
                        </CardContent>
                        </Card>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
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
                                    onChange={this.handleStatusChange}
                                >
                                    <MenuItem value={"Inprogress"}>
                                        <em>In Progress</em>
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>Complete</MenuItem>
                                    <MenuItem value={"Cancel"}>Cancel</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                        </Card>
                    </Grid>
                    {/* Rating */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Rating
                            </Typography>
                            <Typography component="body2">
                                {this.state.rating} people likes
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                </div>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Description
                        </Typography>
                        <TextField
                            value = {this.state.description}
                            //onKeyDown={this.handleNameChange}
                            onChange={this.handleDescOnChange}
                            fullWidth
                            multiline
                            InputProps={{ disableUnderline: true }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.handleDescChange} size="small" variant="contained" color="primary">Submit</Button>
                    </CardActions>
                </Card>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Process
                    </Typography>
                    <Typography>
                        No process yet
                    </Typography>
                    </CardContent>
                </Card>
                <CardActions>
                </CardActions>
            </Container>
            {/* Timeline */}
            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Time line
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
        );
    }
}

  
//export default withRouter(Project_Edit);
export default withRouter(withStyles(styles)(Project_Edit));



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

    
                {this.state.process.length> 0 ? (
                    this.processList();
                ) : ( 
                    <Typography gutterBottom variant="body2">
                        No Process Yet
                    </Typography>
                )}

    { this.state.process.length>0 ? (
                    this.state.process.map(function(step,i){
                        return <Process_step step={step} id={id}/>;
                    })
                ) : (
                    <Typography>
                        No process yet
                    </Typography>
    )}
*/
