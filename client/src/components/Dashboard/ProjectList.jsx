import React, {Component, Fragment} from 'react';
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
import logo from '../../components/Navigation/logo.png';
import img from './form-background.jpg';
import axios from '../../helpers/axiosConfig';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AddProject from './AddProject';

const toggleChecked = () => {
};


const Project = props => (
  <Grid item xs={12} sm={6} md={4}>
    <Card style={{display: 'flex', flexDirection: 'column'}}>
      <CardMedia image={img} style={{paddingTop: '56.25%'}} title="Image title"/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.project.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/project/"+props.project.user._id}>
          <Button size="small" color="primary">
            Edit
          </Button>
        </Link>
        <Link to={"/project/"+ props.project.user._id}>
          <Button size="small" color="primary">
            Delete
          </Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>
)
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

  pList(props) {
    return this.state.projlist.map(function(proj, i){
      return <Project project={proj}></Project>
    });
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
        <AddProject
                onFormSubmit={this.onFormSubmit}
                onChange={this.onChange}
        />
        <Grid container spacing={4}>
            {this.state.projlist.length > 0 ? (this.pList()) : (
            <Typography
              variant="h5"
              align="center"
            >
              Project Length : {this.state.projlist.length}
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

/*export default function Album() {
  const classes = useStyles();

  return (
    <Fragment>
      <Helmet>
        <title>Microhard &middot; My projects </title>
      </Helmet>

      <div className={classes.heroContent}>
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
            This is a place for me to showcase my current project.
          </Typography>
        </Container>
      </div>
      <div>
      <h1> Test</h1>


        <form action="/api/project/create" method ="post">
          <input type = "text" name = "name"/>
          <input type = "text" name = "description"/>
          <select name = "status">
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
            <option value="Cancel">Cancel</option>
          </select>
          <select name = "show_status">
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
          <input type = "submit" value = "hahaha"/>
        </form>
        <button onClick = {() => axios.get('/project/').then((res) => alert(JSON.stringify(res.data['projects'])))}>
        click me
        </button>
      <h1>End Test </h1>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}*/

/*
      <h1> YOOO</h1>
        <form action="/api/project/create" method ="post">
          <input type = "text" name = "name"/>
          <input type = "text" name = "description"/>
          <select name = "status">
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
            <option value="Cancel">Cancel</option>
          </select>
          <select name = "show_status">
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
          <input type = "submit" value = "hahaha"/>
        </form>
        <button onClick = {() => axios.get('/project/').then((res) => alert(JSON.stringify(res.data['projects'])))}>
        click me
        </button>
      <h1>End Test </h1>


      <CardActions>
     <FormGroup>
        <FormControlLabel
          control={<Switch size="small" checked={false} onChange={toggleChecked} />}
          label="Public"
        />
      </FormGroup>


      componentDidUpdate(){
    axios.get('/project/').then((res) => {
      this.setState({projlist: res.data});
    })
    .catch((error) => {});
  }
*/
