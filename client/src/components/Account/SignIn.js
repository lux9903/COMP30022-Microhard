import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../img/form-logo.PNG';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('*Email is required'),
    password: Yup.string().required('*Password is required'),
});

class SignIn extends Component {
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
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(SignIn);
