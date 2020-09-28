import React, { Component, Fragment, useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


class Description extends Component{
    constructor(props) {
      super(props);

      this.componentDidMount = this.componentDidMount.bind(this);
      this.state = {
        description: "",
        open: false,
      };
    }

    //need to check with Luc to know what need to handling contributor add + remove +create
    //project id + contributor description???
    handleUpdate = (description) => {
        this.props.handleUpdate(description);
        this.handleCloseClick();
    };
    
    handleDelete = (description) => {
        this.props.handleDelete(description);
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
            description: this.props.description
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
                        {this.state.description}
                    </Typography>
                    <IconButton onclick={this.handleEditClick}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
            ):(
                <Form description={this.state.description}
                    //handleCancle = {this.handleCloseClick}
                    //handleUpdate = {this.handleUpdate}
                ></Form>
            )}
            </Fragment>
        );
    }
}

  
export default (Description);