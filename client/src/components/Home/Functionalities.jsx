import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px 0px 100px 0px',
  },
  greyText: {
    color: 'grey',
  },
}));

export default function Functionalities() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container fixed>
        <br />
        <br />
        <br />
        <br />
        <Grid container justify="center" alignItems="center" align="center">
          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={7}>
              <Typography variant="h6" align="center">
                Functionality 1
              </Typography>
              <Typography
                variant="p"
                align="center"
                className={classes.greyText}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={7}>
              <Typography variant="h6" align="center">
                Functionality 2
              </Typography>
              <Typography
                variant="p"
                align="center"
                className={classes.greyText}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={7}>
              <Typography variant="h6" align="center">
                Functionality 3
              </Typography>
              <Typography
                variant="p"
                align="center"
                className={classes.greyText}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={7}>
              <Typography variant="h6" align="center">
                Functionality 4
              </Typography>
              <Typography
                variant="p"
                align="center"
                className={classes.greyText}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
