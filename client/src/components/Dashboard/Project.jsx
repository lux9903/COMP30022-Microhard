import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import logo from '../../components/Navigation/logo.png';
import img from './form-background.jpg';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: '#094183',
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <Fragment>
      <Helmet>
        <title>Microhard &middot; My projects </title>
      </Helmet>

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <br />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            style={{color: '#fff'}}
            gutterBottom
          >
            Project Lists
          </Typography>
          <Typography
            variant="h5"
            align="center"
            style={{color: '#fff'}}
            paragraph
          >
            This is a place for me to showcase my current project.
          </Typography>
        </Container>
      </div>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={img}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Microhard
                </Typography>
                <Typography>
                  IT project that i have been currently doing in my final year
                  of bachelor.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Link to="/projectex" className={classes.noDecoration}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
