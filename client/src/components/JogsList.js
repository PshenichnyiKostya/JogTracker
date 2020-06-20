import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import JogCard from "./JogCard";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutlined';
import JogDialogAdd from "./JogDialogAdd";
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    button: {
        position: 'absolute',
        right: 50
    }

}))

export default function JogsList() {
    const classes = useStyles()
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [jogs, setJogs] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialogAfterAdding = (jog) => {
        const newJogs = jogs.slice()
        newJogs.push(jog)
        setJogs(newJogs)
        setOpenDialog(false)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    useEffect(() => {
        const func = async () => {
            try {
                const data = await request(`/v1/data/jog`, 'GET', null, {
                    Authorization: `JWT ${auth.token}`
                })
                return data
            } catch (e) {
                return e.message
            }
        }
        func().then(r => {
            setJogs(r.jogs)
        })
    }, [request])

    return (
        <div>
            {loading ? null : <div className={classes.root}>
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