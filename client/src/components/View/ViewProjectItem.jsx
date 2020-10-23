import React, {Fragment, Component, useState} from 'react';
import {Helmet} from 'react-helmet';

import axios from '../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
import { withRouter } from "react-router";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Collapse from '@material-ui/core/Collapse';
import { IconButton } from '@material-ui/core';
import ViewNav from './ViewNav';


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
  oppositeContent:{
    flex: 0,
  },
  list:{
    maxHeight: 100,
    overflow: 'auto',
  },
  body: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    padding: theme.spacing(6, 0, 6),
  },
  liketext: {
    marginTop: theme.spacing(1),
  }
});

//this render the process section
function Process(props) {
  const [open, setOpen] = useState(false);
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
        {props.proc.nodes && props.proc.nodes.length > 0 ? (
          props.proc.nodes.map((node, i)=>{
            return (
              <List>
                {!node.state ? (
                  <ListItem>
                    <ListItemText primary={node.description} />
                  </ListItem>
                ) : (
                  <ListItem disabled>
                    <ListItemText primary={node.description} />
                    <DoneAllIcon/>
                  </ListItem>
                )}
              </List>
            )})) : (
          <List>
            <ListItem>
              <ListItemText>No task yet</ListItemText>
            </ListItem>
          </List>
        )}
      </Collapse>
    </List>
  )
}

class Project_View extends Component{
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      project: [],
      view_user :"default",
    };
  }

  componentDidMount = () =>{
    console.log(this.props);
    const user_id = this.props.match.params.id

    const view_user = axios.get(`/view/${user_id}`).then((res) => {
      this.setState({view_user:res.data});
    })

    axios.get(`/view/${user_id}/project/`+this.props.match.params.project_id).then((res) => {
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

  handleLikeClick = () => {
    //if(liked) {
      //do post request to unliked the project => number people like reduce by one
      //set liked = false
    //}else{
      //do post request to like the project => number people like increase by one
      //set liked = true
    //}
  }

  render(){
    const {classes} = this.props;
    console.log(this.state);
    return (
      <Fragment>
        <ViewNav view_user={this.state.view_user}/>
        <Helmet>
          <title>Microhard &middot; Project View</title>
        </Helmet>

        <div className={classes.body}>

          <Container maxWidth="sm" >
            <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
              {this.state.project.name}
            </Typography>
            <br/>
            <Grid container spacing={4} justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" href={`/view/${this.state.view_user._id}/project/`}>
                  Back to List
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
                      <Typography>{this.state.project.description}</Typography>
                    ) : (
                      <Typography>No Description Yet</Typography>
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
                      <Typography>No Process Yet</Typography>
                    )}
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for timeline */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Timeline</Typography>
                    <Divider/>
                    <Timeline>
                      {this.state.project.timeline && this.state.project.timeline.length > 0 ? (
                        this.state.project.timeline.map((each,i)=>{
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
                        })
                      ) : (
                        <Typography>No Timeline Yet</Typography>
                      )}
                    </Timeline>
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
                    <Typography>Progress Status: {this.state.project.status}</Typography>
                    <Typography>Show Status: {this.state.project.show_status}</Typography>
                  </CardContent>
                </Card>
                <br/>

                {/* this is the card for rating */}
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">Rating</Typography>
                    <Divider/>
                    <Grid container direction="row">
                      <Typography className={classes.liketext}>{this.state.project.rating}{" "} likes</Typography>
                      {/* to create a like button, you need to have a boolean that indicate whenther the user has like project before  */}
                      {/* lets say that bolean called "liked" which liked=false if user not like the project before */}
                      {/* then have a handler called "handleLikeClick" which just do post request to db and increase rating */}
                      {/* i have empty handleLikeClick function above so just filled it out */}

                      {/*( !liked ? (   */}
                      {/*  <IconButton onClick={handleLikeClick}> */}
                      {/*    <FavoriteBorderIcon fontSize="small"/> */}
                      {/*  </IconButton> */}
                      {/*) : ( */}
                      {/*  <IconButton> */}
                      {/*    <FavoriteIcon fontSize="small"/> */}
                      {/*  </IconButton> */}
                      {/*))   */}
                    </Grid>
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
