import React, { Component, Fragment } from 'react';
import axios from '../../../helpers/axiosConfig';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';


class Status extends Component{
    constructor(props) {
      super(props);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.getStatus = this.getStatus.bind(this);
      this.handleStatOpen = this.handleStatOpen.bind(this);
      this.handleStatClose = this.handleStatClose.bind(this);
      this.handleShowOpen = this.handleShowOpen.bind(this);
      this.handleShowClose = this.handleShowClose.bind(this);
      this.handleShowStatusChange = this.handleShowStatusChange.bind(this);
      this.handleStatusChange = this.handleStatusChange.bind(this);
      this.state = {
        status: "",
        show_status: "",
        open_stat: false,
        open_show: false,
      };
    }
    componentDidMount = () =>{
        this.getStatus();
    }

    getStatus = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                status: res.data.project.status,
                show_status: res.data.project.show_status,
            });
        })
        .catch((error) => {});
    }

    handleStatusChange = event => {
        axios.post('/project/update/'+this.props.id, {"status":event.target.value}).catch((error) => {});
        this.setState({
            status:event.target.value,
            open_stat:false,
        })
    };

    handleShowStatusChange = event => {
        axios.post('/project/update/'+this.props.id, {"show_status":event.target.value}).catch((error) => {});
        this.setState({
            show_status:event.target.value,
            open_show:false,
        })
    };

    handleStatClose = () =>{
        this.setState({
            open_stat:false,
        })
    }

    handleShowClose = () =>{
        this.setState({
            open_show:false,
        })
    }
    
    handleStatOpen = () =>{
        this.setState({
            open_stat:true,
        })
    }
    handleShowOpen = () =>{
        this.setState({
            open_show:true,
        })
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    Status
                </Typography>
                <Divider/>
                <Typography>
                    Progress Status
                </Typography>
                <FormControl>
                    <Select
                        disableUnderline
                        open={this.state.open}
                        onClose={this.handleStatClose}
                        onOpen={this.handleStatOpen}
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                    >
                        <MenuItem value={"Inprogress"}>In Progress</MenuItem>
                        <MenuItem value={"Completed"}>Complete</MenuItem>
                        <MenuItem value={"Cancel"}>Cancel</MenuItem>
                    </Select>
                </FormControl>
                <Typography>
                    Show Status
                </Typography>
                <FormControl>
                    <Select
                        disableUnderline
                        open={this.state.open}
                        onClose={this.handleShowClose}
                        onOpen={this.handleShowOpen}
                        value={this.state.show_status}
                        onChange={this.handleShowStatusChange}
                    >
                        <MenuItem value={"public"}>Public</MenuItem>
                        <MenuItem value={"private"}>Private</MenuItem>
                    </Select>
                </FormControl>
            </Fragment>
        );
    }
}

export default (Status);

