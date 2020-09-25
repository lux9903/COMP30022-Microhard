import React, {Component, useEffect, useState} from 'react';
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
import axios from '../../helpers/axiosConfig';

import ReactDOM from 'react-dom';
import Input from '@material-ui/core/Input';
import axios from '../../helpers/axiosConfig';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import {fullWidth} from 'validator/es/lib/isFullWidth';

const useStyles = makeStyles((theme) => ({
  root: {
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
    width: '100%'
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

function DeleteButton(props) {
  //use props._id to identify
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleAccept = () => {
    //finish sending delete here *****************
    setOpen(false);
  }
  return(
  <div>
    <Button size="small" color="primary" onClick={handleClickOpen}>Delete</Button>
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      <DialogTitle id="alert-dialog-title">Are you sure you want to delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Accepting this will permanently remove this experience from your profile.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}


class MyAccordion extends Component {
  handleEdit(e) {
  }

  render () {
    return(
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">{this.props.position}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid Item>
              <Typography variant="subtitle1">
                {this.props.start_date.substring(0,10)} - {this.props.end_date.substring(0,10)}
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
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={this.handleEdit}>Edit</Button>
          <div>
            <DeleteButton _id={this.props._id}/>
          </div>
        </AccordionActions>
      </Accordion>
    );
  }
}

const DateField = ({field, ...props}) => {
  return(
    <TextField
      {...field}
      {...props}
      label= {props.label}
      type="date"
      name={props.name}
      InputLabelProps={{shrink:true}}
    />
    )
}


export default function Experience() {
  const [items, setItems] = useState();
  const [anchorEl, setAnchorEl] = useState();

  const classes = useStyles();
  const getExp = () => axios.get('/experience').catch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function update() {
    getExp().then(data => {
      let temp = {};
      let i = 0;
      if (data !== undefined) {
        let expComp = data.data.map(item => {
          temp[i] = {};
          (Object.entries(item).map(([key, value]) => {
            temp[i][key] = value
          }));
          return (<MyAccordion _id={temp[i]._id} key={temp[i]._id} position={temp[i].position} description={temp[i].description}
          start_date={temp[i].start_date} end_date={temp[i++].end_date}  />);
        });
        setItems(expComp);
      }});
  }

  useEffect(() => {
    getExp().then(() => update());
  }, []);

  return (
    <div>
      <container>
        <Helmet>
          <title>Microhard &middot; Welcome </title>
        </Helmet>
        <div className={classes.root}>
          <div className={classes.formWrap}>
            <h1 className={classes.formTitle}>My Career Experience</h1>
          </div>
        </div>
      </container>

      <Typography>
        <br />
        <br />
      </Typography>

      <Grid container justify="center" direction="row" spacing="3">
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Add new Experience
          </Button>
        </Grid>
          <Dialog
            fullWidth={fullWidth}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}

          >
            <Fade in={open}>
              <DialogContent>
              <div >
                <h2 id="transition-modal-title">Add new experience</h2>
                <Formik

                  initialValues={{
                    start_date : '',
                    end_date : '',
                    position : '',
                    company : '',
                    description: '',
                    state: '',
                  }}

                    onSubmit = {(values) => {
                    axios.post('/experience/create', values).then(response => {
                    alert('The experience is successfully created');
                  }).catch((error => {alert('An error occurred')}));
                    update();
                  }}

                >

                  <Form className={classes.form}>

                      <Typography variant="body2"><br /></Typography>
                      <Field as={DateField}
                        id="start_date"
                        name="start_date"
                        label="Start date"
                             fullWidth
                      />
                      <Typography variant="body2"><br /></Typography>
                      <Field as={DateField}
                        label="End Date"
                        name="end_date"
                        id="end_date"
                        fullWidth
                      />
                    <Typography variant="body2"><br /></Typography>
                    <Field as={TextField}
                           label="Position"
                           variant="outlined"
                           name="position"
                           id="position"
                           fullWidth
                    />
                    <Typography variant="body2"><br /></Typography>
                    <Field as={TextField}
                      label="Company"
                      variant="outlined"
                      name="company"
                      id="company"
                      fullWidth
                    />
                    <Typography variant="body2"><br /></Typography>
                    <Field as={TextField}
                      label="Description"
                      variant="outlined"
                      name="description"
                      id="description"
                      fullWidth
                    />

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

              </div>
              </DialogContent>
            </Fade>
          </Dialog>

        <Grid item xs={12}sm={9}>
          <div className={classes.body}>
            <h3 className={classes.NunitoFont}>Current position</h3>

            <MyAccordion
              key='01'
              _id='id01'
              position='Sales manager'
              start_date = 'start date'
              end_date = 'end date'
              company = 'Company'
              description = 'This is a description of my position and what experience I
                                  gained from it.'
            />
            <br />
            <div>
              {items}
            </div>

            <Typography>
              <br />
              <br />
            </Typography>
            <h3 className={classes.NunitoFont}>Past Experience</h3>

            <MyAccordion key='02' _id='id02' start_date='12-12-1212' end_date = 'blah'/>


          </div>
        </Grid>
      </Grid>
      
    </div>
  );
}