import React, { Component, Fragment, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
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

import Grid from '@material-ui/core/Grid';

import {
    createTimeline,
    updateTimeline,
    deleteTimeline,
} from '../../../actions/projectAction';


import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    oppositeContent:{
      flex: 0,
    },
    textfield:{
        margin: theme.spacing(1),
        underline: "none",
    },
}));

const styles = (theme) => ({
    textfield:{
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width:"auto",
        underline: "none",
    },
    progress: {
        marginTop: theme.spacing(2),
        marginBottom:theme.spacing(2),
    },
    root: {
        width: "100%",
    }
});

class Timeline_List extends Component{
    constructor(props) {
      super(props);
      this.updateTimeline = this.updateTimeline.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeDesc = this.onChangeDesc.bind(this);
      this.updateTimeline = this.updateTimeline.bind(this);
      this.deleteTimeline = this.deleteTimeline.bind(this);
      this.handleAddTimelineSubmit = this.handleAddTimelineSubmit.bind(this);
      this.handleAddTimelineOpen = this.handleAddTimelineOpen.bind(this);
      this.handleAddTimelineCancel = this.handleAddTimelineCancel.bind(this);
      this.state = {
        date: "",
        description: "",
        open: false,
      };
    }

    deleteTimeline = (form) => {
        this.props.dispatch(deleteTimeline(form, this.props.id));
    }

    updateTimeline = (form) => {
        this.props.dispatch(updateTimeline(form, this.props.id));
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
        let formD = {
            'time': {
				'year':parseInt(this.state.date.slice(0,4)),
				'month':parseInt(this.state.date.slice(5,7)),
                'day':parseInt(this.state.date.slice(8,10)),
                'hr':0,
				'min':0,
				'sec':0,
				'minsec':0
            },
            "description":this.state.description
        }
        this.setState({date: "", open:false, description: ""});
        this.props.dispatch(createTimeline(formD, this.props.id));
    }
    
    render(){
        const {classes} = this.props;

        const {error, isUpdatingTime, project} = this.props.project;
        let content;
        if (error) {
            content = <Alert severity="error">{error}</Alert>;
        } else if (isUpdatingTime) {
            content = (
                <Grid container justify="center" className={classes.root}>
                    <CircularProgress color="primary" className={classes.progress}/>
                </Grid>
            );
        } else if (!project || !project.timeline) {
            content = (
                <Typography> The retrieve project not found.</Typography>
            );
        } else {
            const list = project.timeline.map((each) => (
                <TimeLineItems each={each} id={this.props.id} delete={this.deleteTimeline} update={this.updateTimeline}/>
            ));
            content = <Timeline>{list}</Timeline>;
        }
        return(
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    Timeline
                </Typography>
                <Divider/>
                {content}
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
                        <Grid container justify="space-evenly" alignItems="center">
                            <TextField
                                label="Add date"
                                onChange={this.onChangeDate}
                                type="date"
                                required
                                className={classes.textfield}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="Add description"
                                onChange={this.onChangeDesc}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textfield}
                                variant="outlined"
                                size="small"
                            />
                            <IconButton type="submit">
                                <CheckIcon fontSize="small" color="primary"/>
                            </IconButton>
                            <IconButton onClick={this.handleAddTimelineCancel} >
                                <ClearIcon fontSize="small" style={{ color: "red" }}/>
                            </IconButton>
                        </Grid>
                    </form>
                )}
            </Fragment>
        );
    }
}

function TimeLineItems(props){
    const [description, setDescription] = useState(props.each.description);
    const [date,setDate] = useState(props.each.time.slice(0,10));
    const [open,setOpen] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
        setDescription(props.each.description);
        setDate(props.each.time.slice(0,10));
    }, [props.each]);

    const handleTimelineCancel = () =>{
        setOpen(false);
    }
    const handleTimelineOpen = () =>{
        setOpen(true);
    }

    const OnChangeDateUpdate = (event) => {
        setDate(event.target.value);
    }

    const OnChangeDescUpdate = (event) => {
        setDescription(event.target.value);
    }

    const handleTimelineDelete = () => {
        let formD = {"index":props.each.index}
        props.delete(formD);
    };

    const handleTimelineUpdate = (event) => {
        event.preventDefault();
        setOpen(false);
        let formD = {
            'time': {
				'year':parseInt(date.slice(0,4)),
				'month':parseInt(date.slice(5,7)),
                'day':parseInt(date.slice(8,10)),
            },
            "description": description,
            "index":props.each.index,
        }
        props.update(formD);
    };
    return(
        <Fragment>
            <TimelineItem align="left">
                <TimelineSeparator>
                    <TimelineDot color="primary"/>
                    <TimelineConnector color="primary"/>
                </TimelineSeparator>
                <TimelineOppositeContent className={classes.oppositeContent}/>
                <TimelineContent>
                    <Card>
                        <CardContent>
                            {!open ? (
                                <Grid container justify="flex-end" alignItems="center">
                                    <TextField
                                        disabled
                                        value={date}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        className={classes.textfield}
                                    />
                                    <TextField
                                        disabled
                                        value={description}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        className={classes.textfield}
                                    />
                                    <IconButton onClick={handleTimelineOpen}>
                                        <EditIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={handleTimelineDelete} >
                                        <DeleteIcon fontSize="small" style={{ color: "red" }}/>
                                    </IconButton>
                                </Grid>
                            ) : (
                                <form onSubmit={handleTimelineUpdate}>
                                    <Grid container justify="flex-end" alignItems="center">
                                        <TextField
                                            onChange={OnChangeDateUpdate}
                                            value={date}
                                            variant="outlined"
                                            size="small"
                                            type="date"
                                            fullWidth
                                            className={classes.textfield}
                                        />
                                        <TextField
                                            onChange={OnChangeDescUpdate}
                                            value={description}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            className={classes.textfield}
                                        />
                                        <IconButton type="submit">
                                            <CheckIcon fontSize="small" color="primary"/>
                                        </IconButton>
                                        <IconButton onClick={handleTimelineCancel} >
                                            <ClearIcon fontSize="small" style={{ color: "red" }}/>
                                        </IconButton>
                                    </Grid>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </TimelineContent>
            </TimelineItem>
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    ...state,
});
export default connect(mapStateToProps)(withStyles(styles)(Timeline_List));