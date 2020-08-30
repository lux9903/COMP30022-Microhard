import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import logo from '../../img/form-logo.PNG';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('*Email is required'),
});

class ForgotPassword extends Component {
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
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(ForgotPassword);
