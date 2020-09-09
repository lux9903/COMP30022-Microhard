import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/userAction';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import logo from '../../components/Navigation/logo.png';
import Gravatar from 'react-gravatar';
import App from '../App';
import {AppBar, Toolbar, Button} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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

    const open = Boolean(this.state.anchorEl);

    const handleMenu = (event) => {
      this.setState({ anchorEl: event.currentTarget})
    };

    const handleClose = () => {
      this.setState({ anchorEl: null})
    };

    const signOut = (e) => {
      e.preventDefault();
      this.props.dispatch(signOutUser());
    };
/*
    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
      <a
        className="dropdown-toggle nav-link"
        href="/"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    ));

    if (user == null) {
      content = (
        <Fragment>
          <li className="nav-item">
            <Link to="/sign-up" className="btn btn-primary">
              Sign up
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/sign-in" className="btn btn-outline-primary">
              Sign in
            </Link>
          </li>
        </Fragment>
      );
    } else {
      content = (
        <Fragment>
          <Dropdown alignRight>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <Gravatar email={user.email} size={32} className="nav-avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/account" className="dropdown-item">
                Account
              </Link>
              <a href="/" onClick={signOut} className="dropdown-item">
                Sign out
              </a>
            </Dropdown.Menu>
          </Dropdown>
        </Fragment>
      );
    }
*/
    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Link to="/">
            <Button>
              <img src={logo} alt="Microhard" className={classes.logo} />
            </Button>
          </Link>
          <div className={classes.buttonSection}>
            <Link exact={true} to="/">
              <Button className={classes.button}>Profile</Button>
            </Link>
            <Link to="/plan">
              <Button className={classes.button}>Training Plan</Button>
            </Link>
            <Link to="/image">
              <Button className={classes.button}>Upload Image</Button>
            </Link>
          </div>
          <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                      <Gravatar email={user.email} size={32} className="nav-avatar" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}

                        open={open}
                        onClose={handleClose}
                    >
                      <MenuItem component={Link} to="/account">Account</MenuItem>
                      <MenuItem href="/" onClick={signOut}>Sign out</MenuItem>
                    </Menu>
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
