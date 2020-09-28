import React, { Component, Fragment, useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


class Names extends Component{
    constructor(props) {
      super(props);

      this.componentDidMount = this.componentDidMount.bind(this);
      this.state = {
        name: "",
        open: false,
      };
    }

    //need to check with Luc to know what need to handling contributor add + remove +create
    //project id + contributor name???
    handleUpdate = (name) => {
        this.props.handleUpdate(name);
        this.handleCloseClick();
    };
    
    handleDelete = (name) => {
        this.props.handleDelete(name);
    }

    handleCloseClick = () => {
        //setOpen(false);
        this.setState({
            open: false
        });
    };
    
    handleEditClick = () => {
        this.setState({
            open: true
        });
    };

  
    componentDidMount = () =>{
        this.setState({
            name: this.props.name
        });
    }    
    render(){
        //const {option} = this.props;
        return(
            <Fragment>
            <Helmet>
                <title>Microhard &middot; Profile </title>
            </Helmet>

            {!this.state.open? (
                <div>
                    <Typography>
                        {this.state.name}
                    </Typography>
                    <IconButton onclick={this.handleEditClick}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
            ):(
                <Form name={this.state.name}
                    //handleCancle = {this.handleCloseClick}
                    //handleUpdate = {this.handleUpdate}
                ></Form>
            )}
            </Fragment>
        );
    }
}

  
export default (Names);