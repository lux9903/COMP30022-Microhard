import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


class General_Info extends Component{
    constructor(props) {
      super(props);
      this.getData = this.getData.bind(this);
      this.onChangeDesc = this.onChangeDesc.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        name: "",
        description: "",
      };
    }

    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                name: res.data.project.name,
                description: res.data.project.description,
            });
        })
        .catch((error) => {});
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    onChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    handleSubmit = () =>{
        axios.post('/project/update/'+ this.props.id, {"name":this.state.name, "description": this.state.description})
        .catch((error) => {});
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    General Information
                </Typography>
                <Divider/>
                <Typography>
                    Name
                </Typography>
                <TextField 
                    value={this.state.name}
                    onChange={this.onChangeName}
                    fullWidth
                />
                <Typography>
                    Description
                </Typography>
                <TextField 
                    value={this.state.description}
                    onChange={this.onChangeDesc}
                    fullWidth
                    multiline
                />
                <Button
                    fullWidth
                    onClick={this.handleSubmit}
                    size="small"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </Fragment>
        )
    }
}

export default (General_Info);