import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {resetPassword} from '../../actions/userAction';
import {Helmet} from 'react-helmet';
import {Link, withRouter} from 'react-router-dom';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import logo from '../Navigation/logo.png';
import * as Yup from 'yup';

import {Grid, Button, Container, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import img from './form-background.jpg';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('*Password is required'),
  confirm: Yup.string().required('*Confirm password is required'),
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

class ResetPassword extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>Microhard &middot; Sign in</title>
        </Helmet>

        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Link to="/">
                <Button>
                  <img src={logo} alt="Microhard" className={classes.logo} />
                </Button>
              </Link>
              <Typography
                variant="h4"
                fontWeight="fontWeightBold"
                padding="10px"
              >
                Sign in to your account
              </Typography>
              <Typography variant="h6">
                {'Or '}
                <Link color="inherit" to="/sign-up">
                  create a new account.
                </Link>
              </Typography>
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
                      <Typography variant="body2">Password</Typography>
                      <Field
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Enter your new password"
                        type="password"
                        fullWidth
                        id="password"
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
                    <div className={classes.form_group}>
                      <Typography variant="body2">Confirm password</Typography>
                      <Field
                        variant="outlined"
                        margin="normal"
                        name="confirm"
                        label="Confirm your new password"
                        type="password"
                        fullWidth
                        id="confirm"
                        className={`form-control ${
                          touched.confirm && errors.confirm ? 'is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="confirm"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        fullWidth
                      >
                        Reset Password
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <br />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

/*class ResetPassword extends Component {
    render() {
        return (
            <section>
                <Helmet>
                    <title>Microhard &middot; Reset Password</title>
                </Helmet>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col order-2'>
                            <div className='form-wrap'>
                                <Link to='/'>
                                    <img src={logo} alt='Microhard' className='form-logo' />
                                    <div className='sr-only'>Microhard</div>
                                </Link>

                                <h1 className='h2 form-title'>Reset your password</h1>

                                <div className='mb-4'>
                                    Or return to <Link to='/sign-in'>sign in</Link>
                                </div>

                                <Formik
                                    initialValues={{
                                        password: '',
                                        confirm: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        this.props.dispatch(resetPassword(values, this.props.match.params.token));
                                    }}>
                                    {({ errors, touched }) => (
                                        <Form className='form-signin'>
                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='password'>New password</label>
                                                </div>
                                                <Field
                                                    type='password'
                                                    name='password'
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

                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='confirm'>Confirm password</label>
                                                </div>
                                                <Field
                                                    type='password'
                                                    name='confirm'
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

                                            <button type='submit' className='btn btn-primary btn-block'>
                                                Reset password
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>

                        <div className='col-sm-3 col-md-6 col-lg-7 col-xl-8 form-background order-sm-2'></div>
                    </div>
                </div>
            </section>
        );
    }
}*/

const mapStateToProps = (state) => ({
  ...state,
});

//export default withRouter(connect(mapStateToProps)(ResetPassword));
export default connect(mapStateToProps)(withStyles(useStyles)(ResetPassword));
