import React, {Component, Fragment, useState, useEffect} from 'react';
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
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img from './form-background.jpg';
import axios from '../../helpers/axiosConfig';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

import Switch from '@material-ui/core/Switch';

import {Formik, Field, Form} from 'formik';
//when useEffecr trigger? when the useState attribute is being changed

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: '#094183',
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function ProjectList() {
  const [projlist, setProjlist] = useState([]);
  //const [search, setSearch] = useState("");
  //const [upsort, setUpsort] = useState["ascending"];
  //const [statsort, setStatsort] = useState[""];
  
  const [curpage, setCurpage] = useState(1);

  //css
  const classes = useStyles();

  //delete button in each card -> sent a delete form
  function DeleteButton(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const handleDelete = () => {
      setOpen(false);
      axios.delete('/project/'+ props.id).catch((error)=>{});
      axios.post('/project/condition', {sortBy:"ascending"}).then((res) => setProjlist(res.data.projects))
        .catch((error) => {});
      setCurpage(1);
    }
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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

  //add new project button in each card 
  function AddButton(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const addSubmit = (name) => {
      axios.post('/project/create', {"name": name}).then(() => setOpen(false))
        .catch((error)=>{});
      axios.post('/project/condition', {sortBy:"ascending"}).then((res) => setProjlist(res.data.projects))
        .catch((error) => {});
      setCurpage(1);
    };
    return (
      <div>
        <IconButton>
          <AddCircleOutlineIcon size="small" onClick={handleOpen}>
            <AddForm open={open} handleClose={handleClose} submit={addSubmit} />
          </AddCircleOutlineIcon>
        </IconButton>
      </div>
    )
  }

  //adding form
  function AddForm(props) {
    return (
      <Dialog
        onClose={props.handleClose}
        closeAfterTransition
      >
        <DialogContent>
            <h2>Create a new project</h2>
            <Formik
              initialValues={{
                name: ""
              }}
              onSubmit = {(values) => {
                props.submit(values); 
                //props.handleClose();
              }}
            >
              <Form width='100%'>
                <Field as={TextField}
                  label="Project Name"
                  variant="outlined"
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
        </DialogContent>
      </Dialog>
    )
  }

  //render the project list should it be a class instead???
  function Project(props){
    const [status, setStatus] = useState(props.project.status);
    const handleToggle = () => {};
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card style={{display: 'flex', flexDirection: 'column'}}>
          <CardMedia image={img} style={{paddingTop: '56.25%'}} title="Image title"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.project.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={"/project/"+ props.project.user._id}>
              <Button size="small" color="primary">
                Edit
              </Button>
            </Link>
            <DeleteButton id={props.project.user._id}>
              Delete
            </DeleteButton>
            <Switch
              onChange={handleToggle}
              label="Public"
            />
          </CardActions>
        </Card>
      </Grid>
    );
  }

  function updatelist(){
    //slice (inclusive, exclusive)
    const subset = projlist.slice();
    const totalpage = countPage();
    if(curpage == 1){
      subset.slice(1,10);
    }else if(curpage==totalpage){
      subset.slice(curpage*9+1, projlist.length);
    }else{
      subset.slice(curpage*9+1, (curpage+1)*9 +1);
    }
    return subset.map(function (proj,i){
      return <Project project={proj}/>;
    })
  }

  //sorting button: based on projects' status
  function SortByStatus() {
    const handleChange = (event) => {
      axios.post('/project/condition', {status:event.target.value}).then((res) => setProjlist(res.data.projects))
      .catch((error) => {});
      setCurpage(1);
    };
    return (
      <div>
        <InputLabel>Status</InputLabel>
        <FormControl>
          <Select
            disableUnderline
            onChange={handleChange}
          >
            <MenuItem value={""}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={"private"}>Descending</MenuItem>
            <MenuItem value={"public"}>Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  //sorting button: based on projects' updating time
  function SortByUpdate() {
    const handleChange = (event) => {
      axios.post('/project/condition', {"sortBy":event.target.value}).then((res) => setProjlist(res.data.projects))
      .catch((error) => {});
      setCurpage(1);
    };
    return (
      <div>
        <InputLabel>Update Time</InputLabel>
        <FormControl>
          <Select
            disableUnderline
            onChange={handleChange}
          >
            <MenuItem value={'ascending'}>
              <em>Lastest</em>
            </MenuItem>
            <MenuItem value={'descending'}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  //axios to get all the project
  const getAll = () =>{
    //axios.post('/project/condition', {sortBy:"ascending"}).then((res) => setProjlist(res.data.projects))
    //.catch((error) => {});
    axios.get('/project/').then((res) => setProjlist(res.data.projects))
    .catch((error) => {});
  }

  //calculating pagination
  function countPage(){
    const perpage = 9;
    if(projlist % perpage == 0){
      return projlist/perpage;
    }else{
      return projlist/perpage + 1;
    }
  }

  //updating function
  useEffect(()=>{
    {projlist.length===0 ? (getAll()) : (updatelist())}});

  const handlePageClick =  (event, value) => {
    setCurpage(event.target.value);
    updatelist();
  }

  const handleSearch = (event, value) => {
    axios.post('/project/condition', {"name":event.target.value}).then((res) => setProjlist(res.data.projects))
    setCurpage(1);
  }

  return(
    <Fragment>
    <Helmet>
      <title>Microhard &middot; My projects</title>
    </Helmet>

    {/* Hero */}
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

    {/* Main */}
    <Container maxWidth="md">

      {/* Button line */}
      {/* search field */}
      <div>
        <SearchIcon />
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange = {handleSearch}
        />
      </div>
      <SortByStatus/>
      <SortByUpdate/>
      <AddButton/>

      {/* List */}
      <Grid container spacing={4}>
          {projlist.length > 0 ? (this.pList()) : (
          <Typography
            variant="h5"
            align="center"
          >
            Project Length : {projlist.length}
          </Typography>
          )}
      </Grid>

    </Container>

    <Container maxWidth="md">
      <Pagination 
          count = {countPage()}
          page={curpage}
          hidePrevButton
          hideNextButton
          onChange = {handlePageClick}
      />
    </Container>
    
  </Fragment>
  );
}

/*const mapStateToProps = (state) => ({
  ...state,
});

//export default connect(mapStateToProps)(withStyles(styles)(Profile));

//export default (ProjectList); */
