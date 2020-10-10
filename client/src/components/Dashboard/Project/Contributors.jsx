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
        this.getContributor = this.getContributor.bind(this);
        this.renContributorList = this.renContributorList.bind(this);
        this.updateContributor = this.updateContributor.bind(this);
        this.onInputContributor = this.onInputContributor.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);
        this.state = {
            conlist:[],
            input: "",
        }
    }
    componentDidMount = () =>{
        this.getContributor();
    }

    getContributor = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                conlist: res.data.project.contributors,
            });
            //alert(res.data.project.contributors);
        })
        .catch((error) => {});
    }

    renContributorList = () =>{
        return (this.state.conlist && this.state.conlist.map((cons,i)=>{
            return <Con_Items contributor={cons} id={this.props.id} update={this.updateContributor}/>
        }));
    }

    updateContributor = () =>{
        this.getContributor();
        this.renContributorList();
    }

    onInputContributor =(event)=>{
        this.setState({input:event.target.value});
    }

    handleContributorSubmit = () =>{
        axios.post('/project/add_people/'+this.props.id, {"new_users":[this.state.input]}).catch((error) => {});
        this.setState({input:""});
        this.updateContributor();
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    Contributors
                </Typography>
                <Divider/>
                {this.renContributorList()}
                <form onSubmit={this.handleContributorSubmit} >
                    <TextField
                        label="Add new contributor"
                        onChange={this.onInputContributor}
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
}
  
export default (Con_List);