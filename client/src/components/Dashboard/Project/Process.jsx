import React, { Component, Fragment, useState, useEffect} from 'react';
import axios from '../../../helpers/axiosConfig';

import {withStyles } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import {
    fetchProject,
    createProcess,
    updateProcess,
    deleteProcess,
    createNode,
    updateNode,
    deleteNode,
    finishNode,
} from '../../../actions/projectAction';

//for function
const useStyles = makeStyles((theme) => ({
    textfield:{
        width: "80%",
        underline: "none"
    },
    textfield2:{
        width: "73%",
    },
    accordion :{
        width: "81%",
        underline: "none",
    },
    button:{
        marginTop: theme.spacing(2),
    },
    root: {
        width: "100%",
    }
}));

//for class
const styles = (theme) => ({
    textfield:{
        width: "83%",
        underline: "none",
        marginTop: theme.spacing(2),
    },
    button:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    icon:{
        marginTop: theme.spacing(2),
    },
});

//render the process list and have a form to add a process
class Process_List extends Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getProcess = this.getProcess.bind(this);
        this.renProcessList = this.renProcessList.bind(this);
        this.updateProcess = this.updateProcess.bind(this);
        this.onInputAddProcess = this.onInputAddProcess.bind(this);
        this.handleAddProcessSubmit = this.handleAddProcessSubmit.bind(this);
        this.state = {
            proclist:[],
            input: "",
            open: false,
        }
    }
    componentDidMount = () =>{
        this.getProcess();
    }

    getProcess = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                proclist: res.data.project.process,
            });
        })
        .catch((error) => {});
    }

    renProcessList = () => {
        return (this.state.proclist && this.state.proclist.map((proc,i)=>{
            return <Process process={proc} id={this.props.id} update={this.updateProcess} fullWidth/>
        }));
    }

    updateProcess = () =>{
        this.getProcess();
        this.renProcessList();
    }

    onInputAddProcess = (event) =>{
        this.setState({input:event.target.value});
    }

    handleAddProcessSubmit = (event) =>{
        event.preventDefault();
        this.setState({open:false});
        axios.post('/project/process/'+ this.props.id, {
            "process": {
            "description": this.state.input,
            "processNum": this.state.proclist ? (this.state.proclist.length+1) : (0),
            "status": true
        }})
        .then(()=> this.updateProcess())
        .catch((error) => {});
        this.setState({input:""});
    }

    handleAddProcessCancel = () => {
        this.setState({
            open:false,
            input: "",
        });
    }

    handleAddProcessOpen = () => {
        this.setState({open:true});
    }

    render(){
        const {classes} = this.props;
        return(
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    Process
                </Typography>
                <Divider/>
                {this.renProcessList()}
                {!this.state.open ? (
                    <Button
                        onClick={this.handleAddProcessOpen}
                        fullWidth
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Add new Process
                    </Button>
                ) : (
                    <form onSubmit= {this.handleAddProcessSubmit}>
                        <TextField
                            label="Add description for new process"
                            onChange={this.onInputAddProcess}
                            //InputProps={{ disableUnderline: true }}
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />
                        <IconButton type="submit" className={classes.icon}>
                            <CheckIcon fontSize="small" color="primary"/>
                        </IconButton>
                        <IconButton onClick={this.handleAddProcessCancel} className={classes.icon}>
                            <ClearIcon fontSize="small" style={{ color: "red" }}/>
                        </IconButton>
                    </form>
                )}   
            </Fragment>
        )
    }
}



