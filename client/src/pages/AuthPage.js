import React, {useContext, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {request, loading, error, clearError} = useHttp()

    const loginHandler = async () => {
        try {
            const data = await request('/v1/auth/login', 'POST', {email, password})
            auth.login(data?.token, data.userInfo.id)
        } catch (e) {

        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePass = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div><Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePass}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginHandler}
                    >
                        Sign In
                    </Button>
                </form>
            </div>

        </Container>
        </div>)
}

export default AuthPage