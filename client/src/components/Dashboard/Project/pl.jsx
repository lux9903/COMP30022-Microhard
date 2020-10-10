import React, {Component, Fragment, useState} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
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

function DeleteButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};
  const handleDelete = () => {
    setOpen(false);
    axios.delete('/project/'+ props.id).catch((error)=>{});
    props.update();
  }
  return (
    <div>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
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

function AddButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (values) => {
    let url= '/project/create';
    axios.post(url, values).then(() => setOpen(false))
    .catch(() => {});
    props.update();
  };
  return (
    <div>
      <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>Add</Button>
        <MyForm open={open} update={props.update} handleClose={handleClose}
                title='Add a project' submit={onSubmit} 
      />
    </div>
  )
}

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
              }}
              onSubmit = {(values) => {props.submit(values); props.handleClose();}}
            >
              <Form width='100%'>
                <Field as={TextField}
                       label="Name"
                       variant="outlined"
                       name="name"
                       id="name"
                       fullWidth
                />
                <Button
                  type="submit"
                  variant="raised"
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
          <Typography>{props.project.description}</Typography>
          <Typography>Progress: {props.project.status}</Typography>
          <Typography>Show status: {props.project.show_status}</Typography>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Link to={"/project/"+props.project._id}>
          <Button>Edit</Button>
        </Link>
        <DeleteButton id={props.project._id} update={props.update}/>
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
    this.onSearh = this.onSearch.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      projlist : [],
      search : "",
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

  update = () => {
    this.getAll();
    this.pList();
  }
	componentDidMount = () => {
    this.getAll();
  }

  onChangeInput = (event) => {
    event.preventDefault();
    this.setState({input: event.target.value});
  }

  onSearch = (event) => {
    //event.preventDefault();
    if(event.key === "Enter"){
      event.preventDefault();
      axios.post('/project/conditional', {"name":this.state.input})
      .then((res) => {
        this.setState({projlist: res.data.result});
        alert(res.data.result);
      })
      .catch((error) => {});
      this.pList();
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
        <Grid container direction="row">
          <AddButton update={this.update}/>
          <br/>
          <TextField
            onChange ={this.onChangeInput}
            onKeyDown={this.onSearch}
            value={this.state.input}
            variant="outlined"
          />
        </Grid>
        <br/>
        {this.pList()}
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
