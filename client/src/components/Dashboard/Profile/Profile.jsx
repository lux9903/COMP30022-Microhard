import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import {Container, Grid, IconButton} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Gravatar from 'react-gravatar';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {ReactPhotoCollage} from 'react-photo-collage';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  profileHeader: {
    height: '280px',
    backgroundColor: '#094183',
    paddingTop: '45px',
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
  main: {
    background: '#fff',
    position: 'relative',
    zIndex: '4',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  title: {
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    margin: '1.75rem 0 0 0.875rem',
  },
  profile: {
    textAlign: 'center',
    '& img': {
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
      objectFit: 'cover',
      borderRadius: '50% !important',
      height: '180px',
      width: '180px',
    },
  },
  fullName: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: '700',
  },
  major: {
    marginTop: '5px',
    fontFamily: 'Lato, sans-serif',
    fontWeight: '300',
  },
  aboutMe: {
    margin: '1.071rem auto 1.071rem',
    fontFamily: 'Nunito',
    maxWidth: '800px',
    color: '#555',
    textAlign: 'center !important',
  },
  imageCollage: {
    margin: '0px auto 30px auto',
    textAlign: 'center',
  },
  graduation: {
    marginBottom: '10px',
    fontFamily: 'Lato, sans-serif',
    fontWeight: '300',
  },
  bio: {
    marginTop: '20px',
    fontFamily: 'Lato, sans-serif',
    fontWeight: '300',
  },
});

class Profile extends Component {
  componentDidMount() {
    const imgs = axios.get('/image').then((res) => {
      if (res.data.files) {
        //const imgPic = res.data.files.map((ele) => src={"/api/image/"+ele.filename} alt={"/image/"+ele.filename} />);
        const photodata = res.data.files.map(getPhoto);
        function getPhoto(elem) {
          return {src: '/api/image/' + elem.filename};
        }

        const setting = {
          width: '500px',
          height: ['170px', '170px'],
          layout: [1, 4],
          photos: photodata,
          showNumOfRemainingPhotos: true,
        };
        let photogrid = (
          <Container>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{minHeight: '70vh'}}
            >
              <Grid item xs={12} md={12} sm={12}>
                <ReactPhotoCollage {...setting} />
              </Grid>
            </Grid>
          </Container>
        );
        ReactDOM.render(photogrid, document.getElementById('all_img'));
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

        <div style={{height: '250px', backgroundColor: '#094183'}} />

        <div className={clsx(classes.main, classes.mainRaised)}>
          <div>
            <Container fixed>
              <Grid justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.profile}>
                    <div>
                      <Gravatar email={user.email} size={'2048px'} />
                    </div>
                    <div style={{marginTop: '-60px'}}>
                      <Typography variant="h3" className={classes.fullName}>
                        {user.firstname} {user.lastname}
                      </Typography>
                      <Typography variant="h6" className={classes.bio}>
                        {user.bio}
                      </Typography>
                      <Typography variant="h6" className={classes.major}>
                        {user.major}
                      </Typography>
                      <br />
                      <Typography variant="h6" className={classes.graduation}>
                        Graduation: June 2020
                      </Typography>
                      <Link to="/image">
                        <IconButton aria-label="upload" color="secondary">
                          <AttachFileIcon />
                        </IconButton>
                      </Link>
                      <Link to="/">
                        <IconButton aria-label="edit" color="secondary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton href={'mailto:' + user.email}>
                        <EmailIcon />
                      </IconButton>
                      <IconButton href="https://www.linkedin.com/">
                        <LinkedInIcon />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>

            <div className={classes.aboutMe}>
              <p>
                <hr />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames. Diam quis enim lobortis scelerisque fermentum
                dui faucibus in ornare. Varius morbi enim nunc faucibus a
                pellentesque sit amet. Aenean sed adipiscing diam donec
                adipiscing tristique risus.
              </p>
            </div>
            <Container>
              <Grid justify="center">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.imageCollage}
                >
                  <div id="all_img"></div>
                </Grid>
              </Grid>
              <br />
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
