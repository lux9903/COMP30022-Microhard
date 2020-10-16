import React, { Component, Fragment} from 'react';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import Checkbox from '@material-ui/core/Checkbox';


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
        .catch((error) => {});
        this.setState({input:"", open:false});
        this.updateProcess();
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
        return(
            <Fragment>
                <Typography>
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
                    >
                        Add new Process
                    </Button>
                ) : (
                    <form onSubmit= {this.handleAddProcessSubmit}>
                        <TextField
                            label="Add description for new process"
                            onChange={this.onInputAddProcess}
                            InputProps={{ disableUnderline: true }}
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                        <IconButton type="submit">
                            <CheckIcon fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={this.handleAddProcessCancel} >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    </form>
                )}   
            </Fragment>
        )
    }
}

//render a particular process with a form to add a node 
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
            return <Node node={node} id={this.props.id} update={this.props.update} fullWidth/>
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
        axios.post('/project/process/node/'+this.props.id, {
            "processNum": this.props.process.processNum,
            "description" : this.state.input,
        })
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
        .catch((error) => {});
        this.props.update();
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
        <List>
            <ListItem fullWidth>
                {/* show and edit form for process description */}
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
                {/* this is button to expand to see node list */}
                {!this.state.open ? (
                    <IconButton onClick={this.handleNodeListOpen}>
                        <ExpandMoreIcon fontSize="small"/>
                    </IconButton>
                ) : (
                    <IconButton onClick={this.handleNodeListClose}>
                        <ExpandLessIcon fontSize="small"/>
                    </IconButton>
                )}
                {/* this is render the node in the process */}
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        {this.renNodeList()}
                    </List>
                    {/* this is form to add a node in a process */}
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
      );
    }
}

//render the node-items, which each have view and edit mode
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
        this.setState({
            open:true,
        })
    }

    handleNodeDelete = () =>{
        axios.post('/project/process/node/remove/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
        }).then(alert("delete!"))
        .catch((error) => {});
        this.props.update();
    };

    OnInputEditNodeChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    }

    handleEditNodeUpdate = (event) => {
        event.preventDefault();
        this.setState({open:false});
        axios.post('/project/process/node/update/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
            "description": this.state.description,
        })
        .catch((error) => {});
        this.props.update();
    };

    handleFinishNode = (event) => {
        axios.post('/project/process/node/finish/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
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
  
export default (Process_List);


