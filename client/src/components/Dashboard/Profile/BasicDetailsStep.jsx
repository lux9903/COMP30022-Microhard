/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {Button, Grid, Typography} from '@material-ui/core';
import * as Yup from 'yup';

// Inputs
import {FormItem} from 'react-material-formik-wizard';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  formItem: {
    margin: '17px 0px',
  },
}));

const BasicDetailsSchema = Yup.object().shape({
  lastname: Yup.string().required('*Last name is required'),
  firstname: Yup.string().required('*First name is required'),
  username: Yup.string().required('*Username is required'),
  email: Yup.string().email().required('*Email is required'),
  password: Yup.string().required('*Password is required'),
});

const BasicDetailsStep = (props) => {
  const {next, back, values} = props;
  const classes = useStyles();

  useEffect(() => {
    const mapValues = () => {
      values.lastname = values.lastname ? values.lastname : '';
      values.firstname = values.firstname ? values.firstname : '';
      values.username = values.username ? values.username : '';
      values.email = values.email ? values.email : '';
      values.password = values.password ? values.password : '';
    };
    mapValues();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={{
            lastname: values.lastname,
            firstname: values.firstname,
            username: values.username,
            email: values.email,
            password: values.password,
          }}
          validationSchema={BasicDetailsSchema}
          onSubmit={(values) => {
            next({
              lastname: values.lastname,
              firstname: values.firstname,
              username: values.username,
              email: values.email,
              password: values.password,
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            validateField,
            setFieldValue,
            setFieldTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={0} direction="row" justify="center">
                <Typography
                  variant="h2"
                  type="title"
                  color="inherit"
                  style={{flex: 1}}
                >
                  Basic User Details
                </Typography>
                <Grid item xs={12} sm={12} md={12} className={classes.formItem}>
                  <FormItem
                    id="firstname"
                    name="firstname"
                    type="text"
                    label="Enter your first name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Simon'}
                    value={values.firstname}
                    error={errors.firstname}
                    touched={touched.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.formItem}>
                  <FormItem
                    id="lastname"
                    name="lastname"
                    type="text"
                    label="Enter your last name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'Jones'}
                    value={values.lastname}
                    error={errors.lastname}
                    touched={touched.lastname}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.formItem}>
                  <FormItem
                    id="username"
                    name="username"
                    type="text"
                    label="Enter your username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={'simon9121'}
                    value={values.username}
                    error={errors.username}
                    touched={touched.username}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                justify="space-between"
              >
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    onClick={(e) => back(e, values)}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={isSubmitting || Object.entries(errors).length > 0}
                    type="submit"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};
export default BasicDetailsStep;
