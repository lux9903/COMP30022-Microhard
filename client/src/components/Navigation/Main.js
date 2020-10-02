import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PrivateHome from './PrivateHome';
import Account from '../Account/Account';
import SignIn from '../Account/SignIn';
import ForgotPassword from '../Account/ForgotPassword';
import ResetPassword from '../Account/ResetPassword';
import Experience from '../Dashboard/Experience';
import Image from '../Dashboard/Photos/Image';
import Project from '../Dashboard/Project/ProjectList_edit';
import Project_Edit from '../Dashboard/Project/Project_Edit';
import Documents from '../Dashboard/Document/Documents';
import AddProfileContent from '../Sign Up/AddProfileContent';
import Course from '../Dashboard/Course/Course';
import NoMatch from '../NoMatch';

import Test from '../Dashboard/test';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={AddProfileContent} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />

        <PrivateHome exact path="/" authed={this.props.user} />
        <PrivateRoute
          exact
          path="/experiences"
          component={Experience}
          authed={this.props.user}
        />
        <PrivateRoute
          exact
          path="/project/:id"
          component={Project_Edit}
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
          component={Documents}
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
