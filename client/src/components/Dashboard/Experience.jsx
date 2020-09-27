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
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Formik, Field, Form} from 'formik';

import axios from '../../helpers/axiosConfig';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import {fullWidth} from 'validator/es/lib/isFullWidth';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
    width: '100%',
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

function MyForm(props) {
  return (
    <Dialog
      fullWidth={fullWidth}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <DialogContent>
          <div>
            <h2 id="transition-modal-title">{props.title}</h2>
            <Formik
              initialValues={{
                start_date: props.start_date,
                end_date: props.end_date,
                position: props.position,
                company: props.company,
                description: props.description,
                state: props.state,
              }}
              onSubmit = {(values) => {props.submit(values); props.handleClose();}}

            >
              <Form width='100%'>
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
                       multiline
                />
                <Typography variant="body2"><br /></Typography>
                <Field as={RadioButton}
                       label="state"
                       name="state"
                       id="state"
                       />
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  fullWidth

                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        </DialogContent>
      </Fade>
    </Dialog>
  )
}

function EditButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditSubmit = (values) => {
    let url= '/experience/update/' + props._id;
    axios.post(url, values).then(() => setOpen(false))
      .catch(() => alert('error in editing experience'));
    setTimeout(() => props.update(), 400);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>Edit</Button>
      <MyForm open={open} update={props.update} handleClose={handleClose}
              title='Edit This Experience' submit={onEditSubmit} start_date={props.allProps.start_date}
              end_date={props.allProps.end_date} position={props.allProps.position}
              company={props.allProps.company} description={props.allProps.description} state={props.allProps.state}
      />
    </div>
      )
}


function DeleteButton(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    let url = '/experience/' + props._id;
    axios.delete(url).then(r => setOpen(false)).catch(() => alert('error in deleting experience'));
    setTimeout(() => props.update(), 400);
  };

  return (
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
  );
}


class MyAccordion extends Component {
  handleEdit(e) {
  }
  render() {
    return (
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
                {this.props.start_date && this.props.start_date.substring(0, 10)} - {this.props.end_date.substring(0, 10)}
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
          <EditButton _id={this.props._id} update={this.props.update} allProps={this.props}/>
          <div>
            <DeleteButton _id={this.props._id} update={this.props.update} />
          </div>
        </AccordionActions>
      </Accordion>
    );
  }
}


const RadioButton = ({field, ...props}) => {
  return(
    <RadioGroup
      {...field}
      {...props}
      label={props.label}
      name={props.name}
    defaultValue={props.state}
    >
      <FormLabel component="legend">Do you currently work here?</FormLabel>
      <FormControlLabel value="going" control={<Radio />} label="Yes" />
      <FormControlLabel value="end" control={<Radio />} label="No" />
    </RadioGroup>
  )
}


const DateField = ({field, ...props}) => {
  return (
    <TextField
      {...field}
      {...props}
      label={props.label}
      type="date"
      name={props.name}
      InputLabelProps={{shrink: true}}
      required
    />
  );
};


const DisplayItems = (items, state) => {
  let x = [];
  let i = 0;
  items.forEach(item => {
    if(item.props.state === state) {
      x[i] = item;
      i++;
    };})
  return(
    x
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
            temp[i][key] = value;
          }));
          return (
            <MyAccordion _id={temp[i]._id} key={temp[i]._id} position={temp[i].position}
                         description={temp[i].description} start_date={temp[i].start_date}
                         state={temp[i].state} company={temp[i].company }end_date={temp[i++].end_date} update={update}
            /> );});
        setItems(expComp);
      }
    });
  }

  useEffect(() => {
    getExp().then(() => update());
  }, []);

  const onAddNewSubmit = (values) => {
    axios.post('/experience/create', values)
    .then(response => alert('The experience is successfully created'))
    .catch(error => alert('An error occurred'));
    setTimeout(() => update(), 400);
  }

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
      <br />
      <br />
      <Grid container justify="center" direction="row" spacing="3">
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Add new Experience
          </Button>
        </Grid>
          <MyForm open={open} update={update} classes={classes} handleClose={handleClose}
                  title='Add New Experience' submit={onAddNewSubmit}
          />
        <Grid item xs={12} sm={9}>
          <div className={classes.body}>
            <h3 className={classes.NunitoFont}>Current position</h3>
            <br />
            {items && DisplayItems(items, "going")}
            <br />
            <br />
            <h3 className={classes.NunitoFont}>Past Experience</h3>
            {items && DisplayItems(items, "end")}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
