import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import logo from '../Dashboard/profile.png';

import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, Typography} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  profileHeader: {
    height: '280px',
    backgroundColor: '#094183',
    padding: '20px',
  },
  profileImage: {
    width: '225px',
    height: '225px',
    objectFit: 'cover',
    borderRadius: '50%',
  },

  allImages: {
    maxHeight: '300px',
    padding: '20px',
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
        <div className={classes.root}>
          <div className={classes.profileHeader}>
            <Container fixed>
              <Grid
                container
                justify="center"
                direction="row"
                alignItems="center"
              >
                <Grid item md={4}>
                  <img
                    src={logo}
                    alt={'profile img'}
                    className={classes.profileImage}
                  />
                </Grid>
                <Grid item md={8}>
                  <Grid container justify="left" direction="row">
                    <Grid item md={12}>
                      <Typography variant="h4" style={{color: '#fff'}}>
                        {user.username}
                      </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid item md={12}>
                      <Typography variant="h6" style={{color: '#fff'}}>
                        {user.bio}
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
      // <section>
      //     <Helmet>
      //         <title>Microhard &middot; Profile </title>
      //     </Helmet>
      //
      //     <div className='container-fluid'>
      //
      //         <div className='form-wrap'>
      //             <h1 className='h1 form-title'>Welcome to Microhard  </h1>
      //             <h2 className = 'h2 form-title'>This is the account of  {user.username}  </h2>
      //             <h2 className = 'h2 form-title'>Some information about me:  {user.bio}  </h2>
      //             <h2 className = 'h2 form-title'>My email address is: {user.email}  </h2>
      //             <h2 className = 'h2 form-title'>Here is some of my image </h2>
      //         </div>
      //     </div>
      //     <div id="all_img"></div>
      // </section>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
