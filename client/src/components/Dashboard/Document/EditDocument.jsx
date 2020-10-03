import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

export default function EditDocument(props) {
  const [open, setOpen] = React.useState(false);
  const [upload, setUpload] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton aria-label="edit">
        <EditIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onEdit}>
          <DialogTitle id="form-dialog-title">Edit this document</DialogTitle>
          <DialogContent>
            <DialogContentText>
              PDF-type documents only. If document does not appear, please
              reload the page.
            </DialogContentText>
            <TextField
              autoFocus
              name="title"
              margin="dense"
              id="title"
              label="File Title"
              fullWidth
              variant="filled"
            />
            <br />
            <br />
            <input accept="application/pdf" type="file" name="file" />
          </DialogContent>
          <DialogActions>
            <label htmlFor="uploadPDFDocument">
              <Button
                type="submit"
                onClick={() => {
                  // window.location.reload(false);
                  setUpload(true);
                }}
                style={{fontFamily: 'Lato, sans-serif'}}
              >
                Upload
              </Button>
            </label>
            <Button
              onClick={handleClose}
              style={{fontFamily: 'Lato, sans-serif'}}
            >
              Cancel
            </Button>
          </DialogActions>
          {upload ? (
            <Container>
              <Alert severity="success">Document has been modified</Alert>
            </Container>
          ) : null}
        </form>
      </Dialog>
    </Fragment>
  );
}
