import React from 'react';
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
}));

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
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      id="field-position"
                      label="Position"
                      variant="outlined"
                    />
                    <Typography>
                      <br />
                    </Typography>
                    <TextField
                      fullWidth
                      id="field-company"
                      label="Company"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4} align="center">
                    <TextField
                      fullWidth
                      id="field-start-date"
                      label="Start Date"
                      variant="outlined"
                    />
                    <Typography>
                      <br />
                    </Typography>
                    <TextField
                      fullWidth
                      id="field-end-date"
                      label="End Date"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="field-description"
                      label="Description"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </Grid>
        <Grid item xs={9}>
          <div className={classes.body}>
            <h3 className={classes.NunitoFont}>Current position</h3>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Sales Assistant</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid Item>
                    <Typography variant="subtitle1">
                      Start date - End date
                    </Typography>
                  </Grid>
                  <Grid Item>
                    <Typography variant="subtitle1">Company</Typography>
                  </Grid>
                  <Grid Item>
                    <Typography>
                      This is a description of my position and what experience I
                      gained from it.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Sales Assistant</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid Item>
                    <Typography variant="subtitle1">
                      Start date - End date
                    </Typography>
                  </Grid>
                  <Grid Item>
                    <Typography variant="subtitle1">Company</Typography>
                  </Grid>
                  <Grid Item>
                    <Typography>
                      This is a description of my position and what experience I
                      gained from it.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Typography>
              <br />
              <br />
            </Typography>
            <h3 className={classes.NunitoFont}>Past Experience</h3>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Sales Assistant</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid Item>
                    <Typography variant="subtitle1">
                      Start date - End date
                    </Typography>
                  </Grid>
                  <Grid Item>
                    <Typography variant="subtitle1">Company</Typography>
                  </Grid>
                  <Grid Item>
                    <Typography>
                      This is a description of my position and what experience I
                      gained from it.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
