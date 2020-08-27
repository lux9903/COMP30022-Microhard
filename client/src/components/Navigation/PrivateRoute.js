import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrimaryNav from './PrimaryNav';
import Footer from './Footer';
import { Fragment } from 'react';

export default function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authed !== null ? (
                    <Fragment>
                        <PrimaryNav />
                        <div className='main'>
                            <Component />
                        </div>
                        <Footer />
                    </Fragment>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/sign-in',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
