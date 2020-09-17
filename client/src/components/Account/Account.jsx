import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  updateUser,
  deleteUser,
  resetPassword,
  signUpUser,
} from '../../actions/userAction';
import {Helmet} from 'react-helmet';
import DeleteIcon from '@material-ui/icons/Delete';

import Alert from '@material-ui/lab/Alert';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import * as Yup from 'yup';
import img from './form-background.jpg';
import {withStyles} from '@material-ui/core/styles';
import { Typography, Grid, TextField, Paper, CircularProgress, Button } from '@material-ui/core';

const validationSchema = Yup.object().shape({
  lastname: Yup.string().required('*Last name is required'),
  firstname: Yup.string().required('*First name is required'),
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
    textAlign: 'center',
  },
  logo: {
    maxHeight: '12rem',
    padding: '0px 10px',
    margin: '0px 20px',
  },
  image: {
    backgroundImage: 'url(' + img + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  form: {
    width: '100%',
  },
  form_group: {
    padding: '5px 5px 5px 5px',
  },
});

class Account extends Component {
  render() {
    const {error, isAuthenticating, user} = this.props.user;
    const {classes} = this.props;

    const deleteAccount = (e) => {
      e.preventDefault();

      if (window.confirm('Are you sure you want to delete your account?')) {
        this.props.dispatch(deleteUser());
      }
    };

    let content;

    if (error) {
      content = <Alert severity="error">{error}</Alert>;
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
              <Typography variant="h2" padding="10px">
                Account
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography variant="h4" padding="10px">
                Basics
              </Typography>
              <Typography variant="h6" padding="10px">
                This information will be shown publicly so be careful what
                information you provide.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8} component={Paper} elevation={6} square>
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
                }}
              >
                {({errors, touched}) => (
                  <Form className={classes.form}>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="firstname"
                        name="firstname"
                        label="Change your first name"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="firstname"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.firstname && touched.firstname}
                        // className={`form-control ${
                        //   touched.firstname && errors.firstname
                        //     ? 'is-invalid'
                        //     : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="lastname"
                        name="lastname"
                        label="Change your last name"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="lastname"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.lastname && touched.lastname}
                        // className={`form-control ${
                        //   touched.lastname && errors.lastname
                        //     ? 'is-invalid'
                        //     : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="username"
                        name="username"
                        label="Change your username"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="username"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.username && touched.username}
                        // className={`form-control ${
                        //   touched.username && errors.username
                        //     ? 'is-invalid'
                        //     : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="email"
                        id="email"
                        name="email"
                        label="Change your email address"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="email"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.email && touched.email}
                        // className={`form-control ${
                        //   touched.email && errors.email ? 'is-invalid' : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="major"
                        id="major"
                        name="major"
                        label="Add/change your major"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="major"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.major && touched.major}
                        // className={`form-control ${
                        //   touched.major && errors.major ? 'is-invalid' : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="bio"
                        id="bio"
                        name="bio"
                        label="Add/change your bio"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="bio"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.bio && touched.bio}
                        // className={`form-control ${
                        //   touched.bio && errors.bio ? 'is-invalid' : ''
                        // }`}
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
              <div className={classes.form_group}>{content}</div>
              <br />
            </div>
          </Grid>
          <Grid item xs={4} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography
                variant="h4"
                fontWeight="fontWeightBold"
                padding="10px"
              >
                Change password
              </Typography>
              <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                Set a unique password to protect your Microhard account.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8} component={Paper} elevation={6} square>
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
                }}
              >
                {({errors, touched}) => (
                  <Form className={classes.form}>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="password"
                        id="password"
                        name="password"
                        label="New password"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="password"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.password && touched.password}
                        // className={`form-control ${
                        //   touched.password && errors.password
                        //     ? 'is-invalid'
                        //     : ''
                        // }`}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="password"
                        id="confirm"
                        name="confirm"
                        label="Confirm your new password"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="confirm"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.confirm && touched.confirm}
                        // className={`form-control ${
                        //   touched.confirm && errors.confirm ? 'is-invalid' : ''
                        // }`}
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
              <div className={classes.form_group}>{content}</div>
              <br />
            </div>
          </Grid>
          <Grid item xs={4} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography
                variant="h4"
                fontWeight="fontWeightBold"
                padding="10px"
              >
                Danger Zone
              </Typography>
              <Typography variant="h6" fontWeight="fontWeight" padding="10px">
                Once you delete your account, there is no going back. Please be
                certain.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8} component={Paper} elevation={6} square>
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

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Account));
