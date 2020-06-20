import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3, 0),
    },
}))

function Copyright() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/PshenichnyiKostya">
                    Kostya Pshenichnyi
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}

export default Copyright