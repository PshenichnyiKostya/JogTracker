import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import JogDialogUpdate from "./JogDialogUpdate";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from '@material-ui/icons/Delete';
import JogDialogDelete from "./JogDialogDelete";
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {formatDate} from "../services/service";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '200px'
    },
    content: {
        flex: '1 0 auto',
        marginLeft: '20px',
        textOverflow: 'clip',
        display: "block",
    },
    cover: {
        width: 120,
        height: 120,
        display: 'flex',
        marginTop: '10px',
    },
    editButton: {
        marginBottom: '80px'
    },
}));

export default function JogCard({jog}) {
    const classes = useStyles();
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleOpenDialogDelete = () => {
        setOpenDialogDelete(true)
    }

    const handleCloseDialogDelete = () => {
        setOpenDialogDelete(false)
    }

    const handleDeleteJog = async () => {
        try {
            await request(`http://localhost:5000/v1/data/jog`, 'DELETE', {jogId: jog._id}, {
                Authorization: `JWT ${auth.token}`
            })
            setOpenDialogDelete(false)
            window.location.reload(false)
        } catch (e) {
            return e.message
        }
    }

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle2" color="textSecondary">
                        {formatDate(jog.date)}
                    </Typography>
                    <Typography variant='subtitle1'>
                        Speed: {<Typography
                        variant='subtitle1'
                        color="textSecondary"
                        display='inline'>
                        {(jog.distance * 1000 / (60 * jog.time)).toFixed(2)}
                    </Typography>}
                    </Typography>
                    <Typography variant='subtitle1'>
                        Distance: {<Typography
                        variant='subtitle1'
                        color="textSecondary"
                        display='inline'>
                        {jog.distance}
                    </Typography>}
                    </Typography>
                    <Typography variant='subtitle1'>
                        Time: {<Typography
                        variant='subtitle1'
                        color="textSecondary"
                        display='inline'>
                        {jog.time}
                    </Typography>}
                    </Typography>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={require('../images/unnamed.png')}
            />
            <ButtonGroup orientation='vertical' className={classes.editButton}>
                <IconButton aria-label="edit"
                            onClick={handleOpenDialog}
                >
                    <EditIcon fontSize='small' color="primary"/>
                </IconButton>
                <IconButton aria-label="delete"
                            onClick={handleOpenDialogDelete}
                >
                    <DeleteIcon fontSize='small' color="primary"/>
                </IconButton>
            </ButtonGroup>
            <JogDialogUpdate open={openDialog} handleClose={handleCloseDialog} jog={jog}/>
            <JogDialogDelete open={openDialogDelete} handleClose={handleCloseDialogDelete} deleteJog={handleDeleteJog}/>
        </Card>
    );
}