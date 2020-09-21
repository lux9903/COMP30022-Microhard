import React from 'react';
import Button from '@material-ui/core/Button';
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
        style={{margin: '20px 0 20px 0'}}
      >
        Add a personal document
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onFormSubmitPDF}>
          <DialogTitle id="form-dialog-title">Create a document</DialogTitle>
          <DialogContent>
            <DialogContentText>
              PDF-type documents only. If document does not appear, please
              reload the page.
            </DialogContentText>
            <input
              accept="application/pdf"
              type="file"
              name="file"
              onChange={props.onChange}
            />
          </DialogContent>
          <DialogActions>
            <label htmlFor="uploadPDFDocument">
              <Button
                type="submit"
                onClick={() => window.location.reload(false)}
                color="primary"
              >
                Upload
              </Button>
            </label>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
