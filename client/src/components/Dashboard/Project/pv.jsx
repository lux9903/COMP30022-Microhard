import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';

import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import {Formik, Field, Form} from 'formik';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from "react-router";

const styles = (theme) => ({
  icon: {
      marginRight: theme.spacing(2),
  },
  heroContent: {
      backgroundColor: '#094183',
      padding: theme.spacing(6, 0, 6),
  },
  cardGrid: {
      paddingTop: theme.spacing(4),
  },
  card: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
  },
  cardContent: {
      flexGrow: 0,
  },
  input: {
      color: "white",
      fontSize:50,
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

class Project_View extends Component{
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      project: [],
    };
  }

  componentDidMount = () =>{
    axios.get('/project/'+this.props.match.params.id).then((res) => {
      this.setState({
          project: res.data.project,
          open:false,
      });
    })
    .catch((error) => {});
  }

  handleClickOpen = () =>{
    this.setState({open: true})
  }
  handleClickClose = () =>{
    this.setState({open: true})
  }
  render(){
    const {classes} = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Project View</title>
        </Helmet>

        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
              <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
                {this.state.project.name}
              </Typography>
              <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" href={"/project/"}>
                    Back to List
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">
                    Edit Page
                  </Button>
                </Grid>
              </Grid>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">Description</Typography>
                  <Divider/>
                  <br/>
                  <Typography>{this.state.project.description}</Typography>
                </CardContent>
              </Card>
              <br/>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">Process</Typography>
                  <Divider/>
                  <br/>
                </CardContent>
              </Card>
              <br/>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">Timeline</Typography>
                  <Divider/>
                  <br/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">Status</Typography>
                  <Divider/>
                  <Typography>Progress Status: {this.state.project.status}</Typography>
                  <Typography>Show Status: {this.state.project.show_status}</Typography>
                </CardContent>
              </Card>
              <br/>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">Contributor</Typography>
                  <Divider/>
                  <List>
                    {this.state.project.contributors && this.state.project.contributors.map((con, i)=>{
                      return <ListItemText>{con}</ListItemText>
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
  );}
}

//export default withRouter(Project_View);
export default withRouter(withStyles(styles)(Project_View));

/*
{this.state.project.process && this.state.project.process.map((proc,i)=>{
                    <List>
                      <ListItem>
                        <ListItemText>{proc.description}</ListItemText>
                        {open ? <ExpandMore onClick={this.handleClickOpen}/> : <ExpandLess onClick={this.handleClickClose}/>}
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          {proc.nodes && proc.nodes.map((node, i)=>{
                            <List component="div" disablePadding>
                              <ListItem button>
                                <ListItemText primary={node.description} />
                              </ListItem>
                            </List>
                          })}
                        </Collapse>
                      </ListItem>
                    </List>
                  })}
*/