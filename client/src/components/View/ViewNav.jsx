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
import Typography from '@material-ui/core/Typography';
import {signOutUser} from '../../actions/userAction';

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
    }
    render() {
        const {classes} = this.props;
        const {user} = this.props.user;
        console.log(user);
        const signOut = (e) => {
            e.preventDefault();
            window.location.reload(false);
            this.props.dispatch(signOutUser());
        };

        let content;

        if (!user) {
            content =
            <div>
                <Button
                    component={Link}
                    to="/sign-in"
                    className={classes.greyText}
                    href="#outlined-buttons"
                    style={{margin: '0px 10px 0px 5px'}}
                >
                    Sign in
                </Button>

                <Button
                    component={Link}
                    to="/sign-up"
                    variant="outlined"
                    color={'primary'}
                    href="#outlined-buttons"
                >
                    Join now
                </Button>
            </div>
        } else {
            content =
            <div>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Gravatar
                                    email={user.email}
                                    size={32}
                                    className="nav-avatar"
                                    {...bindTrigger(popupState)}
                                />
                            </IconButton>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <MenuItem component={Link} to="/account">
                                    Account
                                </MenuItem>
                                <MenuItem href="/" onClick={signOut}>
                                    Sign out
                                </MenuItem>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>
        }
        const user_id = this.props.view_user.id;

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
