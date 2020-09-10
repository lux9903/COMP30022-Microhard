import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button} from '@material-ui/core';
import logo from './logo.png';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '2.7rem',
    padding: '0px 10px',
  },
  navItem: {
    marginLeft: 'auto',
    marginRight: '40px',
    padding: '0px 10px',
    fontWeight: '600',
  },
  greyText: {
    color: 'grey',
  },
  appbar: {
    backgroundColor: '#F4F5F7',
  },
});

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Button>
            <img className={classes.logo} src={logo} alt={'logo'} />
          </Button>

          <div className={classes.navItem}>
            <Button
              className={classes.greyText}
              href="#outlined-buttons"
              style={{margin: '0px 10px'}}
            >
              About Us
            </Button>

            <Button
              className={classes.greyText}
              href="#outlined-buttons"
              style={{margin: '0px 10px'}}
            >
              Projects
            </Button>

            <Button
              component={Link}
              to="/sign-in"
              className={classes.greyText}
              href="#outlined-buttons"
              style={{margin: '0px 20px 0px 10px'}}
            >
              Sign in
            </Button>

            <Button
              component={Link}
              to="/sign-up"
              variant="outlined"
              color={'primary'}
              href="#outlined-buttons"
            >
              Join now
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
