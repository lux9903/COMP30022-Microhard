import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import {updateProject} from '../../../actions/projectAction';

const styles = (theme) => ({
  formcontrol: {
    paddingLeft: theme.spacing(1),
  },
});

class Status extends Component {
  constructor(props) {
    super(props);
    this.handleStatOpen = this.handleStatOpen.bind(this);
    this.handleStatClose = this.handleStatClose.bind(this);
    this.handleShowOpen = this.handleShowOpen.bind(this);
    this.handleShowClose = this.handleShowClose.bind(this);
    this.handleShowStatusChange = this.handleShowStatusChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      status: this.props.project.project.status,
      show_status: this.props.project.project.show_status,
      open_stat: false,
      open_show: false,
    };
  }

  handleStatusChange = (event) => {
    let formD = {status: event.target.value};
    this.props.dispatch(updateProject(formD, this.props.id));
    this.setState({
      status: event.target.value,
      open_stat: false,
    });
  };

  handleShowStatusChange = (event) => {
    let formD = {show_status: event.target.value};
    this.props.dispatch(updateProject(formD, this.props.id));
    this.setState({
      show_status: event.target.value,
      open_show: false,
    });
  };

  handleStatClose = () => {
    this.setState({
      open_stat: false,
    });
  };

  handleShowClose = () => {
    this.setState({
      open_show: false,
    });
  };

  handleStatOpen = () => {
    this.setState({
      open_stat: true,
    });
  };
  handleShowOpen = () => {
    this.setState({
      open_show: true,
    });
  };

  render() {
    const {classes} = this.props;
    const {error, project} = this.props.project;
    let content;
    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (!project) {
      content = <Typography> The retrieve project not found.</Typography>;
    } else {
      content = (
        <Fragment>
          <Grid
            container
            direction="row"
            justify="flex_start"
            alignItems="center"
          >
            <Typography>Progress Status:</Typography>
            <FormControl className={classes.formcontrol}>
              <Select
                disableUnderline
                open={this.state.open}
                onClose={this.handleStatClose}
                onOpen={this.handleStatOpen}
                value={this.state.status}
                onChange={this.handleStatusChange}
              >
                <MenuItem value={'In progress'}>In progress</MenuItem>
                <MenuItem value={'Completed'}>Complete</MenuItem>
                <MenuItem value={'Cancel'}>Cancel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex_start"
            alignItems="center"
          >
            <Typography>Show Status:</Typography>
            <FormControl className={classes.formcontrol}>
              <Select
                disableUnderline
                open={this.state.open}
                onClose={this.handleShowClose}
                onOpen={this.handleShowOpen}
                value={this.state.show_status}
                onChange={this.handleShowStatusChange}
              >
                <MenuItem value={'public'}>Public</MenuItem>
                <MenuItem value={'private'}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Typography gutterBottom variant="h5" component="h2">
          Status
        </Typography>
        <Divider />
        {content}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps)(withStyles(styles)(Status));
