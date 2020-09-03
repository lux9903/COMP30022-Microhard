import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../Navigation/PrivateRoute';
import PrivateHome from '../Navigation/PrivateHome';
import Account from '../Account/Account';
import NoMatch from '../Navigation/NoMatch';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import ForgotPassword from '../Account/ForgotPassword';
import ResetPassword from '../Account/ResetPassword';
import Plan from '../Home/Plan';
import Image from '../Home/Image';

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-up' component={SignUp} />
                <Route exact path='/forgot-password' component={ForgotPassword} />
                <Route exact path='/reset-password/:token' component={ResetPassword} />

                <PrivateHome exact path='/' authed={this.props.user} />
                <PrivateRoute exact path='/plan' component={Plan} authed={this.props.user} />
                <PrivateRoute exact path='/image' component={Image} authed={this.props.user} />
                <PrivateRoute exact path='/account' component={Account} authed={this.props.user} />

                <Route component={NoMatch} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.user.user });
export default connect(mapStateToProps)(Main);
