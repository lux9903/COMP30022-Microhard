import React, {Component, Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {withStyles} from '@material-ui/core/styles';
import {Formik, Field, Form} from 'formik';
import Alert from '@material-ui/lab/Alert';
import {CircularProgress} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {fetchProjectListCondition, deleteProject, createProject} from '../../../actions/projectAction';

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

//button to opening warning delete form
function DeleteButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};

  //this might need to change to down 
  const handleDelete = () => {
    setOpen(false);
    props.delete(props.id);
  }
  return (
    <div>
      <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? 
            The project will be permanently delete and unable to recover.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//Button opening add form
function AddButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //this also need to go down 
  const onSubmit = (values) => {
    props.add(values);
  };


  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddBoxIcon color="primary"/>
      </IconButton>
      <MyForm open={open} handleClose={handleClose}
                title='Add a project' submit={onSubmit} 
      />
    </div>
  )
}

//adding form
function MyForm(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
    >
        <DialogContent>
          <div>
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              onSubmit = {(values) => {props.submit(values); props.handleClose();}}
            >
              <Form width='100%' mt="2">
                <Typography>ADD NEW PROJECT</Typography>
                <Divider/>
                <Field as={TextField}
                  label="Name"
                  variant="outlined"
                  name="name"
                  id="name"
                  fullWidth
                  required
                />
                <br/>
                <Field as={TextField}
                  label="Description"
                  variant="outlined"
                  name="description"
                  id="description"
                  fullWidth
                />
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        </DialogContent>
    </Dialog>
  )
}


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
          <Typography>Show status: {props.project.show_status}</Typography>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button variant="contained" color="primary" size="small" href={"/project/view/"+props.project._id}>
          View
        </Button>
        <Button variant="contained" color="primary" size="small" href={"/project/"+props.project._id}>
          Edit
        </Button>
        <DeleteButton id={props.project._id} delete={(id)=>props.delete(id)}/>
      </AccordionActions>
    </Accordion>
  )
}
class ProjectList extends Component{
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.pList = this.pList.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.getCondition= this.getCondition.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onShowStatusChange = this.onShowStatusChange.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.state = {
      search : "",
      search_status: "",
      sortBy: "",
      show_status: "",
    };
  }

  //add new project
  onFormSubmit = (value) => {
    console.log(value);
    this.props.dispatch(createProject(value));
  }

  deleteProject = (id) => {
    this.props.dispatch(deleteProject(id));
  }

  pList = () => {
    return (this.state.projlist && this.state.projlist.map((proj, i) => {
      return <Project project={proj} delete={this.deleteProject}/>
    }));
  }

  getCondition = () =>{
    let formD = {"name": this.state.input}
    if(this.state.search_status !== ""){
      formD['status'] = this.state.search_status;
    }
    if(this.state.sortBy !== ""){
      formD['sortBy'] = this.state.sortBy;
    }
    if(this.state.show_status !== ""){
      formD['show_status'] = this.state.show_status;
    }
    this.props.dispatch(fetchProjectListCondition(formD));
  }

	componentDidMount = () => {
    this.getCondition();
  }

  onChangeInput = (event) => {
    this.setState({input: event.target.value});
  }

  onSearch = (event) => {
    if(event.key === "Enter"){
      this.getCondition();
    }
  }

  onStatusChange = (event, newstatus) => {
    if(newstatus !== null){
      this.setState(
        {search_status: newstatus},
        this.getCondition
      );
    }
  }

  onSortChange = (event, newsort) => {
    if(newsort !== null){
      this.setState(
        {sortBy: newsort},
        this.getCondition
      );
    }
  }

  onShowStatusChange = (event, newshow) => {
    if(newshow !== null){
      this.setState(
        {show_status: newshow},
        this.getCondition
      );
    }
  }

	render(){
    const {error, isFetching, projects} = this.props.project;
    const {classes} = this.props;

    let content;

    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (isFetching) {
      content = (
        <Grid container justify="center" alignItems="center">
          <CircularProgress color="primary"/>
        </Grid>
      );
    } else if (projects.length === 0 || !projects) {
      content = (
        <Grid container justify="center" alignItems="center">
          <Typography> No projects found.</Typography>
        </Grid>
      );
    } else {
      content = projects.map((proj) => (
        <Project project={proj} delete={this.deleteProject}/>
      ));
    }
    return(
      <Fragment>
      <Helmet>
        <title>Microhard &middot; My projects </title>
      </Helmet>
      <div style={{height: '120px', backgroundColor: '#094183'}}>
        <br />
        <br />
        <Typography variant="h1" align="center" style={{color: '#fff'}}>
          Project Lists
        </Typography>
      </div>
      <br/>
      <Container maxWidth="md">
        <Grid container direction="row" justify="space-between" alignItems="center">
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

          <ToggleButtonGroup
            value={this.state.show_status}
            exclusive
            onChange={this.onShowStatusChange}
            size="small"
          >
            <ToggleButton value="">All</ToggleButton>
            <ToggleButton value='public'>Public</ToggleButton>
            <ToggleButton value='private'>Private</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <AddButton add={this.onFormSubmit}/>
        </Grid>
        <br/>
        {content}
        <br/>
        <br/>
      </Container>
    </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(ProjectList));
