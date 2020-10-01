import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import {Container, Grid, IconButton} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {ReactPhotoCollage} from 'react-photo-collage';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import EditAvatar from '../EditAvatar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SchoolIcon from '@material-ui/icons/School';
import PublicIcon from '@material-ui/icons/Public';
import Grow from '@material-ui/core/Grow';
import PDFPreview from './PDFPreview';
import Gallery from 'react-grid-gallery';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    marginTop: '-20px',
    padding: '25px 0',
  },
  personal: {
    margin: '32px auto',
    padding: '20px',
    '& h1': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    '& h4': {
      paddingBottom: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      '& h1': {
        textAlign: 'center',
        paddingBottom: '10px',
      },
      '& h4': {
        textAlign: 'center',
        paddingBottom: '10px',
      },
    },
  },
  avatar: {
    width: '170px',
    height: '170px',
    backgroundColor: '#F0F0F0',
  },
  primaryColor: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  socialIcon: {
    marginRight: '8px',
  },
  socialIcons: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  secondSection: {
    margin: '32px auto',
    padding: '20px 32px',
    textAlign: 'left',
    color: '#657786',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  locationIcon: {
    position: 'relative',
    top: '7px',
  },
  graduationIcon: {
    position: 'relative',
    top: '7px',
    left: '-2px',
  },
  avatarSection: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  aboutSection: {
    margin: '32px auto',
    padding: '20px 32px',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/avatar/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }

  componentDidMount() {
    const {classes} = this.props;
    const imgs = axios.get('/image').then((res) => {
      if (res.data.files) {
        //const imgPic = res.data.files.map((ele) => src={"/api/image/"+ele.filename} alt={"/image/"+ele.filename} />);
        const photodata = res.data.files.map(getPhoto);
        function getPhoto(elem) {
          return {src: '/api/image/' + elem.filename};
        }

        // const setting = {
        //   width: '500px',
        //   height: ['170px', '170px'],
        //   layout: [1, 4],
        //   photos: photodata,
        //   showNumOfRemainingPhotos: true,
        // };
        let photogrid = (
          <Container>
            <Gallery
              images={photodata}
              enableLightbox={false}
              enableImageSelection={false}
            />
            {/*<Grid*/}
            {/*  container*/}
            {/*  spacing={0}*/}
            {/*  direction="column"*/}
            {/*  alignItems="center"*/}
            {/*  justify="center"*/}
            {/*  style={{minHeight: '70vh'}}*/}
            {/*>*/}
            {/*  <Grid item xs={12} md={12} sm={12}>*/}
            {/*    <ReactPhotoCollage {...setting} />*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
          </Container>
        );
        // ReactDOM.render(photogrid, document.getElementById('all_img'));
        ReactDOM.render(photogrid, document.getElementById('all_img'));
      }
    });
    // Retrieve avatar image
    const img = axios.get('/avatar').then((res) => {
      if (res.data.files) {
        const imgPic = res.data.files.map((ele) => (
          <Avatar
            alt="Nothing Here"
            src={'/api/image/' + ele.filename}
            className={classes.avatar}
          />
        ));
        ReactDOM.render(imgPic, document.getElementById('avatar'));
      } else {
        const defaultAvatar = (
          <Avatar
            className={clsx(classes.primaryColor, classes.avatar)}
            alt="default avatar"
          >
            UK
          </Avatar>
        );
        ReactDOM.render(defaultAvatar, document.getElementById('avatar'));
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
          <Grow in timeout={800}>
            <Container maxWidth="md">
              <Grid
                container
                component={Paper}
                className={classes.personal}
                spacing={(2, 0)}
                elevation={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  className={classes.avatarSection}
                >
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <div id="avatar" {...bindTrigger(popupState)}></div>
                        </IconButton>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <EditAvatar
                            onFormSubmit={this.onFormSubmit}
                            onChange={this.onChange}
                          />
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="h1">
                    {user.firstname} {user.lastname}
                  </Typography>
                  <Typography variant="h4">{user.headline}</Typography>
                  <Typography variant="h4">{user.major}</Typography>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.socialIcons}
                  >
                    <Fab
                      href={'mailto:' + user.email}
                      size="small"
                      color="secondary"
                      aria-label="email"
                      className={classes.socialIcon}
                    >
                      <EmailIcon />
                    </Fab>
                    {user.website && (
                      <Fab
                        color="secondary"
                        size="small"
                        href={user.website}
                        className={classes.socialIcon}
                        target="_blank"
                      >
                        <PublicIcon />
                      </Fab>
                    )}
                    {user.linkedin && (
                      <Fab
                        color="secondary"
                        size="small"
                        href={user.linkedin}
                        className={classes.socialIcon}
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </Fab>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {(user.location || user.graduation) && (
                <Grid
                  container
                  component={Paper}
                  className={classes.secondSection}
                >
                  <Grid item xs={12} sm={12} md={4}>
                    {user.location && (
                      <Typography variant="body1">
                        <LocationOnOutlinedIcon
                          className={classes.locationIcon}
                        />{' '}
                        {user.location}
                      </Typography>
                    )}
                    {user.graduation && (
                      <Typography variant="body1">
                        <SchoolIcon className={classes.graduationIcon} />{' '}
                        {user.graduation}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                component={Paper}
                elevation={3}
                className={classes.aboutSection}
              >
                <Grid item xs={12} sm={11} md={11}>
                  <Typography variant="h2" style={{paddingBottom: '10px'}}>
                    About Me
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{whiteSpace: 'pre-wrap'}}
                >
                  <Typography variant="body1">{user.aboutSection}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                component={Paper}
                elevation={3}
                className={classes.aboutSection}
              >
                <Grid item xs={12} sm={11} md={11}>
                  <PDFPreview />
                </Grid>
              </Grid>
              <Grid
                container
                component={Paper}
                elevation={3}
                className={classes.aboutSection}
              >
                <Grid item xs={12} sm={11} md={11}>
                  <div id="all_img"></div>
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </div>

        {/*<div className={clsx(classes.main, classes.mainRaised)}>*/}
        {/*  <div>*/}
        {/*    <Container fixed>*/}
        {/*      <Grid justify="center" alignItems="center">*/}
        {/*        <Grid item xs={12} sm={12} md={12}>*/}
        {/*          <div className={classes.profile}>*/}
        {/*            <div>*/}
        {/*                <PopupState variant="popover" popupId="demo-popup-popover">*/}
        {/*                  {(popupState) => (*/}
        {/*                      <div>*/}
        {/*                        <IconButton*/}
        {/*                            aria-label="account of current user"*/}
        {/*                            aria-controls="menu-appbar"*/}
        {/*                            aria-haspopup="true"*/}
        {/*                            color="inherit"*/}
        {/*                        >*/}
        {/*                          <div id="avatar" align="center" {...bindTrigger(popupState)} ></div>*/}
        {/*                        </IconButton>*/}
        {/*                        <Popover*/}
        {/*                            {...bindPopover(popupState)}*/}
        {/*                            anchorOrigin={{*/}
        {/*                              vertical: 'bottom',*/}
        {/*                              horizontal: 'center',*/}
        {/*                            }}*/}
        {/*                            transformOrigin={{*/}
        {/*                              vertical: 'top',*/}
        {/*                              horizontal: 'center',*/}
        {/*                            }}*/}
        {/*                        >*/}
        {/*                          <EditAvatar*/}
        {/*                              onFormSubmit={this.onFormSubmit}*/}
        {/*                              onChange={this.onChange}*/}
        {/*                          />*/}
        {/*                        </Popover>*/}
        {/*                      </div>*/}
        {/*                  )}*/}
        {/*                </PopupState>*/}
        {/*            </div>*/}
        {/*            <div style={{marginTop: '-60px'}}>*/}
        {/*              <Typography variant="h3" className={classes.fullName}>*/}
        {/*                {user.firstname} {user.lastname}*/}
        {/*              </Typography>*/}
        {/*              <Typography variant="h6" className={classes.headline}>*/}
        {/*                {user.headline}*/}
        {/*              </Typography>*/}
        {/*              <Typography variant="h6" className={classes.major}>*/}
        {/*                {user.major}*/}
        {/*              </Typography>*/}
        {/*              <br />*/}
        {/*              <Typography variant="h6" className={classes.graduation}>*/}
        {/*                Graduation: June 2020*/}
        {/*              </Typography>*/}
        {/*              <Link to="/image">*/}
        {/*                <IconButton aria-label="upload" color="secondary">*/}
        {/*                  <AttachFileIcon />*/}
        {/*                </IconButton>*/}
        {/*              </Link>*/}
        {/*              <Link to="/editprofile">*/}
        {/*                <IconButton aria-label="edit" color="secondary">*/}
        {/*                  <EditIcon />*/}
        {/*                </IconButton>*/}
        {/*              </Link>*/}
        {/*              <IconButton href={'mailto:' + user.email}>*/}
        {/*                <EmailIcon />*/}
        {/*              </IconButton>*/}
        {/*              <IconButton href="https://www.linkedin.com/">*/}
        {/*                <LinkedInIcon />*/}
        {/*              </IconButton>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Container>*/}

        {/*    <div className={classes.aboutMe}>*/}
        {/*      <p>*/}
        {/*        <hr />*/}
        {/*        {user.aboutSection}*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <Container>*/}
        {/*      <Grid justify="center">*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={12}*/}
        {/*          sm={12}*/}
        {/*          md={12}*/}
        {/*          className={classes.imageCollage}*/}
        {/*        >*/}
        {/*          <div id="all_img"></div>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*      <br />*/}
        {/*    </Container>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
