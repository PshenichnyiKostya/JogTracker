import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AuthContext} from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function JogDialogAdd({open, handleCloseAfterAdding,handleClose}) {

    const [date, setDate] = useState(new Date())
    const [distance, setDistance] = useState(0)
    const [time, setTime] = useState(0)
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const handleTime = (event) => {
        setTime(event.currentTarget.value)
    }
    const handleSave = async () => {
        try {
            const data = await request(`http://localhost:${process.env.PORT || 5000}/v1/data/jog`, 'POST', {date, distance, time}, {
                Authorization: `JWT ${auth.token}`
            })
            handleCloseAfterAdding(data.jog)
        } catch (e) {
            return e.message
        }
    }

    const handleDistance = (event) => {
        setDistance(event.currentTarget.value)
    }

    const handleDate = (event) => {
        setDate(event.currentTarget.value)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Jogging</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="time"
                        label="Time(min)"
                        type="number"
                        fullWidth
                        onChange={handleTime}
                        value={time}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="distance"
                        label="Distance(km)"
                        type="number"
                        fullWidth
                        value={distance}
                        onChange={handleDistance}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        type="date"
                        label='Date'
                        fullWidth
                        value={formatDate(date)}
                        onChange={handleDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
