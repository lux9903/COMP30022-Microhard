import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Formik, ErrorMessage, Field, Form} from 'formik';

import ReactDOM from 'react-dom';
import Input from '@material-ui/core/Input';
import {createExperience} from'../../actions/experienceAction'

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    backgroundColor: '#094183',
    paddingBottom: '0px',
    color: '#fff',
  },
  body: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '60%',
  },
  formTitle: {
    marginBottom: '1rem',
    textAlign: 'center',
    fontFamily: 'Nunito, sans-serif',
  },
  formWrap: {
    padding: '64px 32px',
  },
  NunitoFont: {
    fontFamily: 'Nunito, sans-serif',
  },
  form: {
    width: '100%',
  },
  form_group: {
    padding: '5px 5px 5px 5px',
  },
}));

class MyAccordion extends Component {
  render () {
    return(
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">{this.props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid Item>
              <Typography variant="subtitle1">
                {this.props.start} - {this.props.end}
              </Typography>
            </Grid>
            <Grid Item>
              <Typography variant="subtitle1">{this.props.company}</Typography>
            </Grid>
            <Grid Item>
              <Typography>
                {this.props.description}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }

}


export default function Experience() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <container>
        <Helmet>
          <title>Microhard &middot; Welcome </title>
        </Helmet>
        <div className={classes.root}>
          <div className={classes.formWrap}>
            <h1 className={classes.formTitle}>My Career Experience </h1>
          </div>
        </div>
      </container>

      <Typography>
        <br />
        <br />
      </Typography>

      <Grid container justify="center" direction="row" spacing="3">
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Add new Experience
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Add new experience</h2>
                <Grid container direction="row" alignItems="center" spacing={3}>
                  <Grid item xs={12}>
                <Formik
                  initialValues={{
                    startdate : '',
                    enddate : '',
                    position : '',
                    company : '',
                    description: '',
                    state: '',
                  }}
                  onSubmit={(values) => {
                    this.props.dispatch(createExperience({values}));
                  }}
                >

                  <Form className={classes.form}>
                    <div className={classes.form_group}>
                      <Typography variant="body2">Position</Typography>
                      <Field
                        label="Position"
                        variant="outlined"
                        name="position"
                        id="position"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Typography variant="body2">Start Date</Typography>
                      <Field
                        variant="outlined"
                        margin="normal"
                        type="text"
                        id="startdate"
                        name="startdate"
                        label="start date"
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Typography variant="body2">End Date</Typography>
                      <Field
                        label="End Date"
                        variant="outlined"
                        name="enddate"
                        id="enddate"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Typography variant="body2">Company</Typography>
                      <Field
                        label="Company"
                        variant="outlined"
                        name="company"
                        id="company"
                        fullWidth
                      />
                    </div>
                    <div className={classes.form_group}>
                      <Typography variant="body2">Description</Typography>
                      <Field
                        label="Description"
                        variant="outlined"
                        name="description"
                        id="description"
                        fullWidth
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="raised"
                      color="primary"
                      fullWidth
                      onClick={handleClose}
                    >
                      Submit
                    </Button>
                  </Form>
                </Formik>
                  </Grid>
                </Grid>

              </div>
            </Fade>
          </Modal>
        </Grid>

        <Grid item xs={9}>
          <div className={classes.body}>
            <h3 className={classes.NunitoFont}>Current position</h3>

            <MyAccordion
              title={'Sales manager'}
              start = 'start date'
              end = 'end date'
              company = 'Company'
              description = 'This is a description of my position and what experience I
                                  gained from it.'
            />

            <MyAccordion />

            <Typography>
              <br />
              <br />
            </Typography>
            <h3 className={classes.NunitoFont}>Past Experience</h3>

            <MyAccordion />

          </div>
        </Grid>
      </Grid>
    </div>
  );
}
