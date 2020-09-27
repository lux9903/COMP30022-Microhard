import React, {Component, Fragment} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
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

const useStyles = (theme) => ({
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
});
const toggleChecked = () => {
};

class ProjectList extends Component{
  constructor(props) {
    super(props);
    this.getAllProject = this.getAllProject.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getOneProject = this.getOneProject.bind(this);
    this.deleteOneProject = this.deleteOneProject.bind(this);
  }

	getOneProject(e){
		e.preventDefault();
		const urlGetOne = '/project/' + document.forms.namedItem("testOne")["id"]["value"];
		axios.get(urlGetOne).then((res)=>alert(JSON.stringify(res.data['project'])));
	}

	deleteOneProject(e){
		e.preventDefault();
		const urlDelete = '/project/' + document.forms.namedItem("deleteOne")["id"]["value"];
		axios.delete(urlDelete);
		alert("delete successful");
	}

	getAllProject(e){
		e.preventDefault();
    axios.get('/project/').then((res) => alert(JSON.stringify(res.data['projects'])));
    alert("get all current project");
  }
	componentDidMount(){
	}
	render(){
    const {classes} = this.props;
    const {toggleChecked} = this.props;
    return(
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
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </Link>
              </CardActions>
              <CardActions>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch size="small" checked={false} onChange={toggleChecked} />}
                    label="Public"
                  />
                </FormGroup>
              </CardActions>
            </Card>
          </Grid>
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

export default(withStyles(useStyles)(ProjectList));

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
