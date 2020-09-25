import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {signUpUser} from '../../actions/userAction';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import logo from '../../components/Navigation/logo.png';
import * as Yup from 'yup';

import img from './form-background.jpg';
import Alert from '@material-ui/lab/Alert';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const validationSchema = Yup.object().shape({
  lastname: Yup.string().required('*Last name is required'),
  firstname: Yup.string().required('*First name is required'),
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  form: {
    width: '100%',
  },
  form_group: {
    padding: '0px 5px 0px 5px',
  },
});

class SignUp extends Component {
  render() {
    const {error, isAuthenticating} = this.props.user;
    const {classes} = this.props;

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
          <title>Microhard &middot; Sign up</title>
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
              <br />
              <Typography variant="h4">Create your account</Typography>
              <Typography variant="h6">
                {'Or '}
                <Link color="primary" to="/sign-in">
                  sign in to your account.
                </Link>
              </Typography>
              <Formik
                initialValues={{
                  lastname: '',
                  firstname: '',
                  username: '',
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  this.props.dispatch(signUpUser({user: values}));
                }}
              >
                {({errors, touched}) => (
                  <Form className={classes.form}>
                    <div className={classes.form_group}>
                      <Field
                        as={TextField}
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="firstname"
                        name="firstname"
                        label="Enter your first name"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="firstname"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.firstname && touched.firstname}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="lastname"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.lastname && touched.lastname}
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="lastname"
                        name="lastname"
                        label="Enter your last name"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="username"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.username && touched.username}
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="username"
                        name="username"
                        label="Enter your username"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="email"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.email && touched.email}
                        variant="outlined"
                        margin="normal"
                        type="email"
                        id="email"
                        name="email"
                        label="Enter your email address"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="password"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.password && touched.password}
                        variant="outlined"
                        margin="normal"
                        type="password"
                        id="password"
                        name="password"
                        label="Enter your password"
                        fullWidth
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
              <div className={classes.form_group}>{content}</div>
              <br />
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

export default connect(mapStateToProps)(withStyles(useStyles)(SignUp));
