import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PrivateHome from './PrivateHome';
import Account from '../Account/Account';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import ForgotPassword from '../Account/ForgotPassword';
import ResetPassword from '../Account/ResetPassword';
import Experience from '../Dashboard/Experience';
import Image from '../Dashboard/Image';
import Project from '../Dashboard/Project/Project';
import Projectex from '../Dashboard/Project/Project_example';
import Document from '../Dashboard/Document/Document';
import Course from '../Dashboard/Course/Course';
import ProfileStepper from '../Dashboard/Profile/ProfileStepper';
import NoMatch from '../NoMatch';
import View from  '../View/view'
import ViewImage from '../View/ViewImage'
import ViewDocument from '../View/ViewDocument'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route exact path ="/view/:id" component = {View} />
        <Route exact path ="/view/:id/image" component = {ViewImage} />
        <Route exact path ="/view/:id/document" component = {ViewDocument} />


        <PrivateHome exact path="/" authed={this.props.user} />
        <PrivateRoute
          exact
          path="/experiences"
          component={Experience}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/projectex"
          component={Projectex}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/editprofile"
          component={ProfileStepper}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/project"
          component={Project}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/image"
          component={Image}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/document"
          component={Document}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/account"
          component={Account}
          authed={this.props.user}
        />

        <PrivateRoute
          exact
          path="/course"
          component={Course}
          authed={this.props.user}
        />


        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({user: state.user.user});
export default connect(mapStateToProps)(Main);
