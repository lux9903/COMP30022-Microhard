import React, {Component, Fragment} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../../helpers/axiosConfig';
import TextField from '@material-ui/core/TextField';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = (theme) => ({
  heroContent: {
      backgroundColor: '#094183',
      padding: theme.spacing(6, 0, 6),
  },
  body: {
      paddingTop: theme.spacing(4),
  },
  searchbar: {
    display: 'flex',
    alignItems: 'center',
    justify: "space-between",
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

//this function render each project in the project list
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
    this.update = this.update.bind(this);
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

  //this function will use the projlist that save from get request and render each project by calling 
  //the function "project" above
  pList = () => {
    return (this.state.projlist && this.state.projlist.map((proj, i) => {
      return <Project project={proj} update={this.update}/>
    }));
  }

  //this will analyse the input from user and do get request based on them
  //this get request will responsible for:
  // -get all public
  // -handle toggle to sort out projects based on condition
  // -handle name search
  getCondition = () =>{
    let formD = {
      "name": this.state.input,
      "show_status": "public",
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
    })
    .catch((error) => {});
  }

  //the update function will just do get request then call the render function to re-render
  update = () => {
    this.getCondition();
    this.pList();
  }

  //this is just function to mount the class
	componentDidMount = () => {
    this.getCondition();
  }

  //this will set the input from search bar
  onChangeInput = (event) => {
    event.preventDefault();
    this.setState({input: event.target.value});
  }

  //call update if user hit enter in search bar to signal search
  onSearch = (event) => {
    //event.preventDefault();
    if(event.key === "Enter"){
      this.update();
    }
  }

  //handle of toggle button for progress status sorting
  onStatusChange = (event, newstatus) => {
    if(newstatus !== null){
      this.setState(
        {search_status: newstatus},
        this.update
      );
    }
  }

  //handle of toggle button for show status sorting
  onSortChange = (event, newsort) => {
    if(newsort !== null){
      this.setState(
        {sortBy: newsort},
        this.update
      );
    }
  }

  //view for project list will do not have sorting for public/private because guest will do not able 
  //to know those attributes, only owner can
  
	render(){
    const {classes} = this.props;
    return(
      <Fragment>
      <Helmet>
        <title>Microhard &middot; My projects </title>
      </Helmet>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
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
      <Container maxWidth="md" className={classes.body}>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <TextField
            onChange ={this.onChangeInput}
            onKeyDown={this.onSearch}
            value={this.state.input}
            variant="outlined"
            size="small"
            label="Search name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
               )
              }}
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

//export default (ProjectList);

export default withStyles(styles)(ProjectList);
