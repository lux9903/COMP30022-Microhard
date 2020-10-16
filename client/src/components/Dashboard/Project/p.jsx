import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';

import axios from '../../../helpers/axiosConfig';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Container from '@material-ui/core/Container';

import General from './General';
import Status from './Status';
import Contributor from './Contributors';
import Process from './Process';
import Timeline from './Timeline';

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
                <Card>
                  <CardContent>
                    <General id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Process id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Timeline id={id}/>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Status id={id}/>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Contributor id={id}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
  );}
}

export default withRouter(Project);
