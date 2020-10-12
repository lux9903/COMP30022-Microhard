import React, {Component, Fragment, useState} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import axios from '../../../helpers/axiosConfig';
import {Formik, Field, Form} from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';

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
  container:{
    justify_content: "space-between",
  }
});


function Project(props){
  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{props.project.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          <Typography>Description: {props.project.description}</Typography>
          <Typography>Progress: {props.project.status}</Typography>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button variant="contained" size="small" href={"/project/"+props.project._id}>
          View
        </Button>
      </AccordionActions>
    </Accordion>
  )
}
class ProjectList extends Component{
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.pList = this.pList.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.getCondition= this.getCondition.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.state = {
      projlist : [],
      search : "",
      search_status: "",
      sortBy: "",
    };
  }

  onFormSubmit = (e) => {
		e.preventDefault();
		let formD = {
      "name":document.forms.namedItem("create")["name"]["value"],
      "description":document.forms.namedItem("create")["description"]["value"]
		}
		axios.post('/project/create', formD);
  }

  pList = () => {
    return (this.state.projlist && this.state.projlist.map((proj, i) => {
      return <Project project={proj} update={this.update}/>
    }));
  }

  getAll = () => {
    axios.get('/project/').then((res) => {
      this.setState({projlist: res.data.projects});
    })
    .catch((error) => {})
  }

  getCondition = () =>{
    let formD = {
      "name": this.state.input,
      "status": "public"
    }

    if(this.state.search_status !== ""){
      formD['status'] = this.state.search_status;
    }

    if(this.state.sortBy !== ""){
      formD['sortBy'] = this.state.sortBy;
    }

    axios.post('/project/conditional',formD)
    .then((res) => {
      this.setState({projlist: res.data.result});
      //alert(res.data.result);
    })
    .catch((error) => {});
  }

  update = () => {
    this.getCondition();
    this.pList();
  }
	componentDidMount = () => {
    this.getCondition();
  }

  onChangeInput = (event) => {
    event.preventDefault();
    this.setState({input: event.target.value});
  }

  onSearch = (event) => {
    //event.preventDefault();
    if(event.key === "Enter"){
      this.update();
    }
  }

  onStatusChange = (event, newstatus) => {
    if(newstatus !== null){
      this.setState(
        {search_status: newstatus},
        //alert(this.state.search_status),
        this.update
      );
    }
    //alert(this.state.search_status);
  }

  onSortChange = (event, newsort) => {
    if(newsort !== null){
      this.setState(
        {sortBy: newsort},
        //alert(this.state.search_status),
        this.update
      );
    }
  }

	render(){
    return(
      <Fragment>
      <Helmet>
        <title>Microhard &middot; My projects </title>
      </Helmet>
      <div style={{padding: "10px", backgroundColor: '#094183'}}>
        <Container maxWidth="sm">
          <br />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            style={{color: '#fff'}}
            gutterBottom
          >
            Project Lists
          </Typography>
          <Typography
            variant="h5"
            align="center"
            style={{color: '#fff'}}
            paragraph
          >
            A place for me to showcase my projects
          </Typography>
        </Container>
      </div>
      <br/>
      <Container maxWidth="md">
        <Grid container spacing={1} direction="row" justify="space-evenly" alignItems="center">
          <TextField
            onChange ={this.onChangeInput}
            onKeyDown={this.onSearch}
            value={this.state.input}
            variant="outlined"
            size="small"
            label="Search name"
          />
          <ToggleButtonGroup
            value={this.state.sortBy}
            exclusive
            onChange={this.onSortChange}
            size="small"
          >
            <ToggleButton value="">All</ToggleButton>
            <ToggleButton value='descending'>Oldest</ToggleButton>
            <ToggleButton value='ascending'>Lastest</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={this.state.search_status}
            exclusive
            onChange={this.onStatusChange}
            size="small"
          >
            <ToggleButton value="">All</ToggleButton>
            <ToggleButton value='Inprogress'>In Progress</ToggleButton>
            <ToggleButton value='Completed'>Complete</ToggleButton>
            <ToggleButton value='Cancel'>Cancel</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <br/>
        {this.pList()}
        <br/>
        <br/>
      </Container>
    </Fragment>
    );
  }
}
/*const mapStateToProps = (state) => ({
  ...state,
});*/

//export default connect(mapStateToProps)(withStyles(styles)(Profile));

export default (ProjectList);