//render a particular process with a form to add a node 
function Process(props){
    const [open,setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [input,setInput] = useState("");
    const [description, setDescription] = useState(props.process.description);
    const [nodelist, setNodeList] = useState(props.process.nodes);
    const classes = useStyles();

    useEffect(() => {
        setDescription(props.process.description);
        setNodeList(props.process.nodes);
    }, [props.process]);

    const renNodeList = () => {
        return (nodelist && nodelist.map((node,i)=>{
            return <Node node={node} id={props.id} processNum={props.process.processNum} update={() => props.update()} fullWidth/>
        }));
    }

    const handleNodeListOpen = () => {
        setOpen(true);
    }

    const handleNodeListClose = () =>{
        setOpen(false);
    }

    const handleAddNodeOpen = () => {
        setOpenAdd(true);
    }

    const handleAddNodeCancel = () => {
        setOpenAdd(false);
        setInput("");
    }

    const onInputAddNodeChange = (event) => {
        setInput(event.target.value);
    }

    const handleAddNodeSubmit = (event) => {
        event.preventDefault();
        setOpenAdd(false);
        axios.post('/project/process/node/'+props.id, {
            "processNum": props.process.processNum,
            "description" : input,
        })
        .then(() => props.update())
        .catch((error) => {});
    }

    const handleProcessEditOpen = () => {
        setOpenEdit(true);
    }

    const handleProcessEditCancel = () => {
        setOpenEdit(false);
        setDescription(props.process.description);
    }

    const onInputEditProcessChange = (event) => {
        setDescription(event.target.value);
    }

    const handleProcessEditSubmit = (event) => {
        event.preventDefault();
        setOpenEdit(false);
        axios.post('/project/process/update/'+props.id, {
            "processNum": props.process.processNum,
            "description":description,
        })
        .then(()=> props.update())
        .catch((error) => {});
    }

    const handleProcessDelete = () => {
        axios.post('/project/process/remove/'+props.id, {
            "processNum": props.process.processNum,
        })
        .then(()=> props.update())
        .catch((error) => {});
    }
    return (
        <Fragment>
            <List className={classes.root}>
                <ListItem>
                    {!openEdit ? (
                        <Grid container direction="row" justify="" alignItems="center">
                            <TextField
                                disabled
                                value={description}
                                InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                size = "small"
                                className={classes.accordion}
                            />
                            <IconButton onClick={handleProcessEditOpen}>
                                <EditIcon  fontSize="small" color="primary"/>
                            </IconButton>
                            <IconButton onClick={handleProcessDelete}>
                                <DeleteIcon fontSize="small" style={{ color: "red" }}/>
                            </IconButton>
                        </Grid>
                    ) :(
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <TextField
                                onChange={onInputEditProcessChange}
                                value={description}
                                //InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                size = "small"
                                required
                                className={classes.accordion}
                            />
                            <IconButton onClick={handleProcessEditSubmit}>
                                <CheckIcon  fontSize="small" color="primary"/>
                            </IconButton>
                            <IconButton onClick={handleProcessEditCancel}>
                                <ClearIcon fontSize="small" style={{ color: "red" }}/>
                            </IconButton>
                        </Grid>
                    )}
                    {!open ? (
                        <IconButton onClick={handleNodeListOpen}>
                            <ExpandMoreIcon fontSize="small"/>
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleNodeListClose}>
                            <ExpandLessIcon fontSize="small"/>
                        </IconButton>
                    )}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {renNodeList()}
                        <ListItem>
                        {!openAdd ? (
                            <Button 
                                onClick={handleAddNodeOpen}
                                fullWidth
                                size="small"
                                variant="contained"
                                color="primary"
                            >
                                Add new task
                            </Button>
                        ) : (
                            <form onSubmit={handleAddNodeSubmit} className={classes.root}>
                                <Grid container direction="row" justify="flex_start">
                                    <TextField
                                        label="Add new task"
                                        onChange={onInputAddNodeChange}
                                        //InputProps={{ disableUnderline: true }}
                                        required
                                        variant="outlined"
                                        size="small"
                                        className={classes.textfield2}
                                    />
                                    <IconButton type="submit" className={classes.icon}>
                                        <CheckIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={handleAddNodeCancel} className={classes.icon}>
                                        <ClearIcon fontSize="small" style={{ color: "red" }}/>
                                    </IconButton>
                                </Grid>
                            </form>
                        )}
                        </ListItem>
                    </List>
                </Collapse>
                <Divider/>
            </List>
        </Fragment>
    )
}


