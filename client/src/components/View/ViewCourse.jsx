import React, {Component, Fragment} from 'react';
import axios from '../../helpers/axiosConfig';
import {Helmet} from 'react-helmet';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Grid, TableContainer, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ViewNav from './ViewNav';

const useStyles = (theme) => ({
    root: {
        backgroundColor: '#094183',
        paddingBottom: '0px',
        color: '#fff',
    },
    formTitle: {
        marginBottom: '1rem',
        textAlign: 'center',
        fontFamily: 'Nunito, sans-serif',
    },
    formWrap: {
        padding: '64px 32px',
    },
});
function MyGrid(props) {
    let keys = Object.keys(props.courses);
    let i = 0;
    let color;

    let gridByYear = keys.map((key) => {
        let summer = [],
          winter = [],
          sem1 = [],
          sem2 = [];
        {
            props.courses[key].map((value) => {
                switch (value.sem) {
                    case 'Sem1':
                        sem1.push(value.code + '\n');
                        break;
                    case 'Sem2':
                        sem2.push(value.code + '\n');
                        break;
                    case 'Winter':
                        winter.push(value.code + '\n');
                        break;
                    case 'Summer':
                        summer.push(value.code + '\n');
                        break;
                }
            });
        }
        if (i == 0) {
            color = '#88B9EB';
            i = 1;
        } else {
            color = '#ffff';
            i = 0;
        }
        return (
          <div>
              <Grid
                container
                style={{backgroundColor: color}}
                spacing={2}
                justify="space-evenly"
                alignItems="center"
              >
                  <Grid item sm={1}>
                      <Typography
                        align="right"
                        style={{fontFamily: 'sans-serif', fontSize: 22}}
                      >
                          {key}
                      </Typography>
                      <br />
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item sm={2}>
                      <Typography align="center" variant="h5">
                          {summer}
                      </Typography>
                      <br />
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item sm={2}>
                      <Typography align="center" variant="h5">
                          {sem1}
                      </Typography>
                      <br />
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item sm={2}>
                      <Typography align="center" variant="h5">
                          {winter}
                      </Typography>
                      <br />
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item sm={2}>
                      <Typography align="center" variant="h5">
                          {sem2}
                      </Typography>
                      <br />
                  </Grid>
              </Grid>
          </div>
        );
    });

    return (
      <div>
          <br />
          <br />
          <Grid container spacing={2} justify="space-evenly">
              <Grid item sm={1}>
                  <br />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sm={2}>
                  <Typography
                    align="center"
                    style={{fontFamily: 'sans-serif', fontSize: 22}}
                  >
                      Summer
                  </Typography>
                  <br />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sm={2}>
                  <Typography
                    align="center"
                    style={{fontFamily: 'sans-serif', fontSize: 22}}
                  >
                      Semester 1
                  </Typography>
                  <br />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sm={2}>
                  <Typography
                    align="center"
                    style={{fontFamily: 'sans-serif', fontSize: 22}}
                  >
                      Winter
                  </Typography>
                  <br />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sm={2}>
                  <Typography
                    align="center"
                    style={{fontFamily: 'sans-serif', fontSize: 22}}
                  >
                      Semester 2
                  </Typography>
                  <br />
              </Grid>
          </Grid>
          {gridByYear}
          <br />
      </div>
    );
}


class MyAccordion extends Component {
    render() {
        return (
          <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                  <Typography variant="h6">{this.props.code}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Grid container direction="column">
                      <Grid Item>
                          <Typography variant="subtitle1">{this.props.name}</Typography>
                      </Grid>
                      <Grid Item>
                          <Typography variant="subtitle1">
                              {this.props.description}
                          </Typography>
                      </Grid>
                      <Grid Item>
                          <Typography>{this.props.link}</Typography>
                      </Grid>
                  </Grid>
              </AccordionDetails>
              <Divider />
          </Accordion>
        );
    }
}


