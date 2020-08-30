import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Home/Welcome'
import Home from '../Home/Home';
import PrimaryNav from './PrimaryNav';
import Footer from './Footer';

export default function PrivateRoute({ authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                authed !== null ? (
                    <Fragment>
                        <PrimaryNav />
                        <div className='main'>
                            <Welcome />
                        </div>
                        <Footer />
                    </Fragment>
                ) : (
                    <Home />
                )
            }
        />
    );
}