//render the node-items, which each have view and edit mode
function Node(props){
    const [description, setDescription] = useState(props.node.description);
    const [status, setStatus] = useState(props.node.state);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setDescription(props.node.description);
        setStatus(props.node.state);
    }, [props.node]);

    const handleEditNodeCancel = () => {
        setOpen(false);
        setDescription(props.node.description);
    }

    const handleEditNodeOpen = () => {
        setOpen(true);
    }

    const handleNodeDelete = () => {
        axios.post('/project/process/node/remove/'+props.id, {
            "processNum": props.processNum,
            "nodeIndex" : props.node.index,
        }).then(() => props.update())
        .catch((error) => {});
    };

    const OnInputEditNodeChange = (event) => {
        setDescription(event.target.value);
    }

    const handleEditNodeUpdate = (event) => {
        event.preventDefault();
        setOpen(false);
        let formD = {
			"processNum" : props.processNum,
            "nodeIndex" : props.node.index,
            "description": description
		}
        axios.post('/project/process/node/update/'+props.id, formD)
        .then(()=>props.update())
        .catch((error) => {});
    };

    const handleFinishNode = (event) => {
        setStatus(event.target.checked);
        axios.post('/project/process/node/finish/'+props.id, {
            "processNum": props.processNum,
            "nodeIndex" : props.node.index,
            "state": event.target.checked
        })
        .then(()=>props.update())
        .catch((error) => {});
    }

    return(
        <Fragment>
            <ListItem>
                {(!open) ? (
                    <Grid container direction="row" justify="flex_start">
                        <TextField
                            disabled
                            value={description}
                            multiline
                            variant="outlined"
                            className={classes.textfield2}
                            size="small"
                        />
                        <Checkbox checked={status} onChange={handleFinishNode} className={classes.icon}/>
                        <IconButton onClick={handleEditNodeOpen} className={classes.icon}>
                            <EditIcon fontSize="small" color="primary"/>
                        </IconButton>
                        <IconButton onClick={handleNodeDelete} className={classes.icon}>
                            <DeleteIcon fontSize="small" style={{ color: "red" }}/>
                        </IconButton>
                    </Grid>
                ) : (
                    <form onSubmit={handleEditNodeUpdate} className={classes.root}>
                        <Grid container direction="row" justify="flex_start">
                            <TextField
                                onChange={OnInputEditNodeChange}
                                value={description}
                                //InputProps={{ disableUnderline: true }}
                                multiline
                                required
                                variant="outlined"
                                size="small"
                                className={classes.textfield2}
                            />
                            <Checkbox checked={status} onChange={handleFinishNode} className={classes.icon}/>
                            <IconButton type="submit" className={classes.icon}>
                                <CheckIcon fontSize="small" color="primary"/>
                            </IconButton>
                            <IconButton onClick={handleEditNodeCancel} className={classes.icon}>
                                <ClearIcon fontSize="small" style={{ color: "red" }}/>
                            </IconButton>
                        </Grid>
                    </form>
                )}
            </ListItem>
        </Fragment>
    )
}
  
//export default (Process_List);
export default withStyles(styles)(Process_List);

