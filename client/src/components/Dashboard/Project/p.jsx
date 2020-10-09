import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';

import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import {Formik, Field, Form} from 'formik';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from "react-router";
import Paper from '@material-ui/core/Paper';

import General from './General';
import Status from './Status';
import Contributor from './Contributors';
import Process from './Process';

class Project extends Component{
  render(){
    const id= this.props.match.params.id;
    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Project</title>
        </Helmet>

        <div style={{padding: "10px", backgroundColor: '#094183'}}>
          <Container maxWidth="sm" >
              <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
                Hero Content
              </Typography>
          </Container>
        </div>
        <br/>
        <div>
          <Container maxWidth="md">
          <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper>
                  <General id={id}/>
                </Paper>
                <br/>
                <Paper>
                  <Process id={id}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper>
                  <Status id={id}/>
                </Paper>
                <br/>
                <Paper>
                  <Contributor id={id}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
  );}
}

export default withRouter(Project);
