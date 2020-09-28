import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AddProject(props) {
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
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onFormSubmit}>
          <DialogTitle id="form-dialog-title">Create project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="name"
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus
              name="description"
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <label>
              <Button
                type="submit"
                onClick={() => window.location.reload(false)}
                color="primary"
              >
                create
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
