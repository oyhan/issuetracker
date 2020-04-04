import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IssueTypePropertyNew from './IssueTypeProperyNew';
import useGlobal from 'store';

export default function FormDialog(props) {
    const [dialogOpen, openDialog] = useGlobal(
        state => state.dialogOpen,
        actions => actions.openDialog
    );

    const handleClose = () => {
        openDialog(false);

    }
    var child = null;
    const getChildHandleSubmit = (ref) => {
        child = ref;
        
    }
    const childRef = useRef();
    
    return (
        <div>

            <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">اضافه کردن ویژگی</DialogTitle>
                <DialogContent>

                    {props.content}
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={(e) => {


                        childRef.current.handleSubmit(e);
                    }} color="primary">

                        Subscribe
          </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
