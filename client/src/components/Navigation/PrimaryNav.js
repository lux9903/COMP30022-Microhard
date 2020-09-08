import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/userAction';
import { Link, NavLink } from 'react-router-dom';
import {Dropdown } from 'react-bootstrap';
import logo from '../../components/Navigation/logo.png';
import Gravatar from 'react-gravatar';
import App from '../App';
import {AppBar, Toolbar, Button} from '@material-ui/core';

// This is the navigation bar after a successful login
class PrimaryNav extends Component {
    render() {
        const { user } = this.props.user;

        let content;

        const signOut = (e) => {
            e.preventDefault();
            this.props.dispatch(signOutUser());
        };

        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <a
                className='dropdown-toggle nav-link'
                href='/'
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}>
                {children}
            </a>
        ));

        if (user == null) {
            content = (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='btn btn-primary'>
                            Sign up
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/sign-in' className='btn btn-outline-primary'>
                            Sign in
                        </Link>
                    </li>
                </Fragment>
            );
        } else {
            content = (
                <Fragment>
                    <Dropdown alignRight>
                        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                            <Gravatar email={user.email} size={32} className='nav-avatar' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to='/account' className='dropdown-item'>
                                Account
                            </Link>
                            <a href='/' onClick={signOut} className='dropdown-item'>
                                Sign out
                            </a>
                        </Dropdown.Menu>
                    </Dropdown>
                </Fragment>
            );
        }

        return (
          <AppBar
            position="sticky"
            style={{backgroundColor: '#F4F5F7'}}
          >
            <Toolbar>
              <Link to='/'>
                <img src={logo} alt='Microhard' style={{maxHeight: '2.7rem', padding: '0px 10px', margin: '10px 20px'}}/>
              </Link>
              <div style={{flex: '1', textAlign: 'center'}} >
                <Link exact={true} to='/'>
                  <Button style={{color: 'grey', margin: '0px 20px'}}>Profile</Button>
                </Link>
                <Link to='/plan'>
                  <Button style={{color: 'grey', margin: '0px 20px'}}>Training Plan</Button>
                </Link>
                <Link to='/image'>
                  <Button style={{color: 'grey', margin: '0px 20px'}}>Upload Image</Button>
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

export default connect(mapStateToProps)(PrimaryNav);
