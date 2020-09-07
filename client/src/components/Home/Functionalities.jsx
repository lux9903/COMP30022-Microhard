import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography, Container} from '@material-ui/core';
import styled, {keyframes} from 'styled-components';

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
    root: {
        flexGrow: 1,
        padding: '20px 0px 100px 0px',
    },
    greyText: {
        color: 'grey',
    },
    body: {
        align: 'center',
        color: 'grey',
        lineHeight: '1.3',
        paddingTop: '5px',
    },
    icon: {
        width: 'auto',
        height: '80px',
        marginBottom: '24px',
    },
=======
  root: {
    flexGrow: 1,
    padding: '20px 0px 100px 0px',
  },
  greyText: {
    color: 'grey',
  },
  body: {
    align: 'center',
    color: 'grey',
    lineHeight: '1.3',
    paddingTop: '5px',
  },
  icon: {
    width: 'auto',
    height: '80px',
    marginBottom: '24px',
  },
>>>>>>> master
}));

const float = keyframes`
    from { transform: translate(0,  -6px); }
    65%  { transform: translate(-3px, 6px); }
    to   { transform: translate(0, -6px); }
`;

const Float = styled.div`
  animation: ${float} 4.5s linear infinite;
`;

export default function Functionalities() {
<<<<<<< HEAD
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container fixed>
                <br />
                <br />
                <br />
                <br />
                <Grid container justify="center" alignItems="center" align="center">
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4">How can Microhard help you... </Typography>
                        <br />
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid item xs={10} sm={8}>
                            <Float>
                                <img
                                    src="https://image.flaticon.com/icons/svg/3281/3281289.svg"
                                    alt="skill"
                                    className={classes.icon}
                                />
                            </Float>
                            <Typography variant="h6" align="center">
                                Showcase e-portfolio to employers
                            </Typography>
                            <Typography variant="p" className={classes.body}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Grid>
                        <br />
                        <br />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid item xs={10} sm={8}>
                            <Float>
                                <img
                                    src="https://image.flaticon.com/icons/svg/3050/3050452.svg"
                                    alt="skill"
                                    className={classes.icon}
                                />
                            </Float>
                            <Typography variant="h6" align="center">
                                Monitor your skill-building progress
                            </Typography>
                            <Typography variant="p" className={classes.body}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Grid>
                        <br />
                        <br />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid item xs={10} sm={8}>
                            <Float>
                                <img
                                    src="https://image.flaticon.com/icons/svg/134/134908.svg"
                                    alt="skill"
                                    className={classes.icon}
                                />
                            </Float>
                            <Typography variant="h6" align="center">
                                Comment on other students' projects
                            </Typography>
                            <Typography variant="p" className={classes.body}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Grid>
                        <br />
                        <br />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid item xs={10} sm={8}>
                            <Float>
                                <img
                                    src="https://image.flaticon.com/icons/svg/2345/2345026.svg"
                                    alt="skill"
                                    className={classes.icon}
                                />
                            </Float>
                            <Typography variant="h6" align="center">
                                Layout your projects in a logical way
                            </Typography>
                            <Typography variant="p" className={classes.body}>
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
=======
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container fixed>
        <br />
        <br />
        <br />
        <br />
        <Grid container justify="center" alignItems="center" align="center">
          <Grid item xs={12} sm={12}>
            <Typography variant="h4">How can Microhard help you... </Typography>
            <br />
            <br />
            <br />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={8}>
              <Float>
                <img
                  src="https://image.flaticon.com/icons/svg/3281/3281289.svg"
                  alt="skill"
                  className={classes.icon}
                />
              </Float>
              <Typography variant="h6" align="center">
                Showcase e-portfolio to employers
              </Typography>
              <Typography variant="p" className={classes.body}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={8}>
              <Float>
                <img
                  src="https://image.flaticon.com/icons/svg/3050/3050452.svg"
                  alt="skill"
                  className={classes.icon}
                />
              </Float>
              <Typography variant="h6" align="center">
                Monitor your skill-building progress
              </Typography>
              <Typography variant="p" className={classes.body}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={8}>
              <Float>
                <img
                  src="https://image.flaticon.com/icons/svg/134/134908.svg"
                  alt="skill"
                  className={classes.icon}
                />
              </Float>
              <Typography variant="h6" align="center">
                Comment on other students' projects
              </Typography>
              <Typography variant="p" className={classes.body}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={10} sm={8}>
              <Float>
                <img
                  src="https://image.flaticon.com/icons/svg/2345/2345026.svg"
                  alt="skill"
                  className={classes.icon}
                />
              </Float>
              <Typography variant="h6" align="center">
                Layout your projects in a logical way
              </Typography>
              <Typography variant="p" className={classes.body}>
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
>>>>>>> master
