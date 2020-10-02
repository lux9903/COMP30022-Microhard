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
import Typography from '@material-ui/core/Typography';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from '@material-ui/lab/Alert';
import ShareIcon from '@material-ui/icons/Share';
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
import ImageGrid from '../ImageGrid';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    marginTop: '-15px',
    padding: '25px 0 150px 0',
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
      copied: false,
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
          <Container maxWidth="md">
            <Grow in timeout={900}>
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
                      <CopyToClipboard text={`http://localhost:3000/view/${user._id}`}
                                       onCopy={() => this.setState({copied: true})}>
                        <IconButton>
                          <ShareIcon />
                        </IconButton>
                      </CopyToClipboard>
                      {this.state.copied ? <Alert severity="success">Share link has copied to the clipboard</Alert> : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grow>
            <Grow in timeout={1100}>
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
            </Grow>
            <Grow in timeout={1300}>
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
            </Grow>
            <Grow in timeout={1500}>
              <Grid
                container
                component={Paper}
                elevation={3}
                className={classes.aboutSection}
              >
                <Grid item xs={12} sm={11} md={12}>
                  <Typography variant="h2">Photos</Typography>
                </Grid>
                <Grid item xs={12} sm={11} md={11}>
                  <ImageGrid />
                </Grid>
              </Grid>
            </Grow>
            <Grow in timeout={1700}>
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
            </Grow>
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
