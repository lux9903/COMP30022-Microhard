import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditAvatar(props) {
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
                Edit Avatar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={props.onFormSubmit}>
                    <DialogTitle id="form-dialog-title">Add a  new profile avatar</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add a new avatar here
                        </DialogContentText>
                        <input
                            type="file"
                            name="file"
                            onChange={props.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <label htmlFor="uploadPDFDocument">
                            <Button
                                type="submit"
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
