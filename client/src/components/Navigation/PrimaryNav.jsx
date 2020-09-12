import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/userAction';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../components/Navigation/logo.png';
import Gravatar from 'react-gravatar';
import App from '../App';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  Popover,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';

const styles = (theme) => ({
  button: {
    color: 'grey',
    margin: '0px 20px',
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

// This is the navigation bar after a successful login
class PrimaryNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  render() {
    const {classes} = this.props;
    const {user} = this.props.user;
    let content;

    const signOut = (e) => {
      e.preventDefault();
      this.props.dispatch(signOutUser());
    };

    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Link to="/">
            <Button>
              <img src={logo} alt="Microhard" className={classes.logo} />
            </Button>
          </Link>
          <div className={classes.buttonSection}>
            <Link exact={true} to="/" className={classes.noDecoration}>
              <Button className={classes.button}>Profile</Button>
            </Link>
            <Link to="/plan" className={classes.noDecoration}>
              <Button className={classes.button}>Training Plan</Button>
            </Link>
            <Link to="/course" className={classes.noDecoration}>
              <Button className={classes.button}>Course</Button>
            </Link>
            <Link to="/experiences" className={classes.noDecoration}>
              <Button className={classes.button}>Experiences</Button>
            </Link>
            <Link to="/project" className={classes.noDecoration}>
              <Button className={classes.button}>My projects</Button>
            </Link>
            <Link to="/image" className={classes.noDecoration}>
              <Button className={classes.button}>Upload image</Button>
            </Link>
          </div>

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
                    <Gravatar
                      email={user.email}
                      size={32}
                      className="nav-avatar"
                      {...bindTrigger(popupState)}
                    />
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
                    <MenuItem component={Link} to="/account">
                      Account
                    </MenuItem>
                    <MenuItem href="/" onClick={signOut}>
                      Sign out
                    </MenuItem>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
          {content}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(PrimaryNav));
