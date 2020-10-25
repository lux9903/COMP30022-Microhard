import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import {updateProject} from '../../../actions/projectAction';

const styles = (theme) => ({
    textfield:{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width:"100%",
        underline: "none",
    },
});

class General_Info extends Component{
    constructor(props) {
      super(props);
      this.onChangeDesc = this.onChangeDesc.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.handleGeneralSubmit = this.handleGeneralSubmit.bind(this);
      this.state = {
        name: this.props.project.project.name,
        description: this.props.project.project.description,
      };
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    onChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    handleGeneralSubmit = (event) =>{
        event.preventDefault();
        let formD = {
            "name": this.state.name,
            "description": this.state.description,
        }
        this.props.dispatch(updateProject(formD, this.props.id));
    }

    render(){
        const {classes} = this.props;
        const {error, project} = this.props.project;
        const {user} = this.props.user;
        let content;
        if (error) {
            content = <Alert severity="error">{error}</Alert>;
        } else if (!project) {
            content = (
              <Typography> The retrieve project not found.</Typography>
            );
        } else {
            content = (
                <form onSubmit={this.handleGeneralSubmit} fullWidth>
                    <Typography>
                        Name
                    </Typography>
                    <TextField 
                        value={this.state.name}
                        onChange={this.onChangeName}
                        fullWidth
                        className={classes.textfield}
                        variant="outlined"
                        required
                    />
                    <br/>
                    <Typography>
                        Description
                    </Typography>
                    <TextField 
                        value={this.state.description}
                        onChange={this.onChangeDesc}
                        fullWidth
                        multiline
                        variant="outlined"
                        className={classes.textfield}
                    />
                    <br/>
                    <Button
                        fullWidth
                        type="submit"
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.textfield}
                    >
                        Submit
                    </Button>
                </form>
            );
        }
        return(
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    General Information
                </Typography>
                <Divider/>
                {content}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state,
});
export default connect(mapStateToProps)(withStyles(styles)(General_Info));