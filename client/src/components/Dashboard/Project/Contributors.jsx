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
            conlist=[],
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
        })
        .catch((error) => {});
    }
    renList() {
        return this.state.conlist.map(function(cons, i){
          return <Con_Items contributor={cons} id={this.props.id} update={this.update()}/>
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
                {renList()}
                <TextField
                    lable="Add new contributor"
                    onChange={this.onChange}
                    disableUnderline
                />
                <Button onClick={this.handleSubmit}>Add</Button>
            </Fragment>
        )
    }
}

class Con_Items extends Component{
    constructor(props){
        super(props);
        this.OnChange = this.OnChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        })
    }
    handleOpen = () =>{
        this.setState({
            open:true,
        })
    }
    handleDelete(){
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    OnChange(event){
        this.setState({
            name: event.target.value,
        });
    }

    handleUpdate(event){
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        axios.post('/project/add_people/'+this.props.id, {'new_users':[this.state.name]})
        .catch((error) => {});
        //do i have to set state again if i gonna renderlist again?
        this.props.update();
    };

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
            </Fragment>
        )
    }
}
  
export default (Con_List);