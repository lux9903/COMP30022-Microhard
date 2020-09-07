import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/userAction';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logo from '../../img/logo.PNG';
import Gravatar from 'react-gravatar';

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
            <Navbar bg='light' expand='lg' className='bg-white'>
                <Link to='/' className='navbar-brand'>
                    <img src={logo} alt='Microhard' className='nav-logo' />
                    <div className='sr-only'>Microhard</div>
                </Link>

                <div className='navbar-wrap'>
                    <Nav className='mx-auto'>
                        <NavLink exact={true} to='/' className='nav-link' activeClassName='active'>
                            <span>Profile</span>
                        </NavLink>

                        <NavLink to='/plan' className='nav-link' activeClassName='active'>
                            <span>Traning Plan</span>
                        </NavLink>

                        <NavLink to='/image' className='nav-link' activeClassName='active'>
                            <span>Upload Image</span>
                        </NavLink>

                    </Nav>

                    {content}
                </div>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(PrimaryNav);
