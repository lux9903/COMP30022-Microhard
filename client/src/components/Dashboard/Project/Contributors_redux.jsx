import React, { Component, Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';
import {CircularProgress} from '@material-ui/core';


import Grid from '@material-ui/core/Grid';

import {
    createContributor,
    deleteContributor,
} from '../../../actions/projectAction';

//for function
const useStyles = makeStyles((theme) => ({
    textfield:{
        width: "65%",
        underline: "none",
        marginTop: theme.spacing(2),
    },
    icon:{
        marginTop: theme.spacing(2),
    },
    user:{
        underline: "none",
        marginTop: theme.spacing(2),
        width: "100%",
    }
}));

//for class
const styles = (theme) => ({
    textfield:{
        width: "65%",
        underline: "none",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    button:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    icon:{
        marginTop: theme.spacing(2),
    },
    progress: {
        marginTop: theme.spacing(2),
        marginBottom:theme.spacing(2),
    },
    root: {
        width: "100%",
    }
});


class Con_List extends Component{
    constructor(props){
        super(props);

        this.addContributor = this.addContributor.bind(this);
        this.deleteContributor = this.deleteContributor.bind(this);

        this.onInputContributor = this.onInputContributor.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.state = {
            input: "",
            open: false,
        }
    }

    deleteContributor = (name) => {
        let formD = {"old_users": name}
        this.props.dispatch(deleteContributor(formD, this.props.id));
    }

    addContributor = (name) => {
        let formD = {"new_users": name}
        this.props.dispatch(createContributor(formD, this.props.id));
    }

    onInputContributor =(event)=>{
        this.setState({input:event.target.value});
    }

    handleContributorSubmit = (event) =>{
        event.preventDefault();
        this.setState({input:"", open:false});
        this.addContributor([this.state.input]);
    }

    handleAddOpen = () => {
        this.setState({open:true});
    }

    handleAddClose = () => {
        this.setState({open:false});
    }

    handleAddCancel = () =>{
        this.setState({
            open:false,
            input: "",
        });
    }

    render(){
        const {classes}= this.props;
        const {error, isUpdatingCon, project} = this.props.project;
        const {user} = this.props.user;

        //console.log(project);
        let content;
        if (error) {
            content = <Alert severity="error">{error}</Alert>;
        } else if (isUpdatingCon) {
            content = (
                <Grid container justify="center" className={classes.root}>
                    <CircularProgress color="primary" className={classes.progress}/>
                </Grid>
            );
        } else if (!project || !project.contributors) {
            content = (
              <Typography> The retrieve project not found.</Typography>
            );
        } else {
            content = project.contributors.map((cons) => (
              <Con_Items cons={cons} add={this.addContributor} delete={this.deleteContributor} username={user.username}/>
            ));
        }

        return(
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    Contributors
                </Typography>
                <Divider/>
                {content}
                {!this.state.open ? (
                    <Button 
                        onClick={this.handleAddOpen}
                        fullWidth
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Add new contributor
                    </Button>
                ) :(
                    <form onSubmit={this.handleContributorSubmit}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <TextField
                                label="Add contributor"
                                onChange={this.onInputContributor}
                                required
                                variant="outlined"
                                size="small"
                                className={classes.textfield}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <IconButton type="submit" className={classes.icon}>
                                <CheckIcon fontSize="small" color="primary"/>
                            </IconButton>
                            <IconButton onClick={this.handleAddCancel} className={classes.icon} >
                                <ClearIcon fontSize="small" style={{ color: "red" }}/>
                            </IconButton>
                        </Grid>
                    </form>
                )}
            </Fragment>
        )
    }
}

function Con_Items(props){
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(props.cons);
    const classes = useStyles();

    const handleContributorCancel = () =>{
        setOpen(false);
        setName(props.cons);
    }
    const handleContributorOpen = () =>{
        setOpen(true);
    }

    useEffect(() => {
        setName(props.cons);
    }, [props.cons]);

    const handleContributorDelete = () =>{
        props.delete([props.cons]);
    };

    const onInputContributorUpdate = (event) =>{
        setName(event.target.value);
    }

    const handleContributorUpdate = (event) => {
        event.preventDefault();
        setOpen(false);
        props.add([name]);
        props.delete([props.cons]);
    };
    return(
        <Fragment>
            {(name === props.username) ? (
                <TextField
                    disabled
                    value={name}
                    variant="outlined"
                    size = "small"
                    className={classes.user}
                />
            ) : (
                (!open) ? (
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <TextField
                            disabled
                            value={name}
                            variant="outlined"
                            size = "small"
                            className={classes.textfield}
                        />
                        <IconButton onClick={handleContributorOpen} className={classes.icon}>
                            <EditIcon  fontSize="small" color="primary"/>
                        </IconButton>
                        <IconButton onClick={handleContributorDelete} className={classes.icon}>
                            <DeleteIcon fontSize="small" style={{ color: "red" }}/>
                        </IconButton>
                    </Grid>
                ) : (
                    <form onSubmit={handleContributorUpdate} fullWidth>
                        <TextField
                            onChange={onInputContributorUpdate}
                            value={name}
                            variant="outlined"
                            size="small"
                            required
                            className={classes.textfield}
                        />
                        <IconButton type="submit">
                            <CheckIcon fontSize="small" color="primary" className={classes.icon}/>
                        </IconButton>
                        <IconButton onClick={handleContributorCancel} >
                            <ClearIcon fontSize="small" style={{ color: "red" }} className={classes.icon}/>
                        </IconButton>
                    </form>
                )
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    ...state,
});
export default connect(mapStateToProps)(withStyles(styles)(Con_List));
