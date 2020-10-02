import React, {Component, Fragment, useState} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import img from './form-background.jpg';
import axios from '../../../helpers/axiosConfig';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Formik, Field, Form} from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
  const handleStatusChange = (event, newAlignment) => {
    axios.post('/project/update/'+props.project._id, {"show_status":newAlignment})
    .catch((error) => {});
  }
  return(
    <Grid item xs={12} sm={6} md={4}>
        <Card style={{display: 'flex', flexDirection: 'column'}}>
          <CardMedia image={img} style={{paddingTop: '56.25%'}} title="Image title"/>
          <Link to={"/project/"+props.project._id} style={{textDecoration:"none"}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.project.name}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <DeleteButton id={props.project._id}/>
            <ToggleButtonGroup size="small" value={props.project.show_status} exclusive onChange={handleStatusChange}>
              <ToggleButton value='private' aria-label='private'>Private</ToggleButton>
              <ToggleButton value='public' aria-label='private'>Public</ToggleButton>
            </ToggleButtonGroup>
          </CardActions>
        </Card>

    </Grid>

  )
}
class ProjectList extends Component{
  constructor(props) {
    super(props);
    //this.getAllProject = this.getAllProject.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.pList = this.pList.bind(this);
    this.state = {
      projlist : [],
    };
  }
  onFormSubmit(e){
		e.preventDefault();
		let formD = {
      "name":document.forms.namedItem("create")["name"]["value"],
      "description":document.forms.namedItem("create")["description"]["value"]
		}
		axios.post('/project/create', formD);
  }

  handleStatusChange = (stat) => {
    axios.post('/project/update/'+this.props.match.params.id, {"status":stat}).catch((error) => {});
  }

  pList() {
    return this.state.projlist.map(function(proj, i){
      return <Project project={proj}></Project>
    });
  }

  update(){
    axios.get('/project/').then((res) => {
      this.setState({projlist: res.data.projects});
    })
    .catch((error) => {});
  }
	componentDidMount(){
    axios.get('/project/').then((res) => {
      this.setState({projlist: res.data.projects});
    })
    .catch((error) => {});
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
        <AddButton/>
        <br/>
        <Grid container spacing={4}>
            {this.state.projlist.length > 0 ? (this.pList()) : (
            <Typography
              variant="h5"
              align="center"
            >
              No project yet
            </Typography>
            )}
        </Grid>
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
