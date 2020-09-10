import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Home} from 'react-feather';

export default function Footer(props) {
    return (
        <footer className='footer'>
            <nav className='footer-nav'>
                <div className='footer-item'>
                    <NavLink exact={true} to='/' className='footer-link' activeClassName='active'>
                        <Home />
                        <span>Profile</span>
                    </NavLink>
                </div>

                <div className='footer-item'>
                    <NavLink to='/account' className='footer-link' activeClassName='active'>
                        <User />
                        <span>Account</span>
                    </NavLink>
                </div>
            </nav>
        </footer>
    );
}
