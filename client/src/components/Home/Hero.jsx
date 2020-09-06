import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Button, Container, Typography} from '@material-ui/core';
import heroImage from './heroImage.png';
import Appbar from '../Navigation/Appbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    paddingBottom: '100px',
  },
  body: {
    color: '#595e53',
    textAlign: 'center',
  },
  image: {
    maxWidth: '530px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '420px',
    },
  },
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Appbar />
      <Container fixed>
        <Grid container justify="center" direction="row" alignItems="center">
          <Grid item xs={12} md={6}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Typography>
                <br />
                <br />
                <br />
              </Typography>
              <Grid item xs={8}>
                <Typography variant="h3" align="center">
                  Discover University of Melbourne's top talents
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography className={classes.body} variant="h5">
                  <br />
                  Microhard makes it easier for students to showcase their
                  collection of projects and reflections over the course of
                  their career path.
                  <br />
                  <br />
                </Typography>
                <Grid container direction="row" justify="center" spacing={3}>
                  <Grid item xs={6}>
                    <Grid container justify="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        size="large"
                        fullWidth
                      >
                        Get started
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid container justify="center">
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h1">
              <br />
            </Typography>
            <Grid container justify="center" alignItems="flex-end">
              <img src={heroImage} className={classes.image} alt="heroImg" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
