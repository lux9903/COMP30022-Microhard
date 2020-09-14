import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../components/Navigation/logo.png';
import img from './form-background.jpg';
import * as Yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Grid, Button, Container, Typography} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import background from '../../form-background.jpg';



const validationSchema = Yup.object().shape({
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
        //backgroundImage: `url(${"../../img/form-background.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: "cover",
    },
    form: {
        width: '100%',
    },
    form_group:{
        padding: '5px 5px 5px 5px',
    }
});



class SignIn extends Component {
    render() {
        const { error, isAuthenticating } = this.props.user;
        const { classes } = this.props;

        let content;

        if (error) {
            content = <Alert severity="error">{error}</Alert>
            //content = <Alert variant='danger'>{error}</Alert>;
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
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    this.props.dispatch(signInUser({ user: values }));
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
                                            <Typography variant="body2">
                                                Password
                                            </Typography>
                                            <Field
                                                variant="outlined"
                                                margin="normal"
                                                name="password"
                                                label="Enter your password"
                                                type="password"
                                                fullWidth
                                                id="password"
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
                                            <Link to="/forgot-password" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className={classes.form_group}>
                                            <Button
                                                type="submit"
                                                variant="raised"
                                                color="primary"
                                                fullWidth
                                            >
                                                Sign in
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



/*class SignIn extends Component {
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
                    <title>Microhard &middot; Sign in</title>
                </Helmet>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col order-2'>
                            <div className='form-wrap'>
                                <Link to='/'>
                                    <img src={logo} alt='Microhard' className='form-logo' />
                                    <div className='sr-only'>Microhard</div>
                                </Link>

                                <h1 className='h2 form-title'>Sign in to your account</h1>

                                <div className='mb-4'>
                                    Or <Link to='/sign-up'>create a new account</Link>.
                                </div>
                                
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        this.props.dispatch(signInUser({ user: values }));
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

                                            <div className='form-group'>
                                                <div className='form-label-wrap'>
                                                    <label htmlFor='password'>Password</label>
                                                    <Link to='/forgot-password'>Forgot your password?</Link>
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
                                                Sign in
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

//export default connect(mapStateToProps)(SignIn);
export default connect(mapStateToProps)(withStyles(useStyles)(SignIn));

