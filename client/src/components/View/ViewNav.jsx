import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../../components/Navigation/logo.png';
import Gravatar from 'react-gravatar';
import withStyles from '@material-ui/core/styles/withStyles';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import axios from '../../helpers/axiosConfig';

const styles = (theme) => ({
    button: {
        color: 'grey',
        margin: '0px 20px',
        textTransform: 'none',
    },
    logo: {
        maxHeight: '2.7rem',
        padding: '0px 10px',
        margin: '0px 20px',
    },
    buttonSection: {
        flex: '1',
        textAlign: 'center',
        marginLeft: '-43px',
    },
    appbar: {
        backgroundColor: '#F4F5F7',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    noDecoration: {
        textDecoration: 'none !important',
    },
});

// This is the navigation bar after a successful login
class ViewNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }/*
    componentDidMount() {
        const user_id = this.props.match.params.id

        const view_user = axios.get(`/view/${user_id}`).then((res) => {
            this.setState({data: res.data});
        })
    }*/
    render() {
        const {classes} = this.props;
        const {user} = this.props.user;
        const user_id = this.props.view_user.id;
        let content;

        return (
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to="/">
                        <Button>
                            <img src={logo} alt="Microhard" className={classes.logo} />
                        </Button>
                    </Link>
                    <div className={classes.buttonSection}>
                        <Link to={`/view/${user_id}`} className={classes.noDecoration}>
                            <Button className={classes.button}>Profile</Button>
                        </Link>
                        <Link to={`/view/${user_id}/course`} className={classes.noDecoration}>
                            <Button className={classes.button}>Course</Button>
                        </Link>
                        <Link to={`/view/${user_id}/experiences`} className={classes.noDecoration}>
                            <Button className={classes.button}>Experiences</Button>
                        </Link>
                        <Link to={`/view/${user_id}/project`} className={classes.noDecoration}>
                            <Button className={classes.button}>Projects</Button>
                        </Link>
                        <Link to={`/view/${user_id}/image`} className={classes.noDecoration}>
                            <Button className={classes.button}>Photos</Button>
                        </Link>
                        <Link exact={true} to={`/view/${user_id}/document`} className={classes.noDecoration}>
                            <Button className={classes.button}>Personal documents</Button>
                        </Link>
                    </div>
                    {content}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewNav));
