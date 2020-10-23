import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';
import {withStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import {connect} from 'react-redux';
//import {CircularProgress} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import General from './General';
import Status from './Status';
import Contributor from './Contributors';
import Process from './Process';
import Timeline from './Timeline';

const styles = (theme) => ({
  heroContent: {
      backgroundColor: '#fff',
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
  body: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    padding: theme.spacing(6, 0, 6),
  }
});

class Project extends Component{
  render(){
    const {classes} = this.props;
    const id = this.props.match.params.id;
    const {user} = this.props.user;
    //alert(user.username);
    /*let content;
    const {error, isFetching, project, isUpdating} = this.props.project;
    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (isFetching) {
      content = (
        <CircularProgress>
          <span>Loading...</span>
        </CircularProgress>
      );
    } else if (isUpdating) {
      content = (
        <CircularProgress>
          <span> Update your change </span>
        </CircularProgress>
      );
    } else if (!project) {
      content = (
        <Typography> Cannot found the project requested.</Typography>
      );
    } else {
      content = (
        <div className={classes.body}>
          <Container maxWidth="sm" >
            <Typography variant="h1" component="h2" align="center" style={{color: '#fff'}} gutterBottom>
              EDITING PAGE
            </Typography>
            <br/>
            <Grid container spacing={4} justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" href={"/project/"}>
                  Back to List
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" href={"/project/view/"+id}>
                  View page
                </Button>
              </Grid>
            </Grid>
          </Container>
          <br/>
          <Container maxWidth="md" className={classes.cardGrid}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <General id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Process id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Timeline id={id}/>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Status id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Contributor id={id}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    }*/
    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Project</title>
        </Helmet>

        {/* {content} */}

        <div className={classes.body}>
          <Container maxWidth="sm" >
            <Typography variant="h1" component="h2" align="center" style={{color: '#fff'}} gutterBottom>
              EDITING PAGE
            </Typography>
            <br/>
            <Grid container spacing={4} justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" href={"/project/"}>
                  Back to List
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" href={"/project/view/"+id}>
                  View page
                </Button>
              </Grid>
            </Grid>
          </Container>
          <br/>
          <Container maxWidth="md" className={classes.cardGrid}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <General id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Process id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Timeline id={id}/>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Status id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Contributor id={id} username={user.username}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
  );}
}

//export default withRouter(Project);
//export default withStyles(styles)(Project);
//export default withRouter(withStyles(styles)(Project));

const mapStateToProps = (state) => ({
  ...state,
});
export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Project))
);