function GetAccords(props) {
    let accords = props.courses.map((elem) => {
        return (
          <div>
              <MyAccordion
                code={elem.code}
                name={elem.name}
                description={elem.description}
                link={elem.link}
              />
          </div>
        );
    });

    return <div>{accords}</div>;
}


function GetList(props) {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="my-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Code</TableCell>
                            <TableCell align='center'>Subject Level</TableCell>
                            <TableCell align='center'>Year Taken</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Grade</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.courses.map(row => (
                            <TableRow key={row.name}>
                                <TableCell align='center'>{row.code}</TableCell>
                                <TableCell align='center'>{row.score}</TableCell>
                                <TableCell align='center'>{row.year}</TableCell>
                                <TableCell align='center'>{row.state}</TableCell>
                                <TableCell align='center'>{row.grades}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

class ViewCourse extends Component {
    constructor(props) {
        super(props);
        this.getAllCourse = this.getAllCourse.bind(this);
        this.state = {courses: undefined, tabIndex: 0, open: null, courses2: undefined,view_user :"default"};
        this.refresh = this.refresh.bind(this);
    }

    getAllCourse(e) {
        e.preventDefault();
        axios.get(`/view/${this.state.view_user._id}/course`).then((res) => {
            if (res.data.course) {
                alert(JSON.stringify(res.data.course));
            } else {
                alert('No Course found');
            }
        });
    }


    componentDidMount() {
        const user_id = this.props.match.params.id

        const view_user = axios.get(`/view/${user_id}`).then((res) => {
            this.setState({view_user:res.data});
        })


        axios.get(`/view/${user_id}/course`).then((res) => {
            if (res.data.course) {
                this.setState({courses: res.data.course});
                this.refresh();
            }
        });
    }

    refresh() {
        let keys = Object.keys(this.state.courses);
        let rows = [];
        let i = 0;
        axios.get(`/view/${this.state.view_user._id}/course`).then((res) => {
            if (res.data.course) {
                this.setState({courses: res.data.course});
                keys.map((key) => {
                    if (this.state.courses[key]) {
                        this.state.courses[key].map((value) => {
                            rows[i] = {};
                            rows[i] = {
                                code: value.code,
                                year: value.year,
                                sem: value.sem,
                                grades: value.grades,
                                score: value.score,
                                state: value.state,
                                description: value.description,
                                name: value.name,
                                link: value.link,
                                _id: value._id,
                            };
                            i++;
                        });
                    }
                });
                this.setState({courses2: rows});
            }
        });
    }


    render() {

        return (
          <Fragment>
              <ViewNav view_user={this.state.view_user}/>
              <Helmet>
                  <title>Microhard &middot; Courses </title>
              </Helmet>
              <div style={{height: '120px', backgroundColor: '#094183'}}>
                  <br />
                  <br />
                  <Typography
                    variant="h1"
                    align="center"
                    style={{color: '#fff', fontSize: '36px'}}
                  >
                      Courses
                  </Typography>
              </div>
                <div>
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={(e, index) => this.setState({tabIndex: index})}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon label tabs example"
                    >
                        <Tab label="Overview" index={0} />
                        <Tab label='Details' index={1} />
                    </Tabs>
                    {this.state.tabIndex === 0 &&
                    <div>
                        {this.state.courses && <MyGrid courses={this.state.courses} />}
                        <br />
                        <Typography align="center" variant="h3">Course Overview</Typography>
                        <br />
                        <Grid container justify="center" direction="row">
                            <Grid item xs={11}>
                                {this.state.courses2 && <GetAccords courses={this.state.courses2} />}
                            </Grid>
                        </Grid>
                    </div>
                    }
                    {this.state.tabIndex === 1 && <div>
                        <GetList courses={this.state.courses2} refresh={this.refresh} />
                        <br />
                    </div>}
                    <br/>
                </div>
    </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(withStyles(useStyles)(ViewCourse));