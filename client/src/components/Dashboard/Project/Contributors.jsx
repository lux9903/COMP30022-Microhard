import React, { Component, Fragment, useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from '../../../helpers/axiosConfig';
class Con_Items extends Component{
    constructor(props){
        super(props);
        this.handleContributorDelete = this.handleContributorDelete.bind(this);
        this.handleContributorOnChange = this.handleContributorOnChange.bind(this);
        this.handleContributorUpdate = this.handleContributorUpdate.bind(this);
        this.state = {
            prev: this.props.name,
            name: this.props.name,
        }
    }
    handleContributorDelete(){
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.state.name]})
        .catch((error) => {});
        //this.props.update();
    };

    handleContributorOnChange(event){
        this.setState({
            name: event.target.value,
        });
    }

    handleContributorUpdate(event){
        axios.post('/project/remove_people/'+this.props.match.params.id, {'old_users':[this.state.prev]})
        .catch((error) => {});
        axios.post('/project/add_people/'+this.props.match.params.id, {'new_users':[this.state.name]}).catch((error) => {});
        this.setState({
            prev: event.target.value,
            name: event.target.value,
        });
        //this.props.update();
    };

    render(){
        return(
            <ListItem>
                <ListItemText primary={this.state.name}/>
                <IconButton>
                    <DeleteIcon onClick={this.handleContributorDelete}/>
                </IconButton>
            </ListItem>
        )
    }
}

  
export default (Con_Items);