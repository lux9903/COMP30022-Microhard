import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DocumentDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{margin: '10px 0 10px 0'}}
      >
        Add a personal document
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a document</DialogTitle>
        <DialogContent>
          <DialogContentText>PDF-type documents only</DialogContentText>
          <form onSubmit={props.onFormSubmitPDF}>
            <input type="file" name="file" onChange={props.onChange} />
            <Button
              type="submit"
              onClick={() => window.location.reload(false)}
              color="primary"
              variant="outlined"
            >
              Upload
            </Button>
          </form>
          <Button onClick={() => props.onDelete}> test Delete</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
