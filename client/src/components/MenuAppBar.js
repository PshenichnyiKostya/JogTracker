import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [profileMenu, setProfileMenu] = React.useState(false);
    const [menu, setMenu] = React.useState(false)

    const handleProfileMenu = () => {
        setProfileMenu(true);
    };

    const handleMenu = () => {
        setMenu(true)
    }

    const handleCloseProfileMenu = () => {
        setProfileMenu(false);
    };

    const handleCloseMenu = () => {
        setMenu(false);
    };

    const handleLogOut = () => {
        setProfileMenu(false)
        auth.logout()
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-controls="menu" className={classes.menuButton} color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu"
                        keepMounted
                        getContentAnchorEl={null}
                        open={menu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseProfileMenu}>Jogs</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Jog Tracker
                    </Typography>
                    {auth.userId && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleProfileMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                getContentAnchorEl={null}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={profileMenu}
                                onClose={handleCloseProfileMenu}
                            >
                                <MenuItem onClick={handleCloseProfileMenu}>My account</MenuItem>
                                <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
                            </Menu>

                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
