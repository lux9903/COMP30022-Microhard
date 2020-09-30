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

//when useEffecr trigger? when the useState attribute is being changed


function DeleteButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    axios.get('/project/'+ props.id).catch((error)=>{});
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

//adding form
function MyForm(props) {
  return (
    <Dialog
      onClose={props.handleClose}
      closeAfterTransition
    >
      <DialogContent>
        <div>
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
                //name="name"
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

//add new project button
function AddButton(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addSubmit = (props) => {
    axios.post('/project/create', props.values).then(() => setOpen(false))
      .catch((error)=>{});
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
    // vertical padding + font size from searchIcon
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
  const [search, setSearch] = useState("");
  const [upsort, setUpsort] = useState["ascending"];
  const [statsort, setStatsort] = useState[""];
  const [curpage, setCurpage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  //css
  const classes = useStyles();
  
  //render the project list
  const Projects = (props) => {
    setCurpage(1);
    setTotalPage(countPage());

    //slice (inclusive, exclusive)
    if(curpage==1){
      let subset = projlist.slice(1,10);
    }else if(curpage==totalPage){
      let subset = projlist.slice(curpage*9+1, projlist.length);
    }else{
      let subset = projlist.slice(curpage*9+1, (curpage+1)*9 +1)
    }
    subset.map(function (proj,i){
      return (
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{display: 'flex', flexDirection: 'column'}}>
            <CardMedia image={img} style={{paddingTop: '56.25%'}} title="Image title"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {proj.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/project/"+ proj.user._id}>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </Link>
              <DeleteButton id={proj.user._id}>
                Delete
              </DeleteButton>
            </CardActions>
          </Card>
        </Grid>
      )});
  }

  //sorting button: based on projects' status
  function SortByStatus() {
    const handleChange = (event) => {
      setStatsort(event.target.value);
      //Projects();
    };
    return (
      <div>
        <InputLabel>Status</InputLabel>
        <FormControl>
          <Select
            disableUnderline
            value={statsort}
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
      setUpsort(event.target.value);
      //Project();
    };
    return (
      <div>
        <InputLabel>Update Time</InputLabel>
        <FormControl>
          <Select
            disableUnderline
            value={upsort}
            onChange={handleChange}
          >
            <MenuItem value={"ascending"}>
              <em>Lastest</em>
            </MenuItem>
            <MenuItem value={"descending"}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  //axios to get all the project
  const getAll = () =>{
    if(search == "" && statsort == ""){
      axios.post('/project/condition', {sortBy:upsort}).then((res) => setProjlist(res.data.projects))
      .catch((error) => {});
    }else{
      if(search == ""){
        if(statsort == ""){
          values = {sortBy: upsort}
        }else{
          values = {sortBy: upsort, status: statsort}
        }
      }else{
        if(statsort == ""){
          values = {name: search, sortBy: upsort}
        }else{
          values = {name: search, sortBy: upsort, status: statsort}
        }
      }
      axios.post('/project/condition', values).then((res) => setProjlist(res.data.projects))
      .catch((error) => {});
    }
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
    getAll().then(() => Project(1));
  });

  const handlePageClick =  (event, value) => {
    setCurpage(event.target.value);
    Projects(event.target.value);
  }

  const handleSearch = (event, value) => {
    setSearch(event.target.value);
    //update???
  }

  const handleDelete = () => {

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
          value = {search}
          onChange = {handleSearch}
        />
      </div>
      <SortByStatus/>
      <SortByUpdate/>
      <AddButton/>

      {/* List */}
      <Grid container spacing={4}>
          {this.state.projlist.length > 0 ? (this.pList()) : (
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
          count={totalPage}
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
});*/

//export default connect(mapStateToProps)(withStyles(styles)(Profile));

//export default (ProjectList);
