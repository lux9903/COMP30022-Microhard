import React, {Fragment, Component, useState} from 'react';
import {Helmet} from 'react-helmet';
import {withRouter} from "react-router";
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
//import {connect} from 'react-redux';
//import {CircularProgress} from '@material-ui/core';
import axios from '../../../helpers/axiosConfig';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import Divider from '@material-ui/core/Divider';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

import {fetchProject} from '../../../actions/projectAction';

const useStyles = makeStyles((theme) => ({
  item: {
    marginLeft: 8,
  },
  icon: {
    marginRight: 12,
  }
}));

const styles = (theme) => ({
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
  oppositeContent:{
    flex: 0,
  },
  body: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    padding: theme.spacing(6, 0, 6),
  },
  text: {
    marginTop: theme.spacing(1),
  }
});

//this render the process section
function Process(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>{props.proc.processNum}:{" "}{props.proc.description}</ListItemText>
        {!open ? (<ExpandMoreIcon/>) : (<ExpandLessIcon/>)}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
        {props.proc.nodes && props.proc.nodes.length > 0 ? (
            props.proc.nodes.map((node, i)=>{
              return (
                <Fragment>
                  {!node.state ? (
                    <ListItem className={classes.item}>
                      <ListItemText primary={node.description} />
                    </ListItem>
                  ) : (
                    <ListItem disabled className={classes.item}>
                      <ListItemText primary={node.description} />
                      <DoneAllIcon className={classes.icon}/>
                    </ListItem>
                  )}
                </Fragment>
            )})
        ) : (
          <ListItem className={classes.icon}>
            <ListItemText>No task yet</ListItemText>
          </ListItem>
        )}
        </List>
      </Collapse>
      <Divider/>
    </List>
  )
}

class Project_View extends Component{
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      project: [],
    };
  }

  componentDidMount = () =>{
    /*
    let id = null;
    if (this.props.match.params.id !== undefined) {
      id = this.props.match.params.id;
    }
    this.props.dispatch(fetchDocuments(id));*/
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
    const id = this.props.match.params.id;

    /*let content;
    const {error, isFetching, project} = this.props.project;
    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (isFetching) {
      content = (
        <CircularProgress>
          <span>Loading...</span>
        </CircularProgress>
      );
    } else if (!project) {
      content = (
        <Typography> Cannot found the project requested.</Typography>
      );
    } else {
      content = (
        //adding stuff after fixed everything
      );
    } */
    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Project View</title>
        </Helmet>

        {/* {content} */}

        <div className={classes.body}>
          <Container maxWidth="sm" >
              <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
                {this.state.project.name}
              </Typography>
              <br/>
              <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item>
                  <Button variant="contained" href={"/project/"}>
                    Back to List
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" href={"/project/"+id}>
                    Edit Page
                  </Button>
                </Grid>
              </Grid>
          </Container>

          <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={3}>

              {/* this is the left colum  */}
              <Grid item xs={12} md={8}>

                {/* this is the card for description */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Description</Typography>
                    <Divider/>
                    {this.state.project.description && this.state.project.description!=="" ? (
                      <Typography className={classes.text}>{this.state.project.description}</Typography>
                    ) : (
                      <Typography className={classes.text}>No Description Yet</Typography>
                    )}
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for process */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Process</Typography>
                    <Divider/>
                    {this.state.project.process && this.state.project.process.length>0 ? (
                      this.state.project.process.map((proc,i)=>{
                        return <Process proc={proc}/>
                      })) : (
                        <Typography className={classes.text}>No Process Yet</Typography>
                    )}
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for timeline */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Timeline</Typography>
                    <Divider/>
                      {this.state.project.timeline && this.state.project.timeline.length > 0 ? (
                        <Timeline>
                        {this.state.project.timeline.map((each,i)=>{
                          return (
                            <TimelineItem align="left">
                              <TimelineSeparator>
                                <TimelineDot color="primary"/>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineOppositeContent className={classes.oppositeContent}/>
                              <TimelineContent>
                                <Card>
                                  <CardContent>
                                    <Typography>{each.time.slice(0,10)}</Typography>
                                    <Divider/>
                                    <Typography>{each.description}</Typography>
                                  </CardContent>
                                </Card>
                              </TimelineContent>
                            </TimelineItem>
                          )
                        })}
                        </Timeline>
                      ) : (
                        <Typography className={classes.text}>No Timeline Yet</Typography>
                      )}
                  </CardContent>
                </Card>
              </Grid>

              {/* this is the second column*/}
              <Grid item xs={12} md={4}>

                {/* this is the card for project status */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Status</Typography>
                    <Divider/>
                    <Typography className={classes.text}>Progress Status: {this.state.project.status}</Typography>
                    <Typography>Show Status: {this.state.project.show_status}</Typography>
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for rating */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Rating</Typography>
                    <Divider/>
                    <Typography className={classes.text}>{this.state.project.rating}{" "} likes</Typography>
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for contributors */}
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
        </div>
      </Fragment>
  );}
}

//export default withRouter(Project_View);
export default withRouter(withStyles(styles)(Project_View));

/*const mapStateToProps = (state) => ({
  ...state,
});
export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Project))
); */