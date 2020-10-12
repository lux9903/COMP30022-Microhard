import React, { Component, Fragment} from 'react';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';


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
            //alert(res.data.project.process);
            //alert(res.data.project.process.length);
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

    handleAddProcessSubmit = () =>{
        axios.post('/project/process/'+ this.props.id, {
            "process": {
            "description": this.state.input,
            "processNum": this.state.proclist ? (this.state.proclist.length+1) : (0),
            "status": true
        }})
        //.then(alert(this.state.proclist.length + 1))
        .catch((error) => {});
        this.setState({input:""});
        this.updateProcess();
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    Process
                </Typography>
                <Divider/>
                {this.renProcessList()}
                <form onSubmit= {this.handleAddProcessSubmit}>
                    <TextField
                        label="Add description for new process"
                        onChange={this.onInputAddProcess}
                        InputProps={{ disableUnderline: true }}
                        required
                        fullWidth
                        variant="outlined"
                    />
                    <Button type="submit" fullWidth>Add</Button>
                </form>
            </Fragment>
        )
    }
}

//render a particular process with a form to add a node 
class Process extends Component {
    constructor(props){
        super(props);
        this.handleProcessDelete = this.handleProcessDelete.bind(this);
        this.handleAddNodeSubmit = this.handleAddNodeSubmit.bind(this);
        this.onInputAddNodeChange =this.onInputAddNodeChange.bind(this);
        this.state = {
            input: "",
        }
    }

    handleProcessDelete = () => {
        axios.post('/project/process/remove/'+this.props.id, {
            "processNum": this.props.process.processNum,
        })
        .catch((error) => {});
        this.props.update();
    }

    onInputAddNodeChange = (event) => {
        //event.preventDefault();
        this.setState({
            input: event.target.value,
        })
    }

    handleAddNodeSubmit = () => {
        axios.post('/project/process/node/'+this.props.id, {
            "processNum": this.props.process.processNum,
            "description" : this.state.input,
        })
        .catch((error) => {});
        this.setState({input: ""})
        this.props.update();
    }

    render() {
      return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">{this.props.process.description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column">
                    <List>
                        {this.props.process.nodes && this.props.process.nodes.map((node, i)=>{
                            return( 
                                <ListItem>
                                    <Node node={node} id={this.props.id} update={this.props.update} processNum={this.props.process.processNum}/>
                                </ListItem>
                        )})}
                    </List>
                    <form onSubmit={this.handleAddNodeSubmit}>
                        <TextField
                            label="Add new task"
                            InputProps={{ disableUnderline: true }}
                            onChange={this.onInputAddNodeChange}
                            value={this.state.input}
                            required
                            variant="outlined"
                        />
                        <Button type="submit">Add</Button>
                    </form>
                </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <EditButton process={this.props.process} id={this.props.id}/>
                <Button onClick={this.handleProcessDelete}>Delete</Button>
            </AccordionActions>
        </Accordion>
      );
    }
}

//pop up form to edit particular process
class EditButton extends Component {
    constructor(props){
        super(props);
        this.onInputEditProcessChange = this.onInputEditProcessChange.bind(this);
        this.handleEditProcessSubmit = this.handleEditProcessSubmit.bind(this);
        this.handleEditProcessCancel = this.handleEditProcessCancel.bind(this);
        this.handleEditProcessOpen = this.handleEditProcessOpen.bind(this);
        this.state = {
            description: this.props.process.description,
            open: false,
        }
    }
    onInputEditProcessChange = (event) => {
        this.setState({description:event.target.value});
    }

    handleEditProcessSubmit = () =>{
        axios.post('/project/process/update/'+this.props.id, {
            'description': this.state.description,
            'processNum': this.props.process.processNum
        })
        .then(this.props.update())
        //.then(alert(this.props.process.processNum))
        .catch((error) => {});
        //this.props.update();
    }

    handleEditProcessCancel = () => {
        this.setState({
            open:false,
            description:this.props.process.description,
        });
    }

    handleEditProcessOpen = () => {
        this.setState({open:true});
    }

    render(){
        return(
            <Fragment>
            {(!this.state.open) ? (
                <Button onClick={this.handleEditProcessOpen}>Edit</Button>
            ) : (
                <Dialog
                    open={this.state.open}
                    onClose={this.handleEditProcessCancel}
                    closeAfterTransition
                >
                    <DialogContent>
                        <form onSubmit={this.handleEditProcessSubmit} fullWidth>
                            <Typography>
                                Process Number: {this.props.process.processNum}
                            </Typography>
                            <Typography>
                                Description
                            </Typography>
                            <TextField
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                onChange={this.onInputEditProcessChange}
                                required
                                fullWidth
                                multiline
                                variant="outlined"
                            />
                            <Button type="submit">Submit</Button>
                            <Button onClick={this.handleEditProcessCancel}>Cancel</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )} 
            </Fragment>
        )
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
            state: this.props.node.state,
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
        })
        .catch((error) => {});
        this.props.update();
    };

    OnInputEditNodeChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    }

    handleEditNodeUpdate = (event) => {
        axios.post('/project/process/node/update/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
            "description": this.state.description,
        })
        .catch((error) => {});
        this.props.update();
    };

    //adding box -> handleboxChecked
    render(){
        return(
            <Fragment>
                {(!this.state.open) ? (
                    <div>
                        <TextField
                            disabled
                            value={this.state.description}
                            InputProps={{ disableUnderline: true }}
                            multiline
                            variant="outlined"
                        />
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
                            <IconButton type="submit">
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleEditNodeCancel}>
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        </form>
                    </div>
                )}
            </Fragment>
        )
    }
}
  
export default (Process_List);

/*
    <List>
      <ListItem fullWidth>
      {openEdit ? (
        <div>
          <ListItemText>
            <TextField value="hello" disabled/>
            <IconButton onClick={handleEditClick}>
              <EditIcon/>
          </IconButton>
          </ListItemText>
        </div>
      ) : (
        <div>
          <ListItemText>
            <TextField value="hello"/>
            <IconButton onClick={handleEditClick}>
              <ClearIcon/>
          </IconButton>
          </ListItemText>
        </div>
      )}
        {open ? (<ExpandLess onClick={handleClick}/>) : (<ExpandMore onClick={handleClick}/>)}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <ListItem>
              <TextField value="hello" disabled/>
          </ListItem>
        </List>
      </Collapse>
    </List>

    
*/

