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
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';

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
      this.state = {
        timeline = [],
        date: "",
        description: "",
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
        return this.state.conlist.map((each, i)=>{
          return <Timeline_Items each={each} id={this.props.id} update={this.updateTimeline}/>
        });
    }

    updateTimeline = () => {
        this.getTimeline();
        this.renTimelineList();
    }

    onChangeDate = (event) => {
        this.setState({date:event.target.value});
    }

    onChangeDesc = (event) => {
        this.setState({description:event.target.value});
    }

    handleAddTimelineSubmit = () =>{
        axios.post('/project/timeline/'+this.props.id, {
            "date": this.state.date,
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
                {this.renTimelineList()}
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
                    <Button type="submit">Add New Timeline</Button>
                </form>
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
            date: this.props.each.each.date,
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
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    handleTimelineUpdate = (event) => {
        axios.post('/project/remove_people/'+this.props.id, {'old_users':[this.props.contributor]})
        .catch((error) => {});
        this.props.update();
    };

    render(){
        return(
            <Fragment>
            </Fragment>
        )
    }
}

export default (Timeline_List);

