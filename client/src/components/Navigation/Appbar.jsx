import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, Typography, Link} from '@material-ui/core';
import logo from './logo.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '2.5rem',
    maxWidth: '4rem',
    padding: '5px 10px',
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
});

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{backgroundColor: '#F4F5F7'}}>
        <Toolbar>
          <Button>
            <img
              className={classes.logo}
              src={logo}
              alt={'microhard logo image'}
            />
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
              className={classes.greyText}
              href="#outlined-buttons"
              style={{margin: '0px 20px 0px 10px'}}
            >
              Sign in
            </Button>

            <Button
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
