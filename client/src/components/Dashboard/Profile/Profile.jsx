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
import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {ReactPhotoCollage} from 'react-photo-collage';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import EditAvatar from '../EditAvatar';
import {deepPurple} from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  personal: {
    margin: '32px auto',
    padding: '30px',
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
    width: '140px',
    height: '140px',
  },
  primaryColor: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
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

        <Container maxWidth="md">
          <Grid container component={Paper} className={classes.personal}>
            <Grid item xs={12} sm={12} md={4} style={{textAlign: 'center'}}>
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
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="h1">
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="h4">{user.headline}</Typography>
              <Typography variant="h4">{user.major}</Typography>
            </Grid>
          </Grid>
        </Container>

        {/*<div style={{height: '250px', backgroundColor: '#094183'}} />*/}
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
