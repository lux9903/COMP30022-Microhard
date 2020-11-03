import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from '../../helpers/axiosConfig';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactDOM from 'react-dom';
import ViewNav from './ViewNav';

const styles = (theme) => ({
    root: {
        backgroundColor: '#094183',
        paddingBottom: '0px',
        color: '#fff',
    },
    body: {
        width: '100%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '100%',
    },
    formTitle: {
        marginBottom: '1rem',
        textAlign: 'center',
        fontFamily: 'Nunito, sans-serif',
    },
    formWrap: {
        padding: '64px 32px',
    },
    NunitoFont: {
        fontFamily: 'Nunito, sans-serif',
    },
    form: {
        width: '100%',
    },
    form_group: {
        padding: '5px 5px 5px 5px',
    },
})

class MyAccordion extends Component {
    render() {
        return (
          <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                  <Typography variant="h6">{this.props.position}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Grid container direction="column">
                      <Grid Item>
                          <Typography variant="subtitle1">
                              {this.props.start_date &&
                              this.props.start_date.substring(0, 10)}{' '}
                              - {this.props.end_date.substring(0, 10)}
                          </Typography>
                      </Grid>
                      <Grid Item>
                          <Typography variant="subtitle1">{this.props.company}</Typography>
                      </Grid>
                      <Grid Item>
                          <Typography>{this.props.description}</Typography>
                      </Grid>
                  </Grid>
              </AccordionDetails>
              <Divider />
          </Accordion>
        );
    }
}



class ViewExperience extends Component{
    constructor(props) {
        super(props);
        this.state = {
            view_user :"default",
        };
    }

    componentDidMount() {
        const user_id = this.props.match.params.id

        axios.get(`/view/${user_id}`).then((res) => {
            this.setState({view_user:res.data});
        })

        axios.get(`/view/${user_id}/experience`).then((res) => {
            let temp = {};
            let i = 0;
            if (res.data !== undefined) {
                let expComp = res.data.map(item => {
                    if (item.state === 'going'){
                        temp[i] = {};
                        (Object.entries(item).map(([key, value]) => {
                            temp[i][key] = value;
                        }));
                        return (
                            <MyAccordion _id={temp[i]._id} key={temp[i]._id} position={temp[i].position}
                                         description={temp[i].description} start_date={temp[i].start_date}
                                         state={temp[i].state} company={temp[i].company} end_date={temp[i++].end_date}
                            />);
                    }

                });
                ReactDOM.render(expComp, document.getElementById('experience_going'));
            }
            let tem = {};
            let j = 0;
            if (res.data !== undefined) {
                let expComp = res.data.map(item => {
                    if (item.state === 'end'){
                        tem[j] = {};
                        (Object.entries(item).map(([key, value]) => {
                            tem[j][key] = value;
                        }));
                        return (
                            <MyAccordion _id={tem[j]._id} key={tem[j]._id} position={tem[j].position}
                                         description={tem[j].description} start_date={tem[j].start_date}
                                         state={tem[j].state} company={tem[j].company} end_date={tem[j++].end_date}
                            />);
                    }

                });
                ReactDOM.render(expComp, document.getElementById('experience_end'));
            }

        })
    }



    render(){
    const {classes} = this.props;
    return (
      <Fragment>
          <ViewNav view_user={this.state.view_user}/>
          <Helmet>
              <title>Microhard &middot; Experience </title>
          </Helmet>
          <div style={{height: '120px', backgroundColor: '#094183'}}>
              <br />
              <br />
              <Typography
                variant="h1"
                align="center"
                style={{color: '#fff', fontSize: '36px'}}
              >
                  Career Experience
              </Typography>
          </div>
          <br />
          <br />
          <Grid container justify="center" direction="row" spacing="3">
              <Grid item xs={12} sm={9}>
                  <div className={classes.body}>
                      <h3 className={classes.NunitoFont}>Current position</h3>
                      <br />
                      <div id="experience_going"/>
                      <br />
                      <br />
                      <h3 className={classes.NunitoFont}>Past Experience</h3>
                      <div id="experience_end"/>
                  </div>
              </Grid>
          </Grid>
      </Fragment>
    );
}
}


const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewExperience));
