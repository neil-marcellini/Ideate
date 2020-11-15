import React, { useState} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
});

export default function SignUp() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signUp = () => {
        axios.post("/api/signup", {
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
                    <CardHeader title="Sign Up"/>
                    <CardContent>
                        <TextField id="filled-basic" label="Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value)}} />
                        <br />
                        <br />
                        <TextField id="filled-basic" label="Password" type="password" variant="filled" onChange={(e) => {
                            setPassword(e.target.value)}} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={signUp} variant="contained" color="primary">Submit</Button>
                    </CardActions>
                    <br />
                </Card>                
            </Box>
            
        </form>
    );
}