/*
class Node extends Component{
    constructor(props){
        super(props);
        this.OnInputEditNodeChange = this.OnInputEditNodeChange.bind(this);
        this.handleEditNodeCancel = this.handleEditNodeCancel.bind(this);
        this.handleEditNodeOpen = this.handleEditNodeOpen.bind(this);
        this.handleEditNodeUpdate = this.handleEditNodeUpdate.bind(this);
        this.handleNodeDelete = this.handleNodeDelete.bind(this);
        this.state = {
            description: this.props.node.description,
            status: this.props.node.state,
            open: false,
        }
    }

    handleEditNodeCancel = () =>{
        this.setState({
            open:false,
            description:this.props.node.description,
        })
    }

    handleEditNodeOpen = () =>{
        //alert(this.props.node.index);
        this.setState({
            open:true,
        })
    }

    handleNodeDelete = () =>{
        axios.post('/project/process/node/remove/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.index,
        }).then(this.props.update())
        .catch((error) => {});
        //this.props.update();
    };

    OnInputEditNodeChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    }

    handleEditNodeUpdate = (event) => {
        event.preventDefault();
        this.setState({open:false});
        let formD = {
			"processNum" : this.props.processNum,
            "nodeIndex" : this.props.node.index,
            "description": this.state.description
		}
		axios.post('/project/process/node/update/'+this.props.id, formD).catch((error) => {});
        //this.props.update();
    };

    handleFinishNode = (event) => {
        axios.post('/project/process/node/finish/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.index,
            //"state":this.state.status,
        })
        .catch((error) => {});
        this.props.update();
    }

    render(){
        return(
            <Fragment>
                <ListItem fullWidth>
                {(!this.state.open) ? (
                    <div>
                        <TextField
                            disabled
                            value={this.state.description}
                            InputProps={{ disableUnderline: true }}
                            multiline
                            variant="outlined"
                        />
                        <Checkbox value={this.state.status} onChange={this.handleFinishNode}/>
                        <IconButton onClick={this.handleEditNodeOpen}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={this.handleNodeDelete}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={this.handleEditNodeUpdate}>
                            <TextField
                                onChange={this.OnInputEditNodeChange}
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                multiline
                                required
                                variant="outlined"
                            />
                            <Checkbox value={this.state.status} onChange={this.handleFinishNode}/>
                            <IconButton type="submit">
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleEditNodeCancel}>
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        </form>
                    </div>
                )}
                </ListItem>
            </Fragment>
        )
    }
}

class Process extends Component {
    constructor(props){
        super(props);
        this.renNodeList = this.renNodeList.bind(this);
        this.handleNodeListOpen = this.handleNodeListOpen.bind(this);
        this.handleNodeListClose = this.handleNodeListClose.bind(this);
        this.handleAddNodeOpen = this.handleAddNodeOpen.bind(this);
        this.handleAddNodeCancel = this.handleAddNodeCancel.bind(this);
        this.handleAddNodeSubmit = this.handleAddNodeSubmit.bind(this);
        this.onInputAddNodeChange =this.onInputAddNodeChange.bind(this);
        this.handleProcessDelete = this.handleProcessDelete.bind(this);
        this.handleProcessEditOpen = this.handleProcessEditOpen.bind(this);
        this.handleProcessEditCancel = this.handleProcessEditCancel.bind(this);
        this.handleProcessEditSubmit = this.handleProcessEditSubmit.bind(this);
        this.onInputEditProcessChange = this.onInputEditProcessChange.bind(this);
        
        this.state = {
            open:false,
            openEdit: false,
            openAdd:false,
            input: "",
            description: this.props.process.description,
            nodelist:this.props.process.nodes,
        }
    }

    renNodeList = () => {
        return (this.state.nodelist && this.state.nodelist.map((node,i)=>{
            return <Node node={node} id={this.props.id} processNum={this.props.process.processNum} update={this.props.update} fullWidth/>
        }));
    }

    handleNodeListOpen = () => {
        this.setState({open:true});
    }

    handleNodeListClose = () =>{
        this.setState({open:false});
    }

    handleAddNodeOpen = () => {
        this.setState({openAdd:true});
    }

    handleAddNodeCancel = () => {
        this.setState({
            openAdd:false,
            input:"",
        });
    }

    onInputAddNodeChange = (event) => {
        this.setState({
            input: event.target.value,
        })
    }

    handleAddNodeSubmit = (event) => {
        event.preventDefault();
        this.setState({openAdd:false});
        //alert(this.props.process.processNum);
        axios.post('/project/process/node/'+this.props.id, {
            "processNum": this.props.process.processNum,
            "description" : this.state.input,
        })
        //.then(alert(this.props.process.processNum))
        .catch((error) => {});
        this.props.update();
    }

    handleProcessEditOpen = () => {
        this.setState({openEdit:true});
    }

    handleProcessEditCancel = () => {
        this.setState({
            openEdit:false,
            description:this.props.process.description,
        });
    }

    onInputEditProcessChange = (event) => {
        this.setState({description:event.target.value});
    }

    handleProcessEditSubmit = (event) => {
        event.preventDefault();
        this.setState({openEdit:false});
        axios.post('/project/process/update/'+this.props.id, {
            "processNum": this.props.process.processNum,
            "description":this.state.description,
        })
        .then(this.props.update())
        .catch((error) => {});
        //this.props.update();
    }

    handleProcessDelete = () => {
        axios.post('/project/process/remove/'+this.props.id, {
            "processNum": this.props.process.processNum,
        })
        .catch((error) => {});
        this.props.update();
    }

    render() {
      return (
        <Fragment>
            <List>
                <ListItem fullWidth>
                    {!this.state.openEdit ? (
                        <div>
                            <TextField
                                disabled
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                size = "small"
                            />
                            <IconButton onClick={this.handleProcessEditOpen}>
                                <EditIcon  fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleProcessDelete}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    ) :(
                        <form onSubmit={this.handleProcessEditSubmit}>
                            <TextField
                                onChange={this.onInputEditProcessChange}
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                size = "small"
                                required
                            />
                            <IconButton type="submit">
                                <CheckIcon  fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleProcessEditSubmit}>
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        </form>
                    )}
                    {!this.state.open ? (
                        <IconButton onClick={this.handleNodeListOpen}>
                            <ExpandMoreIcon fontSize="small"/>
                        </IconButton>
                    ) : (
                        <IconButton onClick={this.handleNodeListClose}>
                            <ExpandLessIcon fontSize="small"/>
                        </IconButton>
                    )}
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List>
                            {this.renNodeList()}
                        </List>
                        {!this.state.openAdd ? (
                            <Button 
                                onClick={this.handleAddNodeOpen}
                                fullWidth
                                size="small"
                                variant="contained"
                                color="primary"
                            >
                                Add new task
                            </Button>
                        ) : (
                            <form onSubmit={this.handleAddNodeSubmit}>
                                <TextField
                                    label="Add new task"
                                    onChange={this.onInputAddNodeChange}
                                    InputProps={{ disableUnderline: true }}
                                    required
                                    variant="outlined"
                                    size="small"
                                />
                                <IconButton type="submit">
                                    <CheckIcon fontSize="small"/>
                                </IconButton>
                                <IconButton onClick={this.handleAddNodeCancel} >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            </form>
                        )}
                    </Collapse>
                </ListItem>
            </List>
        </Fragment>
      );
    }
}
*/
