import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../components/Navigation/logo.png';
import * as Yup from 'yup';

import { Grid, Button, Container, Typography, Paper } from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import img from './form-background.jpg';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('*Email is required'),
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

class ForgotPassword extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Helmet>
                    <title>Microhard &middot; Sign in</title>
                </Helmet>

                <Grid container component="main" className={classes.root}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Link to="/">
                                <Button>
                                <img src={logo} alt="Microhard" className={classes.logo} />
                                </Button>
                            </Link>
                            <Typography variant="h4" fontWeight="fontWeightBold" padding="10px">
                                Forgot your password?
                            </Typography>
                            <Typography variant="h6">
                                {'Or return to '}
                                <Link color="inherit" to="/sign-in">
                                    sign in.
                                </Link>
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    this.props.dispatch(forgotPassword(values));
                                }}>
                                {({ errors, touched }) => (
                                    <Form className={classes.form}>
                                        <div className={classes.form_group}>
                                            <Typography variant="body2">
                                                Email Address
                                            </Typography>
                                            <Field
                                                variant="outlined"
                                                margin="normal"
                                                id="email"
                                                label="Enter your email address"
                                                name="email"
                                                type='email'
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
                            <br/>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

/*class ForgotPassword extends Component {
    render() {
        return (
            <section>
                <Helmet>
                    <title>Microhard &middot; Forgot Password</title>
                </Helmet>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col order-2'>
                            <div className='form-wrap'>
                                <Link to='/'>
                                    <img src={logo} alt='Microhard' className='form-logo' />
                                    <div className='sr-only'>Microhard</div>
                                </Link>

                                <h1 className='h2 form-title'>Forgot your password?</h1>

                                <div className='mb-4'>
                                    Or return to <Link to='/sign-in'>sign in</Link>
                                </div>

                                <Formik
                                    initialValues={{
                                        email: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        this.props.dispatch(forgotPassword(values));
                                    }}>
                                    {({ errors, touched }) => (
                                        <Form className='form-signin'>
                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='email'>Email address</label>
                                                </div>
                                                <Field
                                                    type='email'
                                                    name='email'
                                                    placeholder='Enter your email address'
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

//export default connect(mapStateToProps)(ForgotPassword);
export default connect(mapStateToProps)(withStyles(useStyles)(ForgotPassword));
