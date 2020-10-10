import React, { Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import axios from '../../../helpers/axiosConfig';
import {withStyles } from '@material-ui/core/styles';
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

class Con_List extends Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getData = this.getData.bind(this);
        this.renList = this.renList.bind(this);
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            conlist:[],
            input: "",
        }
    }
    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                conlist: res.data.project.contributors,
            });
            //alert(res.data.project.contributors);
        })
        .catch((error) => {});
    }

    renList = () =>{
        return (this.state.conlist.map((cons,i)=>{
            return <Con_Items contributor={cons} id={this.props.id} update={this.update}/>
        }));
    }

    update = () =>{
        this.getData();
        this.renList();
    }

    onChange =(event)=>{
        this.setState({input:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/add_people/'+this.props.id, {"new_users":[this.state.input]}).catch((error) => {});
        this.setState({input:""});
        this.update();
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    Contributors
                </Typography>
                <Divider/>
                {this.renList()}
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        label="Add new contributor"
                        onChange={this.onChange}
                        InputProps={{ disableUnderline: true }}
                        required
                        variant="outlined"
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Add
                    </Button>
                </form>
            </Fragment>
        )
    }
}

class Con_Items extends Component{
    constructor(props){
        super(props);
        this.OnChange = this.OnChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            name: this.props.contributor,
            open: false,
        }
    }
    handleCancel = () =>{
        this.setState({
            open:false,
            name:this.props.contributor,
        })
    }
    handleOpen = () =>{
        this.setState({
            open:true,
        })
    }
    handleDelete = () =>{
        axios.post('/project/remove_people/'+this.props.id, {"old_users":[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    OnChange = (event) =>{
        this.setState({
            name: event.target.value,
        });
    }

    handleUpdate = (event) => {
        axios.post('/project/remove_people/'+this.props.id, {"old_users":[this.props.contributor]})
        .catch((error) => {});
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
                        />
                        <IconButton onClick={this.handleOpen}>
                            <EditIcon  fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={this.handleDelete}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={this.handleUpdate} fullWidth>
                            <TextField
                                onChange={this.OnChange}
                                value={this.state.name}
                                InputProps={{ disableUnderline: true }}
                                variant="outlined"
                                required
                            />
                            <IconButton type="submit">
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={this.handleCancel} >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        </form>
                    </div>
                )}
            </Fragment>
        )
    }
}
  
export default (Con_List);