import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import JogCard from "./JogCard";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutlined';
import JogDialogAdd from "./JogDialogAdd";
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import TextField from "@material-ui/core/TextField";
import {formatDate} from "../services/service";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    button: {
        position: 'absolute',
        right: 50
    },
    filters: {
        '& > *': {
            margin: theme.spacing(2),
        },
        flex: '1 0 auto',
        margin: '20px',
        textOverflow: 'clip',
        display: "block",
        paddingLeft: '20px',
    }

}))



export default function JogsList() {
    const classes = useStyles()
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [jogs, setJogs] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [dateFrom, setDateFrom] = useState(formatDate(new Date(1970, 0, 1)))
    const [dateTo, setDateTo] = useState(formatDate(new Date()))

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialogAfterAdding = (jog) => {
        const newJogs = jogs.slice()
        if (jog.date >= dateFrom && jog.date <= dateTo) {
            newJogs.push(jog)
        }
        setJogs(newJogs)
        setOpenDialog(false)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    useEffect(() => {
        if (jogs.length > 0) {
            let newJogs = jogs.slice()
            setJogs(newJogs.filter(value => value.date >= dateFrom && value.date <= dateTo))
        }
    }, [dateFrom, dateTo])

    useEffect(() => {
        const func = async () => {
            try {
                const data = await request(`/v1/data/jog`, 'GET', null, {
                    Authorization: `JWT ${auth.token}`
                })
                return data.jogs.filter(value => value.date >= dateFrom && value.date <= dateTo)
            } catch (e) {
                return e.message
            }
        }
        func().then(r => {
            setJogs(r)
        })
    }, [request, dateFrom, dateTo,auth.token])

    const handleDateFrom = (event) => {
        setDateFrom(event.currentTarget.value)
    }

    const handleDateTo = (event) => {
        setDateTo(event.currentTarget.value)
    }

    return (
        <div>
            {loading ? null : <div className={classes.root}>
                <div className={classes.filters}>
                    <TextField
                        type="date"
                        label='Date from'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateFrom}
                        onChange={handleDateFrom}
                    />
                    <TextField
                        type="date"
                        label='Date to'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateTo}
                        onChange={handleDateTo}
                    />
                </div>
                {jogs.map(jog =>
                    <ol key={jog._id}>
                        <JogCard jog={jog}/>
                    </ol>
                )}
                <div className={classes.button}>
                    <IconButton aria-label="add">
                        <AddCircleOutlineIcon fontSize='large' color="primary" onClick={handleOpenDialog}/>
                    </IconButton>
                </div>
                <JogDialogAdd open={openDialog} handleCloseAfterAdding={handleCloseDialogAfterAdding}
                              handleClose={handleCloseDialog}/>
            </div>}

        </div>
    )
}