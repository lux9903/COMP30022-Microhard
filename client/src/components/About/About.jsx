import React from 'react';
import Appbar from '../Navigation/Appbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import aboutImg from '../About/about.png';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {CardContent} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    minHeight: '105vh',
  },
  grid: {
    paddingTop: '150px',
  },
  image: {
    maxWidth: '400px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '50px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '310px',
    },
  },
  paper: {
    borderRadius: '5%',
    padding: '15px',
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Appbar />
      <div className={classes.root}>
        <Container maxWidth="md">
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={12} sm={12} md={6}>
              <Grow in timeout={1000}>
                <img src={aboutImg} className={classes.image} alt="about img" />
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grow in timeout={1000}>
                <div>
                  <Paper className={classes.paper}>
                    <CardHeader
                      title={
                        <Typography variant="h2" align="center">
                          About us and our mission
                        </Typography>
                      }
                    />
                    <Divider variant="middle" />
                    <CardContent>
                      <br />
                      <Typography variant="h4">
                        To help UniMelb students showcase their work in a clean,
                        concise and job-winning manner.
                        <br />
                        <br />
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores blanditiis commodi deserunt earum
                        eligendi facere fuga id magnam maxime minima, possimus
                        quam quidem quo quod quos ratione repellendus tenetur
                        ullam.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Molestias, mollitia quod. A iure perspiciatis,
                        possimus sed vitae voluptates? Accusamus aliquid beatae
                        impedit laboriosam placeat porro quae, qui ut! Deleniti,
                        doloremque?
                      </Typography>
                    </CardContent>
                  </Paper>
                </div>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
