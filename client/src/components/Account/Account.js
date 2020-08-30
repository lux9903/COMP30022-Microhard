import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, resetPassword } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Spinner, Alert } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('*Username is required'),
    email: Yup.string().email().required('*Email is required'),
    bio: Yup.string(),
});

class Account extends Component {
    render() {
        const { error, isAuthenticating, user } = this.props.user;

        const deleteAccount = (e) => {
            e.preventDefault();

            if (window.confirm('Are you sure you want to delete your account?')) {
                this.props.dispatch(deleteUser());
            }
        };

        let content;

        if (error) {
            content = <Alert variant='danger'>{error}</Alert>;
        } else if (isAuthenticating || user == null) {
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
                    <title>Microhard &middot; Account</title>
                </Helmet>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='heading-button'>
                                <h1>Account</h1>
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
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            this.props.dispatch(updateUser({ user: values }));
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <h3 className='form-info-title'>Basics</h3>
                                        <p className='form-info-text'>
                                            This information will be shown publicly so be careful what information you
                                            provide.
                                        </p>
                                    </div>

                                    <div className='col'>
                                        <div className='form-card'>
                                            <div className='form-content'>
                                                <div className='form-group'>
                                                    <label htmlFor='username'>Username</label>
                                                    <Field
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
                                                    <label htmlFor='email'>Email</label>
                                                    <Field
                                                        name='email'
                                                        type='email'
                                                        placeholder='Enter your email'
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
                                                    <label htmlFor='bio'>Bio</label>
                                                    <Field
                                                        as='textarea'
                                                        name='bio'
                                                        placeholder='Describe yourself'
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
                                            </div>

                                            <div className='form-footer text-right'>
                                                <button type='submit' className='btn btn-primary'>
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
                            this.props.dispatch(resetPassword(values, this.props.match.params.token));
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <h3 className='form-info-title'>Change password</h3>
                                        <p className='form-info-text'>
                                            Set a unique password to protect your Microhard account.
                                        </p>
                                    </div>

                                    <div className='col'>
                                        <div className='form-card'>
                                            <div className='form-content'>
                                                <div className='form-group'>
                                                    <label htmlFor='password'>New password</label>
                                                    <Field
                                                        name='password'
                                                        type='password'
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
                                                    <label htmlFor='confirm'>Confirm new password</label>
                                                    <Field
                                                        name='confirm'
                                                        type='password'
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
                                            </div>

                                            <div className='form-footer text-right'>
                                                <button type='submit' className='btn btn-primary'>
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

                    <div className='row'>
                        <div className='col-md-4'>
                            <h3 className='form-info-title'>Danger zone</h3>
                            <p className='form-info-text'>
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                        </div>

                        <div className='col'>
                            <div className='form-card'>
                                <div className='form-content'>
                                    <div className='form-group'>
                                        <label>Delete account</label>
                                        <div>
                                            <button onClick={deleteAccount} className='btn btn-outline-danger'>
                                                Delete your account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Account);
