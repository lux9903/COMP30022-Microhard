/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {Formik} from 'formik';
import {Button, Grid, Typography} from '@material-ui/core';
import * as Yup from 'yup';

// Inputs
import {FormItem} from 'react-material-formik-wizard';

const AboutSchema = Yup.object().shape({
  major: Yup.string().trim().max(60, 'Too long! Character limit is 60'),
  headline: Yup.string().trim().max(60, 'Too long! Character limit is 60'),
  aboutSection: Yup.string().trim(),
});

const AboutSectionStep = (props) => {
  const {next, back, values} = props;

  useEffect(() => {
    const mapValues = () => {
      values.aboutSection = values.aboutSection ? values.aboutSection : '';
      values.major = values.major ? values.major : '';
      values.headline = values.headline ? values.headline : '';
    };
    mapValues();
  }, []);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          aboutSection: values.aboutSection,
          major: values.major,
          headline: values.headline,
        }}
        validationSchema={AboutSchema}
        onSubmit={(values) => {
          next({
            aboutSection: values.aboutSection,
            major: values.major,
            headline: values.headline,
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
              <Grid item xs={12} style={{padding: '15px 0px'}}>
                <FormItem
                  id="headline"
                  name="headline"
                  type="text"
                  label="Headline"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={
                    '2nd Year Veterinary Medicine undergraduate student'
                  }
                  value={values.headline}
                  error={errors.headline}
                  touched={touched.headline}
                />
              </Grid>
              <Grid item xs={12} style={{padding: '15px 0px'}}>
                <FormItem
                  id="major"
                  name="major"
                  type="text"
                  label="Major"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={
                    'Computer Science / Architecture / History? Diploma in Languages?'
                  }
                  value={values.major}
                  error={errors.major}
                  touched={touched.major}
                />
              </Grid>
              <Grid item xs={12} style={{padding: '15px 0px'}}>
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
