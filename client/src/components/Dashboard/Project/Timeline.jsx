import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import {Helmet} from 'react-helmet';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import CardActions from '@material-ui/core/CardActions';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import {Formik, Field, Form} from 'formik';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ClearIcon from '@material-ui/icons/Clear';



class Timeline_List extends Component{
    constructor(props) {
      super(props);
      this.state = {
        timeline = [],
        date: "",
        description: "",
      };
    }

    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                timeline: res.data.project.timeline,
            });
        })
        .catch((error) => {});
    }
    renList() {
        return this.state.conlist.map(function(each, i){
          return <Timeline_Items each={each} id={this.props.id} update={this.update()}/>
        });
    }

    update(){
        this.getData();
        this.renList();
    }

    onChangeDate =(event)=>{
        this.setState({date:event.target.value});
    }

    onChangeDesc = (event) =>{
        this.setState({description:event.target.value});
    }

    handleSubmit = () =>{
        axios.post('/project/timeline/'+this.props.id, {
            "date": this.state.date,
            "description":this.state.description,
        }).catch((error) => {});
        this.setState({date:"",description:""});
        this.update();
    }
    
    render(){
        return(
            <Fragment>
                <Typography>
                    Timeline
                </Typography>
                <Divider/>
                {this.renList}
                <DateField
                    lable="Add new contributor"
                    onChange={this.onChangeDate}
                />
                <TextField
                    lable="Add new contributor"
                    onChange={this.onChangeDesc}
                    disableUnderline
                />
                <Button onClick={this.handleSubmit}>Add</Button>
            </Fragment>
        );
    }
}


class Timeline_Items extends Component{
    constructor(props){
        super(props);
        this.OnChange = this.OnChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            description: this.props.each.description,
            date: this.props.each.each.date,
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

    OnChangeDate(event){
        this.setState({
            date: event.target.value,
        });
    }

    OnChangeDesc(event){
        this.setState({
            description: event.target.value,
        });
    }

    handleDelete(){
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    handleUpdate(event){
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    render(){
        return(
            <Fragment>
                {!open ? (
                    <div>
                        <TextField
                            disabled
                            value={this.state.date}
                            disableUnderline
                            type="date"
                        />
                        <TextField
                            disabled
                            value={this.state.description}
                            disableUnderline
                            type="date"
                        />
                        <Divider/>
                        <IconButton>
                            <EditIcon onClick={this.handleOpen}/>
                            <DeleteIcon onClick={this.handleDelete}/>
                        </IconButton>
                    </div>
                ) : (
                    <div>
                        <TextField
                            onChange={this.onChangeDate}
                            value={this.state.date}
                            disableUnderline
                            type="date"
                        />
                        <TextField
                            onChange={this.onChangeDesc}
                            value={this.state.description}
                            disableUnderline
                            type="date"
                        />
                        <Divider/>
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

export default (Timeline_List);

