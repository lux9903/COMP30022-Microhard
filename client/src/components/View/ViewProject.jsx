import React, {Component, Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../helpers/axiosConfig';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ViewNav from './ViewNav';

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: '#094183',
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
  ListItem: {
    padding: '0px',
  },
  list: {
    maxHeight: 100,
    overflow: 'auto',
  },
  container: {
    justify_content: 'space-between',
  },
});

//button to opening warning delete form

//Button opening add form

//adding form

function Project(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{props.project.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          <Typography>Description: {props.project.description}</Typography>
          <Typography>Progress: {props.project.status}</Typography>
          <Typography>Show status: {props.project.show_status}</Typography>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          variant="contained"
          size="small"
          href={`/view/${props.view_user._id}/project/` + props.project._id}
        >
          View
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
class ViewProjectList extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.pList = this.pList.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.getCondition = this.getCondition.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onShowStatusChange = this.onShowStatusChange.bind(this);
    this.state = {
      projlist: [],
      search: '',
      search_status: '',
      sortBy: '',
      show_status: '',
      view_user: 'default',
    };
  }

  pList = () => {
    return (
      this.state.projlist &&
      this.state.projlist.map((proj, i) => {
        return (
          <Project
            project={proj}
            view_user={this.state.view_user}
            update={this.update}
          />
        );
      })
    );
  };

  getAll = (user_id) => {
    axios
      .get(`/view/${user_id}/project`)
      .then((res) => {
        this.setState({projlist: res.data.projects});
      })
      .catch((error) => {});
  };

  getCondition = (user_id) => {
    let formD = {
      name: this.state.input,
    };

    if (this.state.search_status !== '') {
      formD['status'] = this.state.search_status;
    }

    if (this.state.sortBy !== '') {
      formD['sortBy'] = this.state.sortBy;
    }

    if (this.state.show_status !== '') {
      //alert(this.state.show_status);
      formD['show_status'] = this.state.show_status;
      //alert(formD['show_status']);
    }
    axios
      .post(`/view/${user_id}/project/conditional`, formD)
      .then((res) => {
        this.setState({projlist: res.data.result});
        //alert(res.data.result);
      })
      .catch((error) => {});
  };

  update = () => {
    this.getCondition(this.state.view_user._id);
    this.pList();
  };
  componentDidMount = () => {
    const user_id = this.props.match.params.id;

    const view_user = axios.get(`/view/${user_id}`).then((res) => {
      this.setState({view_user: res.data});
    });
    this.getAll(user_id);
  };

  onChangeInput = (event) => {
    event.preventDefault();
    this.setState({input: event.target.value});
  };

  onSearch = (event) => {
    //event.preventDefault();
    if (event.key === 'Enter') {
      this.update();
    }
  };

  onStatusChange = (event, newstatus) => {
    if (newstatus !== null) {
      this.setState(
        {search_status: newstatus},
        //alert(this.state.search_status),
        this.update
      );
    }
    //alert(this.state.search_status);
  };

  onSortChange = (event, newsort) => {
    if (newsort !== null) {
      this.setState(
        {sortBy: newsort},
        //alert(this.state.search_status),
        this.update
      );
    }
  };

  onShowStatusChange = (event, newshow) => {
    if (newshow !== null) {
      this.setState(
        {show_status: newshow},
        //alert(this.state.search_status),
        this.update
      );
    }
  };

  render() {
    return (
      <Fragment>
        <ViewNav view_user={this.state.view_user} />
        <Helmet>
          <title>Microhard &middot; My projects </title>
        </Helmet>
        <div style={{padding: '10px', backgroundColor: '#094183'}}>
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
              A place for me to showcase my projects
            </Typography>
          </Container>
        </div>
        <br />
        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <TextField
              onChange={this.onChangeInput}
              onKeyDown={this.onSearch}
              value={this.state.input}
              variant="outlined"
              size="small"
              placeholder="Search name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <ToggleButtonGroup
              value={this.state.sortBy}
              exclusive
              onChange={this.onSortChange}
              size="small"
            >
              <ToggleButton value="">All</ToggleButton>
              <ToggleButton value="descending">Oldest</ToggleButton>
              <ToggleButton value="ascending">Lastest</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={this.state.search_status}
              exclusive
              onChange={this.onStatusChange}
              size="small"
            >
              <ToggleButton value="">All</ToggleButton>
              <ToggleButton value="In progress">In progress</ToggleButton>
              <ToggleButton value="Completed">Complete</ToggleButton>
              <ToggleButton value="Cancel">Cancel</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <br />
          {this.pList()}
          <br />
          <br />
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewProjectList));
