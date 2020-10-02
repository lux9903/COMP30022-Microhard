import React, {Component, Fragment, useState} from 'react';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import logo from '../../components/Navigation/logo.png';
import img from './form-background.jpg';
import axios from '../../helpers/axiosConfig';

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
  noDecoration:{
    textDecoration:"none"
  }
}));

function Project(props){
  const classes = useStyles();
  return(
    <Grid item xs={12} sm={6} md={4}>
      <Link to={"/project/"+props.project._id} className={classes.noDecoration} fullWidth>
        <Card className={classes.card}>
          <CardMedia image={img} className={classes.cardMedia} title="Image title"/>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.project.name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
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
      if(proj.show_status === 'public'){
        return <Project project={proj}></Project>
      }
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
        <Grid container spacing={4}>
          {this.pList()}
        </Grid>
      </Container>
    </Fragment>
    );
  }
}

export default (ProjectList);