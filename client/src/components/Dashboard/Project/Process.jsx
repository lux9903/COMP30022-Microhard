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
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

class EditButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: "",
        }
    }
    onChange =(event)=>{
        this.setState({input:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/process/update/'+this.props.id, {
            "description": this.state.input,
            "processNum": this.props.processNum,
        }).catch((error) => {});
        this.props.update();
    }

    //need sth to do cancel, should change to form instead?
    render(){
        return(
            <Dialog>
                <DialogContent>
                    <Typography>
                        Process Number: {this.props.proc.processNum}
                    </Typography>
                    <Typography>
                        Description
                    </Typography>
                    <TextField
                        label="Process Description"
                        value={this.props.proc.description}
                        disableUnderline
                        onChange={this.onChange}
                    />
                    <Button onClick={this.handleSubmit}>Submit</Button>
                    <Button>Cancel</Button>
                </DialogContent>
            </Dialog>
        )
    }
}

class Process extends Component {
    constructor(props){
        super(props);
    }

    handleDelete(){
        axios.post('/project/process/remove/'+this.props.id, {
            "processNum": this.props.processNum,
        })
        .catch((error) => {});
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
                <Typography variant="h6">{this.props.proc.description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column">
                    <List>
                        {this.props.proc.node.map(function(node, i){
                            return( 
                                <ListItem>
                                    <Node node={node} id={this.props.id} update={this.props.update} processNum={this.props.proc.processNum}/>
                                </ListItem>
                        )})}
                    </List>
                </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <EditButton/>
                <Button onClick={this.handleDelete}>Delete</Button>
            </AccordionActions>
        </Accordion>
      );
    }
}

class Process_List extends Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getData = this.getData.bind(this);
        this.renList = this.renList.bind(this);
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            proclist=[],
            input: "",
        }
    }
    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                proclist: res.data.project.process,
            });
        })
        .catch((error) => {});
    }
    renList() {
        return this.state.proclist.map(function(proc, i){
          return <Con_Items proc={proc} id={this.props.id} update={this.update()}/>
        });
    }

    update(){
        this.getData();
        this.renList();
    }

    onChange =(event)=>{
        this.setState({input:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/process/'+this.props.id, {
            "description": this.state.input,
            "processNum": this.state.proclist.length +1,
        }).catch((error) => {});
        this.setState({input:""});
        this.update();
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    Process
                </Typography>
                <Divider/>
                {renList()}
                <TextField
                    lable="Add description for new process"
                    onChange={this.onChange}
                    disableUnderline
                />
                <Button onClick={this.handleSubmit}>Add</Button>
            </Fragment>
        )
    }
}

class Node extends Component{
    constructor(props){
        super(props);
        this.OnChange = this.OnChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddNode = this.handleAddNode.bind(this);
        this.onChangeNew = this.onChangeNew.bind(this);
        this.state = {
            description: this.props.node.description,
            state: this.props.node.state,
            open: false,
            input: "",
        }
    }
    handleCancel = () =>{
        this.setState({
            open:false,
            description:this.props.node.description,
        })
    }
    handleOpen = () =>{
        this.setState({
            open:true,
        })
    }
    handleDelete(){
        axios.post('/project/process/node/remove/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
        })
        .catch((error) => {});
        this.props.update();
    };

    OnChange(event){
        this.setState({
            description: event.target.value,
        });
    }

    handleUpdate(event){
        axios.post('/project/process/node/update/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
            "description": this.state.description,
        })
        .catch((error) => {});
        this.props.update();
    };

    handleAddNode(){
        axios.post('/project/process/node/'+this.props.id, {
            "processNum": this.props.processNum,
            "description": this.state.input,
        })
        .catch((error) => {});
        this.props.update();
    }

    onChangeNew(event){
        this.setState({
            input:event.target.value,
        })
    }

    //adding box -> handleboxChecked

    render(){
        return(
            <Fragment>
                {!open ? (
                    <div>
                        <TextField
                            disabled
                            value={this.state.name}
                            disableUnderline
                        />
                        <IconButton>
                            <EditIcon onClick={this.handleOpen}/>
                            <DeleteIcon onClick={this.handleDelete}/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <TextField
                            onChange={this.onChange}
                            value={this.state.name}
                            disableUnderline
                        />
                        <IconButton>
                            <CheckIcon onClick={this.handleUpdate}/>
                            <ClearIcon onClick={this.handleCancel}/>
                        </IconButton>
                    </div>
                )}
                <TextField
                    label="Add new task"
                    disableUnderline
                    onChange={this.onChangeNew}
                />
                <Button onClick={this.handleAddNode}>Add</Button>
            </Fragment>
        )
    }
}
  
export default (Process_List);
