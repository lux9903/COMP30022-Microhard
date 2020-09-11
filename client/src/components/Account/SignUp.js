import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../components/Navigation/logo.png';
import * as Yup from 'yup';

import img from './form-background.jpg';
import { CircularProgress } from '@material-ui/core';
//import Alert from '@material-ui/lab/Alert';
//import { Alert } from '@material-ui/lab';
import {Grid, Button, Container, Typography} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const validationSchema = Yup.object().shape({
    lastname: Yup.string().required('*Lastname is required'),
    firstname: Yup.string().required('*Firstname is required'),
    username: Yup.string().required('*Username is required'),
    email: Yup.string().email().required('*Email is required'),
    password: Yup.string().required('*Password is required'),
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

class SignUp extends Component {
    render() {
        const { error, isAuthenticating } = this.props.user;
        const { classes } = this.props;

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
                    <title>Microhard &middot; Sign up</title>
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
                                Create your account
                            </Typography>
                            <Typography variant="h6">
                                {'Or '}
                                <Link color="inherit" to="/sign-in">
                                    sign in to your account.
                                </Link>
                            </Typography>
                            <Formik
                                initialValues={{
                                    lastname:'',
                                    firstname:'',
                                    username: '',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    this.props.dispatch(signUpUser({user: values}));
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
                                                Password
                                            </Typography>
                                            <Field
                                                variant="outlined"
                                                margin="normal"
                                                type='password'
                                                id='password'
                                                name='password'
                                                label='Enter your password'
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
                                            <Button
                                                type="submit"
                                                variant="raised"
                                                color="primary"
                                                fullWidth
                                            >
                                                Sign up
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
                </Grid>
            </Fragment>
        );
    }
}

/*class SignUp extends Component {
    render() {
        const { error, isAuthenticating } = this.props.user;

        let content;

        if (error) {
            content = <Alert variant='danger'>{error}</Alert>;
        } else if (isAuthenticating) {
            content = (
                <div className='text-center'>
                    <Spinner animation='border' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <section>
                <Helmet>
                    <title>Microhard &middot; Sign up</title>
                </Helmet>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col order-2'>
                            <div className='form-wrap'>
                                <Link to='/'>
                                    <img src={logo} alt='Microhard' className='form-logo'/>
                                    <div className='sr-only'>Microhard</div>
                                </Link>

                                <h1 className='h2 form-title'>Create your account</h1>

                                <div className='mb-4'>
                                    Or <Link to='/sign-in'>sign in to your account</Link>.
                                </div>
                                

                                <Formik
                                    initialValues={{
                                        lastname:'',
                                        firstname:'',
                                        username: '',
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        this.props.dispatch(signUpUser({user: values}));
                                    }}>
                                    {({errors, touched}) => (
                                        <Form className='form-signin'>
                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='firstname'>Firstname</label>
                                                </div>
                                                <Field
                                                    type='text'
                                                    name='firstname'
                                                    placeholder='Enter your firstname'
                                                    className={`form-control ${
                                                        touched.firstname && errors.firstname ? 'is-invalid' : ''
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component='div'
                                                    name='firstname'
                                                    className='invalid-feedback'
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='lastname'>Lastname</label>
                                                </div>
                                                <Field
                                                    type='text'
                                                    name='lastname'
                                                    placeholder='Enter your lastname'
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
                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='username'>Username</label>
                                                </div>
                                                <Field
                                                    type='text'
                                                    name='username'
                                                    placeholder='Enter your username'
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

                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='password'>Password</label>
                                                </div>
                                                <Field
                                                    type='password'
                                                    name='password'
                                                    placeholder='Enter your password'
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

                                            <button type='submit' className='btn btn-primary btn-block'>
                                                Sign up
                                            </button>
                                        </Form>
                                    )}
                                </Formik>

                                {content}
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

//export default connect(mapStateToProps)(SignUp);
export default connect(mapStateToProps)(withStyles(useStyles)(SignUp));
