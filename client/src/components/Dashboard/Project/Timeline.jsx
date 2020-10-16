import React, { Component, Fragment} from 'react';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';

class Timeline_List extends Component{
    constructor(props) {
      super(props);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.updateTimeline = this.updateTimeline.bind(this);
      this.getTimeline = this.getTimeline.bind(this);
      this.renTimelineList = this.renTimelineList.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeDesc = this.onChangeDesc.bind(this);
      this.handleAddTimelineSubmit = this.handleAddTimelineSubmit.bind(this);
      this.handleAddTimelineOpen = this.handleAddTimelineOpen.bind(this);
      this.handleAddTimelineCancel = this.handleAddTimelineCancel.bind(this);
      this.state = {
        timeline: [],
        date: "",
        description: "",
        open: false,
      };
    }

    componentDidMount = () =>{
        this.getTimeline();
    }

    getTimeline = () => {
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                timeline: res.data.project.timeline,
            });
        })
        .catch((error) => {});
    }

    renTimelineList = () => {
        return (this.state.timeline && this.state.timeline.map((each, i)=>{
          return <Timeline_Items each={each} id={this.props.id} update={this.updateTimeline}/>
        }));
    }

    updateTimeline = () => {
        //alert("updating");
        this.getTimeline();
        this.renTimelineList();
    }

    onChangeDate = (event) => {
        this.setState({date:event.target.value});
    }

    onChangeDesc = (event) => {
        this.setState({description:event.target.value});
    }

    handleAddTimelineOpen = () => {
        this.setState({open:true});
    }

    handleAddTimelineCancel = () => {
        this.setState({
            open:false,
            input: "",
        });
    }

    handleAddTimelineSubmit = (event) =>{
        event.preventDefault();
        this.setState({open:false});
        axios.post('/project/timeline/'+this.props.id, {
            "time": this.state.date,
            "description":this.state.description,
        }).catch((error) => {});
        this.setState({date:"",description:""});
        this.updateTimeline();
    }
    
    render(){
        return(
            <Fragment>
                <Typography>
                    Timeline
                </Typography>
                <Divider/>
                <Timeline>
                    {this.renTimelineList()}
                </Timeline>
                {!this.state.open ? (
                    <Button 
                        onClick={this.handleAddTimelineOpen}
                        fullWidth
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        Add new event
                    </Button>
                ) : (
                    <form onSubmit={this.handleAddTimelineSubmit}>
                        <TextField
                            lable="Add new contributor"
                            onChange={this.onChangeDate}
                            type="date"
                            required
                        />
                        <TextField
                            lable="Add new contributor"
                            onChange={this.onChangeDesc}
                            disableUnderline
                            required
                        />
                        <IconButton type="submit">
                            <CheckIcon fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={this.handleAddTimelineCancel} >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    </form>
                )}
            </Fragment>
        );
    }
}


class Timeline_Items extends Component{
    constructor(props){
        super(props);
        this.handleTimelineCancel = this.handleTimelineCancel.bind(this);
        this.handleTimelineOpen = this.handleTimelineOpen.bind(this);
        this.handleTimelineUpdate = this.handleTimelineUpdate.bind(this);
        this.handleTimelineDelete = this.handleTimelineDelete.bind(this);
        this.OnChangeDateUpdate = this.OnChangeDateUpdate.bind(this);
        this.OnChangeDescUpdate = this.OnChangeDescUpdate.bind(this);
        this.state = {
            description: this.props.each.description,
            date: this.props.each.time,
            open: false,
        }
    }
    handleTimelineCancel = () =>{
        this.setState({
            open:false,
        })
    }
    handleTimelineOpen = () =>{
        this.setState({
            open:true,
        })
    }

    OnChangeDateUpdate = (event) => {
        this.setState({
            date: event.target.value,
        });
    }

    OnChangeDescUpdate = (event) => {
        this.setState({
            description: event.target.value,
        });
    }

    handleTimelineDelete = () => {
        axios.post('/project/timeline/remove/'+this.props.id, {
            "index":this.props.each.index,
        })
        .catch((error) => {});
        this.props.update();
    };

    handleTimelineUpdate = (event) => {
        event.preventDefault();
        this.setState({open:false});
        axios.post('/project/timeline/update/'+this.props.id, {
            "time":this.state.date,
            "description":this.state.description,
            "index":this.props.each.index,
        })
        .catch((error) => {});
        this.props.update();
    };

    render(){
        return(
            <Fragment>
                <TimelineItem align="left">
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Card>
                            <CardContent>
                                {!this.state.open ? (
                                    <div>
                                        <TextField
                                            disabled
                                            value={this.state.date}
                                            InputProps={{ disableUnderline: true }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Divider/>
                                        <TextField
                                            disabled
                                            value={this.state.description}
                                            InputProps={{ disableUnderline: true }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <IconButton onClick={this.handleTimelineOpen}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton onClick={this.handleTimelineDelete} >
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </div>
                                ) : (
                                    <form onSubmit={this.handleTimelineUpdate}>
                                        <TextField
                                            onChange={this.OnChangeDateUpdate}
                                            value={this.state.date}
                                            InputProps={{ disableUnderline: true }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Divider/>
                                        <TextField
                                            onChange={this.OnChangeDescUpdate}
                                            value={this.state.description}
                                            InputProps={{ disableUnderline: true }}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <IconButton type="submit">
                                            <CheckIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton onClick={this.handleTimelineCancel} >
                                            <ClearIcon fontSize="small"/>
                                        </IconButton>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </TimelineContent>
                </TimelineItem>
            </Fragment>
        )
    }
}

export default (Timeline_List);

