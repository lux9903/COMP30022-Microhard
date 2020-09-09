import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import logo from '../Dashboard/profile.png';

import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
import {Container, Grid, Typography} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Gravatar from 'react-gravatar';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  profileHeader: {
    height: '280px',
    backgroundColor: '#094183',
    paddingTop: '45px',
  },
  profileImage: {
    maxHeight: '240px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  profileText: {
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  allImages: {
    maxHeight: '300px',
    padding: '0px 20px',
  },
});

class Profile extends Component {
  componentDidMount() {
    const imgs = axios.get('/image').then((res) => {
      if (res.data.files) {
        const imgPic = res.data.files.map((ele) => <img src={ele} alt={ele} />);
        ReactDOM.render(imgPic, document.getElementById('all_img'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    const {user} = this.props.user;

    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Profile </title>
        </Helmet>
        <div className={classes.root}>
          <div className={classes.profileHeader}>
            <Container fixed>
              <Grid
                container
                justify="center"
                direction="row"
                alignItems="center"
              >
                <Grid item md={3} justify="center">
                  <Gravatar
                    email={user.email}
                    size={170}
                    className={classes.profileImage}
                  />
                </Grid>
                <Grid item md={9}>
                  <Grid container justify="left" direction="row">
                    <Grid item sm={12} md={12}>
                      <Typography variant="h4" className={classes.profileText}>
                        {user.username}
                      </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                      <Typography variant="h6" className={classes.profileText}>
                        {user.bio}
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={12}>
                      <Typography variant="h6" className={classes.profileText}>
                        {user.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Container>
            <br />
            <Typography variant="body1">
              Here are some of my images:{' '}
            </Typography>
            <div id="all_img" className={classes.allImages}></div>
          </Container>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
