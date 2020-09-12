import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateUser, deleteUser, resetPassword} from '../../actions/userAction';
import {Helmet} from 'react-helmet';
import {
  CircularProgress,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import * as Yup from 'yup';
import withStyles from '@material-ui/core/styles/withStyles';

const validationSchema = Yup.object().shape({
  lastname: Yup.string().required('*Lastname is required'),
  firstname: Yup.string().required('*Firstname is required'),
  username: Yup.string().required('*Username is required'),
  email: Yup.string().email().required('*Email is required'),
  bio: Yup.string(),
});

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Account extends Component {
  render() {
    const {classes} = this.props;
    const {error, isAuthenticating, user} = this.props.user;

    const deleteAccount = (e) => {
      e.preventDefault();

      if (window.confirm('Are you sure you want to delete your account?')) {
        this.props.dispatch(deleteUser());
      }
    };

    let content;

    if (error) {
      content = <Alert severity="error">{error}</Alert>;
    } else if (isAuthenticating || user == null) {
      content = (
        <div align="center">
          <CircularProgress />
        </div>
      );
    }

    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Account</title>
        </Helmet>

        <Container>
          <div className={classes.root}>
            <Grid container justify="flex-start" direction="row">
              <Grid item md={12}>
                <br />
                <Typography variant="h3">Account</Typography>
                <hr />
                {content}
                <br />
              </Grid>

              <Formik
                initialValues={{
                  username: user.username,
                  email: user.email,
                  bio: user.bio,
                  lastname: user.lastname,
                  firstname: user.firstname,
                  major: user.major,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  this.props.dispatch(updateUser({user: values}));
                }}
              >
                {({errors, touched}) => (
                  <Form>
                    <Grid
                      spacing={1}
                      container
                      direction="row"
                      justify="flex-start"
                    >
                      <Grid item sm={12} md={6}>
                        <h3>Basics</h3>
                        <p>
                          This information will be shown publicly so be careful
                          what information you provide.
                        </p>
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <label htmlFor="firstname">First name</label>
                        <Field
                          name="firstname"
                          placeholder="Enter your firstname"
                          className={`form-control ${
                            touched.firstname && errors.firstname
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="firstname"
                          className="invalid-feedback"
                        />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </div>
        </Container>

        <Container>
          {({errors, touched}) => (
            <Form>
              <div className="row">
                <div className="col">
                  <div className="form-card">
                    <div className="form-content">
                      <div className="form-group"></div>
                      <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <Field
                          name="lastname"
                          placeholder="Enter your lastname"
                          className={`form-control ${
                            touched.lastname && errors.lastname
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="lastname"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field
                          name="username"
                          placeholder="Enter your username"
                          className={`form-control ${
                            touched.username && errors.username
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className={`form-control ${
                            touched.email && errors.email ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Major">Major</label>
                        <Field
                          name="major"
                          placeholder="Enter your major"
                          className={`form-control ${
                            touched.major && errors.major ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="major"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <Field
                          as="textarea"
                          name="bio"
                          placeholder="Describe yourself"
                          className={`form-control ${
                            touched.bio && errors.bio ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="bio"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-footer text-right">
                      <button type="submit" className="btn btn-primary">
                        Update settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </Form>
          )}

          <Formik
            initialValues={{
              password: '',
              confirm: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.props.dispatch(
                resetPassword(values, this.props.match.params.token)
              );
            }}
          >
            {({errors, touched}) => (
              <Form>
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="form-info-title">Change password</h3>
                    <p className="form-info-text">
                      Set a unique password to protect your Microhard account.
                    </p>
                  </div>

                  <div className="col">
                    <div className="form-card">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="password">New password</label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? 'is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="confirm">Confirm new password</label>
                          <Field
                            name="confirm"
                            type="password"
                            className={`form-control ${
                              touched.confirm && errors.confirm
                                ? 'is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="confirm"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="form-footer text-right">
                        <button type="submit" className="btn btn-primary">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
              </Form>
            )}
          </Formik>

          <div className="row">
            <div className="col-md-4">
              <h3 className="form-info-title">Danger zone</h3>
              <p className="form-info-text">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>

            <div className="col">
              <div className="form-card">
                <div className="form-content">
                  <div className="form-group">
                    <label>Delete account</label>
                    <div>
                      <button
                        onClick={deleteAccount}
                        className="btn btn-outline-danger"
                      >
                        Delete your account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <br />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Account));
