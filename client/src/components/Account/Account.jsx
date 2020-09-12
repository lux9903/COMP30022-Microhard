import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateUser, deleteUser, resetPassword, signUpUser} from '../../actions/userAction';
import {Helmet} from 'react-helmet';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  CircularProgress,
  Container,
  Typography,
  Button, Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import * as Yup from 'yup';
import img from "./form-background.jpg";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import logo from "../Navigation/logo.png";
import {withStyles} from "@material-ui/core/styles";

const validationSchema = Yup.object().shape({
  lastname: Yup.string().required('*Lastname is required'),
  firstname: Yup.string().required('*Firstname is required'),
  username: Yup.string().required('*Username is required'),
  email: Yup.string().email().required('*Email is required'),
  bio: Yup.string(),
});

const useStyles = (theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    maxHeight: '12rem',
    padding: '0px 10px',
    margin: '0px 20px',
  },
  image: {
    backgroundImage: 'url(' + img + ')',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  form: {
    width: '100%',
  },
  form_group:{
    padding: '5px 5px 5px 5px',
  }
});

class Account extends Component {
  render() {
    const {error, isAuthenticating, user} = this.props.user;
    const { classes } = this.props;

    const deleteAccount = (e) => {
      e.preventDefault();

      if (window.confirm('Are you sure you want to delete your account?')) {
        this.props.dispatch(deleteUser());
      }
    };

    let content;

    if (error) {
      //content = <Alert severity="error">{error}</Alert>
      content = <Alert variant='danger'>{error}</Alert>;
    } else if (isAuthenticating) {
      content = (
          <CircularProgress>
            <span>Loading...</span>
          </CircularProgress>
      );
    }

    return (
        <Fragment>
          <Helmet>
            <title>Microhard &middot; Account</title>
          </Helmet>

          <Grid container component="main" className={classes.root}>
            <Grid item xs={12} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography variant="h2" fontWeight="fontWeightBold" padding="10px">
                  Account
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography variant="h4" fontWeight="fontWeightBold" padding="10px">
                Basics
                </Typography>
                <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                  This information will be shown publicly so be careful what
                  information you provide.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}  component={Paper} elevation={6} square>
              <div className={classes.paper}>
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
                    }}>
                  {({errors, touched}) => (
                      <Form className={classes.form}>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            First Name
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='text'
                              id='firstname'
                              name='firstname'
                              label='Enter your firstname'
                              fullWidth
                              className={`form-control ${
                                  touched.firstname && errors.firstname ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='firtname'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Last Name
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='text'
                              id='lastname'
                              name='lastname'
                              label='Enter your lastname'
                              fullWidth
                              className={`form-control ${
                                  touched.lastname && errors.lastname ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='lastname'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Username
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='text'
                              id='username'
                              name='username'
                              label='Enter your username'
                              fullWidth
                              className={`form-control ${
                                  touched.username && errors.username ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='username'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Email Address
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='email'
                              id='email'
                              name='email'
                              label='Enter your email address'
                              id="email"
                              fullWidth
                              className={`form-control ${
                                  touched.email && errors.email ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='email'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Major
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='major'
                              id='major'
                              name='major'
                              label='Enter your major'
                              id="major"
                              fullWidth
                              className={`form-control ${
                                  touched.major && errors.major ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='major'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Bio
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='bio'
                              id='bio'
                              name='bio'
                              label='Enter your bio'
                              id="bio"
                              fullWidth
                              className={`form-control ${
                                  touched.bio && errors.bio ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='bio'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Button
                              type="submit"
                              variant="raised"
                              color="primary"
                              fullWidth
                          >
                            Update Account
                          </Button>
                        </div>
                      </Form>
                  )}
                </Formik>
                <div className={classes.form_group}>
                  {content}
                </div>
                <br/>
              </div>
            </Grid>
            <Grid item xs={4} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography variant="h4" fontWeight="fontWeightBold" padding="10px">
                  Change password
                </Typography>
                <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                  Set a unique password to protect your Microhard account.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}  component={Paper} elevation={6} square>
              <div className={classes.paper}>
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
                    }}>
                  {({errors, touched}) => (
                      <Form className={classes.form}>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            New Password
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='password'
                              id='password'
                              name='password'
                              label='Enter your new password'
                              fullWidth
                              className={`form-control ${
                                  touched.password && errors.password ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='password'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Typography variant="body2">
                            Confirm new password
                          </Typography>
                          <Field
                              variant="outlined"
                              margin="normal"
                              type='password'
                              id='confirm'
                              name='confirm'
                              label='Confirm your new password'
                              fullWidth
                              className={`form-control ${
                                  touched.confirm && errors.confirm ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                              component='div'
                              name='confirm'
                              className='invalid-feedback'
                          />
                        </div>
                        <div className={classes.form_group}>
                          <Button
                              type="submit"
                              variant="raised"
                              color="primary"
                              fullWidth
                          >
                            Update Your Password
                          </Button>
                        </div>
                      </Form>
                  )}
                </Formik>
                <div className={classes.form_group}>
                  {content}
                </div>
                <br/>
              </div>
            </Grid>
            <Grid item xs={4} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography variant="h4" fontWeight="fontWeightBold" padding="10px">
                  Danger Zone
                </Typography>
                <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                  Once you delete your account, there is no going back. Please be
                  certain.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}  component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                Delete account
                </Typography>
                <div className={classes.form_group}>
                  <Button
                      onClick={deleteAccount}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      fullWidth
                  >
                    Delete your account                            
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Fragment>
    );
  }
}
        /*
      <section>
        <Helmet>
          <title>Microhard &middot; Account</title>
        </Helmet>

        <Container>
          <div className="row">
            <div className="col">
              <div className="heading-button">
                <br />
                <Typography variant="h3">Account</Typography>
              </div>
              <hr />

              {content}
            </div>
          </div>

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
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="form-info-title">Basics</h3>
                    <p className="form-info-text">
                      This information will be shown publicly so be careful what
                      information you provide.
                    </p>
                  </div>

                  <div className="col">
                    <div className="form-card">
                      <div className="form-content">
                        <div className="form-group">
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
                        </div>
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
          </Formik>

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
*/
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Account));
