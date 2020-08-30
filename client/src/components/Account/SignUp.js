import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../img/form-logo.PNG';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('*Username is required'),
    email: Yup.string().email().required('*Email is required'),
    password: Yup.string().required('*Password is required'),
});

class SignUp extends Component {
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
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(SignUp);
