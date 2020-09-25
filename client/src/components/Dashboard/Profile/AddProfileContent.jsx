import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../../actions/userAction';
import {Helmet} from 'react-helmet';
import Alert from '@material-ui/lab/Alert';
import {Formik, ErrorMessage, Field, Form} from 'formik';
import * as Yup from 'yup';
import {withStyles} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';

const validationSchema = Yup.object().shape({
  lastname: Yup.string().required('*Last name is required'),
  firstname: Yup.string().required('*First name is required'),
  username: Yup.string().required('*Username is required'),
  email: Yup.string().email().required('*Email is required'),
  headline: Yup.string(),
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: '#F6F6F6',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#F6F6F6',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(to top, #094183 0%, #5FA5E1 100%, #CAE8FA 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <LockOutlinedIcon />,
    2: <LockOutlinedIcon />,
    3: <LockOutlinedIcon />,
    4: <LockOutlinedIcon />,
    5: <LockOutlinedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    'Headline',
    'Major',
    'About section',
    'Location',
    'Contacts & Socials',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'What is your current position in university?';
    case 1:
      return 'What is your major?';
    case 2:
      return 'Where are you currently based at?';
    case 3:
      return 'Write a short summary about yourself';
    case 4:
      return 'Have a website? Linkedin?';
    default:
      return 'Unknown step';
  }
}

const useStyles = (theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  form_group: {
    padding: '5px 5px 5px 5px',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class AddProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleNext(e) {
    e.preventDefault();
    this.setState({activeStep: this.state.activeStep + 1});
  }

  handleBack(e) {
    e.preventDefault();
    this.setState({activeStep: this.state.activeStep - 1});
  }

  render() {
    const {error, isAuthenticating, user} = this.props.user;
    const {classes} = this.props;
    const steps = getSteps();

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
          <title>Microhard &middot; Add profile content</title>
        </Helmet>

        <div className={classes.root}>
          <Stepper
            alternativeLabel
            activeStep={this.state.activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(this.state.activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {this.state.activeStep === steps.length - 1
                      ? 'Finish'
                      : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Formik
                initialValues={{
                  headline: user.headline,
                  major: user.major,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  this.props.dispatch(updateUser({user: values}));
                }}
              >
                {({errors, touched}) => (
                  <Form className={classes.form}>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="major"
                        id="major"
                        name="major"
                        label="Add/change your major"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="major"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.major && touched.major}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Field
                        variant="outlined"
                        margin="normal"
                        id="headline"
                        name="headline"
                        label="Add/change your headline"
                        fullWidth
                        as={TextField}
                        helperText={
                          <ErrorMessage
                            name="headline"
                            className="invalid-feedback"
                          />
                        }
                        error={errors.headline && touched.headline}
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        fullWidth
                      >
                        Update Account
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

export default connect(mapStateToProps)(
  withStyles(useStyles)(AddProfileContent)
);
