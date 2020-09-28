import React, {useState} from 'react';
import {Grid, Button, Typography, CardContent} from '@material-ui/core';

const ReviewStep = (props) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    props.handleSubmit();
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={0} direction="row" justify="center">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            type="title"
            color="inherit"
            style={{flex: 1}}
          >
            {props.values.firstname + ' Review'}
          </Typography>
        </Grid>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography
                    variant="h5"
                    type="title"
                    color="inherit"
                    style={{flex: 1}}
                  >
                    Lastname
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {props.values.aboutSection}
            </Grid>
            <Grid item xs={12}>
              {props.values.firstname}
            </Grid>
            <Grid item xs={12}>
              {props.values.lastname}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                type="title"
                color="inherit"
                style={{flex: 1}}
              >
                Username
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.values.username}
            </Grid>
          </Grid>
          <Grid container spacing={0} direction="row" justify="space-between">
            <Grid item>
              <Button
                disabled={isSubmitting}
                onClick={(e) => props.back(e, props.values)}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={isSubmitting} onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewStep;
