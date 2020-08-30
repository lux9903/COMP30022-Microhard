import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../img/form-logo.PNG';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('*Password is required'),
    confirm: Yup.string().required('*Confirm password is required'),
});

class ResetPassword extends Component {
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
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(ResetPassword));
