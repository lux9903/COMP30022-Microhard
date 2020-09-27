/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {Button, Grid, Typography} from '@material-ui/core';
import * as Yup from 'yup';

// Inputs
import {FormItem} from 'react-material-formik-wizard';

const AboutSchema = Yup.object().shape({
  description: Yup.string().trim(),
});

const AboutSectionStep = (props) => {
  const {next, back, values} = props;

  useEffect(() => {
    const mapValues = () => {
      values.aboutSection = values.aboutSection ? values.aboutSection : '';
    };
    mapValues();
  }, []);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          aboutSection: values.aboutSection,
        }}
        validationSchema={AboutSchema}
        onSubmit={(values) => {
          next({
            aboutSection: values.aboutSection,
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
                About
              </Typography>
              <Grid item xs={12}>
                <FormItem
                  id="aboutSection"
                  name="aboutSection"
                  type="textarea"
                  label="About section"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={'Describe yourself'}
                  value={values.aboutSection}
                  error={errors.aboutSection}
                  touched={touched.aboutSection}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="row" justify="space-between">
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
    </React.Fragment>
  );
};
export default AboutSectionStep;
