import React, { Component, Fragment, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import axios from '../../../helpers/axiosConfig';
import {withStyles } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
//import Con_Items from './Contributors';

import Grid from '@material-ui/core/Grid';

import {
    fetchProject,
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
});


class Con_List extends Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getContributor = this.getContributor.bind(this);
        this.renContributorList = this.renContributorList.bind(this);
        this.updateContributor = this.updateContributor.bind(this);
        this.onInputContributor = this.onInputContributor.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.state = {
            conlist:[],
            input: "",
            open: false,
        }
    }
    componentDidMount = () =>{
        this.getContributor();
    }

    getContributor = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState(
                {conlist: res.data.project.contributors},
                //alert(this.state.conlist)
            );
        })
        .catch((error) => {});
    }

    renContributorList = () =>{
        return (this.state.conlist && this.state.conlist.map((cons,i)=>{
            return <Con_Items cons={cons} id={this.props.id} update={this.updateContributor} username={this.props.username}/>
        }));
    }

    updateContributor = () => {
        this.getContributor();
        this.renContributorList();
    }

    onInputContributor =(event)=>{
        this.setState({input:event.target.value});
    }

    handleContributorSubmit = (event) =>{
        event.preventDefault();
        axios.post('/project/add_people/'+this.props.id, {"new_users":[this.state.input]})
        .then(() => {
            this.updateContributor();
            this.setState({input:"", open:false})
        })
        .catch((error) => {});
        //this.updateContributor();
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
        return(
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    Contributors
                </Typography>
                <Divider/>
                {this.renContributorList()}
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
                                //InputProps={{ disableUnderline: true }}
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
        //alert(name);
        axios.post('/project/remove_people/'+props.id, {"old_users":[props.cons]})
        .then(()=>props.update())
        .catch((error) => {});
    };

    const onInputContributorUpdate = (event) =>{
        setName(event.target.value);
    }

    const handleContributorUpdate = (event) => {
        event.preventDefault();
        setOpen(false);
        axios.post('/project/remove_people/'+props.id, {"old_users":[props.cons]})
        .catch((error) => {})
        axios.post('/project/add_people/'+props.id, {"new_users":[name]})
        .then(()=>props.update())
        .catch((error) => {});
    };
    return(
        <Fragment>
            {(name === props.username) ? (
                <TextField
                    disabled
                    value={name}
                    //fullWidth
                    //InputProps={{ disableUnderline: true }}
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
                            //InputProps={{ disableUnderline: true }}
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
                            //InputProps={{ disableUnderline: true }}
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

//export default (Con_List);
export default withStyles(styles)(Con_List);

/*
class Con_Items extends Component{
    constructor(props){
        super(props);
        this.onInputContributorUpdate = this.onInputContributorUpdate.bind(this);
        this.handleContributorCancel = this.handleContributorCancel.bind(this);
        this.handleContributorOpen = this.handleContributorOpen.bind(this);
        this.handleContributorUpdate = this.handleContributorUpdate.bind(this);
        this.handleContributorDelete = this.handleContributorDelete.bind(this);
        this.state = {
            name: this.props.contributor,
            open: false,
        }
    }
    handleContributorCancel = () =>{
        this.setState({
            open:false,
            name:this.props.contributor,
        })
    }
    handleContributorOpen = () =>{
        this.setState({
            open:true,
        })
    }
    handleContributorDelete = () =>{
        axios.post('/project/remove_people/'+this.props.id, {"old_users":[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    onInputContributorUpdate = (event) =>{
        this.setState({
            name: event.target.value,
        });
    }

    handleContributorUpdate = (event) => {
        event.preventDefault();
        this.setState({open:false});
        axios.post('/project/remove_people/'+this.props.id, {"old_users":[this.props.contributor]})
        .catch((error) => {})
        this.props.update();
        axios.post('/project/add_people/'+this.props.id, {"new_users":[this.state.name]})
        .catch((error) => {});
        this.props.update();
    };

    render(){
        return(
            <Fragment>
                {(!this.state.open) ? (
                    <div>
                        <TextField
                            disabled
                            value={this.state.name}
                            InputProps={{ disableUnderline: true }}
                            variant="outlined"
                            size = "small"
                        />
                        <IconButton onClick={this.handleContributorOpen}>
                            <EditIcon  fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={this.handleContributorDelete}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={this.handleContributorUpdate} fullWidth>
                            <TextField
                                onChange={this.onInputContributorUpdate}
                                value={this.state.name}
                                InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                size="small"
                                required
                            />
                            <IconButton type="submit">
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleContributorCancel} >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        </form>
                    </div>
                )}
            </Fragment>
        )
    }
}*/
  
