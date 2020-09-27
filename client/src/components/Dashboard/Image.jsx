import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';

import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import {signOutUser} from '../../actions/userAction';
import EditAvatar from './EditAvatar';


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  button: {
    color: 'grey',
    margin: '0px 20px',
    textTransform: 'none',
  },
  logo: {
    maxHeight: '2.7rem',
    padding: '0px 10px',
    margin: '0px 20px',
  },
  buttonSection: {
    flex: '1',
    textAlign: 'center',
    marginLeft: '-43px',
  },
  appbar: {
    backgroundColor: '#F4F5F7',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
});

class FilesUploadComponent extends Component {
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
    const imgs = axios.get('/avatar').then((res) => {
      if (res.data.files) {
        const imgPic = res.data.files.map((ele) => (
          <Avatar
              alt="Nothing Here"
              src={'/api/image/' + ele.filename}
              className={classes.large}
          />
        ));
        ReactDOM.render(imgPic, document.getElementById('all_img'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography variant="h1" align="center" style={{color: '#fff'}}>
            Images
          </Typography>
        </div>

        <div className={classes.root}>
          <Container>
            <Helmet>
              <title>Microhard &middot; Images </title>
            </Helmet>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={12} md={12}>
                <div style={{padding: '20px'}}>
                  <form onSubmit={this.onFormSubmit}>
                    <Input
                      type="file"
                      name="file"
                      onChange={this.onChange}
                      color="primary"
                    />
                    <Button type="submit" color="primary" variant="contained">
                      Upload
                    </Button>
                  </form>
                </div>
              </Grid>
              <div> Hello </div>
              <br />
              <div>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                      <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                          <div id="all_img" align="center" {...bindTrigger(popupState)} ></div>
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
                          <MenuItem component={Link} to="/">
                            View Profile Picture
                          </MenuItem>
                          <EditAvatar
                              onFormSubmit={this.onFormSubmit}
                              onChange={this.onChange}
                          />
                        </Popover>
                      </div>
                  )}
                </PopupState>
              </div>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FilesUploadComponent);
