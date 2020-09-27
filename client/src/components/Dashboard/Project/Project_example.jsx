import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    ListItem:{
        padding: "0px",
    },
    list:{
        maxHeight: 100,
        overflow: 'auto',
    },
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <Fragment>
        <Helmet>
          <title>Microhard &middot; Profile </title>
        </Helmet>


        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    MicroHard
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    IT project that i been currently participate for my bachelor degree.
                </Typography>
            </Container>
        </div>


        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Contributor
                        </Typography>
                        <List className={classes.list} >
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Lyn" secondary="Manager"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Luc" secondary="Designer"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Huy" secondary="Vice"/>
                            </ListItem>
                            <ListItem className={classes.ListItem}>
                                <ListItemText primary="Alice" secondary="Nobody"/>
                            </ListItem>
                        </List>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Status
                        </Typography>
                        <FormControl className={classes.margin}></FormControl>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                //input={<BootstrapInput />}
                            >
                                <MenuItem>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem>In Progress</MenuItem>
                                <MenuItem>Completed</MenuItem>
                                <MenuItem>Cancel</MenuItem>
                            </Select>
                        <Typography>
                            In Progress.
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Link Access
                        </Typography>
                        <Typography>
                            <Link to="/projectex">'http://www.microhard.com'</Link>
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>


        <Container className={classes.cardGrid} maxWidth="md">
            <Typography gutterBottom variant="h5" component="h2">
                Introduction
            </Typography>
            <Typography gutterBottom variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque finibus fermentum. Aliquam viverra pharetra ante, ut iaculis augue tristique nec. Aenean non eros ultrices velit dictum pellentesque. Suspendisse nec odio purus. Integer id velit massa. Pellentesque vel neque nunc. Suspendisse dictum laoreet sollicitudin. Proin ut scelerisque urna. Praesent id tortor dictum, blandit lorem nec, iaculis lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse maximus elit eget condimentum luctus. Quisque a est id risus gravida posuere eu quis neque. Morbi rutrum ipsum ipsum, id scelerisque metus lobortis eget. Nulla aliquet, velit eget imperdiet condimentum, risus turpis aliquet felis, a accumsan sem massa eget felis. Phasellus congue justo id justo venenatis, sit amet tempor mi consectetur. Nullam ut mi ipsum.
                Nam auctor arcu eget fermentum efficitur. Duis elementum, nunc vel condimentum interdum, nisi ligula tincidunt erat, non varius ex felis sit amet sapien. Integer eu mi mattis, consectetur odio at, tincidunt lectus. Sed at eros nec augue mollis accumsan. Mauris vehicula scelerisque tellus, eget lacinia ex finibus quis. Pellentesque elit purus, volutpat nec lacus sed, blandit blandit tellus. Phasellus congue leo laoreet ante lacinia, ac hendrerit ex fringilla. Sed felis ipsum, sollicitudin ut urna et, consequat porta justo. Morbi eleifend risus maximus, consectetur leo id, ullamcorper felis. Praesent arcu leo, ultrices in odio vel, tempor vestibulum leo.
            </Typography>
        </Container>
    </Fragment>
  );
}