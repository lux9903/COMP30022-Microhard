import React, { Component, Fragment, useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import axios from '../../helpers/axiosConfig';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


class Edit_Form extends Component{
    constructor(props) {
      super(props);

      this.componentDidMount = this.componentDidMount.bind(this);
      this.state = {
        //if we given a props, then put in, else empty string
        input: !this.props.input ? "": this.props.input,
      };
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
          input: value
        });
    };

    handleSubmit = () => {
        //if there is initial input
        if(this.props.input){
            this.props.handleUpdate({input:this.state.input});
        }else{
            this.props.handleAdd({input:this.state.input});
        }
    }

    handleCancel = () => this.props.handleCancel();

    render(){
        return(
            <Fragment>
            <Helmet>
                <title>Microhard &middot; Edit Form</title>
            </Helmet>
                <form className={classes.container} onSubmit={handleSubmit} >
                    <TextField               
                        value={this.state.input}
                        onInput={(event) => this.handleChange(event)}
                    />
                    <Typography />
                    <IconButton onclick={this.handleSubmit}>
                        <DoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton onclick={this.handleCancel}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </form>
            </Fragment>
        );
    }
}

  
export default (Edit_Form);