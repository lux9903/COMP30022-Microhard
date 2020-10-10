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
            proclist:[],
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
            //alert(res.data.project.process);
            //alert(res.data.project.process.length);
        })
        .catch((error) => {});
    }

    renList = () => {
        return (this.state.proclist.map((proc,i)=>{
            return <Process process={proc} id={this.props.id} update={this.update} fullWidth/>
        }));
    }

    update = () =>{
        this.getData();
        this.renList();
    }

    onChange = (event) =>{
        event.preventDefault();
        this.setState({input:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/process/'+ this.props.id, {
            "process": {
            "description": this.state.input,
            "processNum": (this.state.proclist.length + 1),
            "status": true
        }})
        //.then(alert(this.state.proclist.length + 1))
        .catch((error) => {});
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
                {this.renList()}
                <form onSubmit= {this.handleSubmit}>
                    <TextField
                        label="Add description for new process"
                        onChange={this.onChange}
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

class Process extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange =this.onChange.bind(this);
        this.state = {
            input: "",
        }
    }

    handleDelete = () => {
        axios.post('/project/process/remove/'+this.props.id, {
            "processNum": this.props.process.processNum,
        })
        .catch((error) => {});
        this.props.update();
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            input: event.target.value,
        })
    }

    handleSubmit = () => {
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
                        {this.props.process.nodes.map((node, i)=>{
                            return( 
                                <ListItem>
                                    <Node node={node} id={this.props.id} update={this.props.update} processNum={this.props.process.processNum}/>
                                </ListItem>
                        )})}
                    </List>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label="Add new task"
                            InputProps={{ disableUnderline: true }}
                            onChange={this.onChange}
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
                <Button onClick={this.handleDelete}>Delete</Button>
            </AccordionActions>
        </Accordion>
      );
    }
}

class EditButton extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            description: this.props.process.description,
            open: false,
        }
    }
    onChange = (event) => {
        event.preventDefault();
        this.setState({description:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/process/update/'+this.props.id, {
            'description': this.state.description,
            'processNum': this.props.process.processNum
        })
        .then(this.props.update())
        //.then(alert(this.props.process.processNum))
        .catch((error) => {});
        //this.props.update();
    }

    handleCancel = () => {
        this.setState({
            open:false,
            description:this.props.process.description,
        });
    }

    handleOpen = () => {
        this.setState({open:true});
    }

    //need sth to do cancel, should change to form instead?
    render(){
        return(
            <Fragment>
            {(!this.state.open) ? (
                <Button onClick={this.handleOpen}>Edit</Button>
            ) : (
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCancel}
                    closeAfterTransition
                >
                    <DialogContent>
                        <form onSubmit={this.handleSubmit} fullWidth>
                            <Typography>
                                Process Number: {this.props.process.processNum}
                            </Typography>
                            <Typography>
                                Description
                            </Typography>
                            <TextField
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                onChange={this.onChange}
                                required
                                fullWidth
                                multiline
                                variant="outlined"
                            />
                            <Button type="submit">Submit</Button>
                            <Button onClick={this.handleCancel}>Cancel</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )} 
            </Fragment>
        )
    }
}

class Node extends Component{
    constructor(props){
        super(props);
        this.OnChange = this.OnChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            description: this.props.node.description,
            state: this.props.node.state,
            open: false,
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
    handleDelete = () =>{
        axios.post('/project/process/node/remove/'+this.props.id, {
            "processNum": this.props.processNum,
            "nodeIndex" : this.props.node.nodeIndex,
        })
        .catch((error) => {});
        this.props.update();
    };

    OnChange = (event) => {
        event.preventDefault();
        this.setState({
            description: event.target.value,
        });
    }

    handleUpdate = (event) => {
        event.preventDefault();
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
                        <IconButton onClick={this.handleOpen}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={this.handleDelete}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={this.handleUpdate}>
                            <TextField
                                onChange={this.onChange}
                                value={this.state.description}
                                InputProps={{ disableUnderline: true }}
                                multiline
                                required
                                variant="outlined"
                            />
                            <IconButton type="submit">
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleCancel}>
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
