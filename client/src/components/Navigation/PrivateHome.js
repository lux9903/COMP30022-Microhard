import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Profile from '../Dashboard/Profile';
import HomePage from '../Home/HomePage';
import PrimaryNav from './PrimaryNav';
import Footer from './Footer';

export default function PrivateRoute({authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={() =>
        authed !== null ? (
          <Fragment>
            <PrimaryNav />
            <div className="main">
              <Profile />
            </div>
            <Footer />
          </Fragment>
        ) : (
          <HomePage />
        )
      }
    />
  );
}
