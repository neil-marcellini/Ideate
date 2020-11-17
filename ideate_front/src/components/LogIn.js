import React, { useState} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SignUp from './SignUp';
import {Link} from 'react-router-dom';


const useStyles = makeStyles({
    box: {
        padding: "5rem 0"
    },
    card: {
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
    },
    link: {
        color: "blue",
        textDecoration: "underline",
        paddingBottom: "1rem"
    }
});

export default function LogIn() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const logIn = () => {
        axios.post("/api/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <form >
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardHeader title="Log In"/>
                    <CardContent>
                        <TextField id="filled-basic" label="Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value)}} />
                        <br />
                        <br />
                        <TextField id="filled-basic" label="Password" type="password" variant="filled" onChange={(e) => {
                            setPassword(e.target.value)}} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={logIn} variant="contained" color="primary">Log In</Button>
                    </CardActions>
                    <br />
                    <p> Don't have an account?</p>
                    <Link className={classes.link} to="/signup"><p>Sign Up</p></Link>
                </Card>                
            </Box>
        </form>
    );
}
