import React, { useState, useEffect} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import {signUp} from '../actions/authActions'

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
    const [msg, setMsg] = useState(null);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
    const error = useSelector(state => state.error) 

    const dispatch = useDispatch();

    useEffect(()=> {
        // Check for register error
        if (error.id === 'SIGNUP_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }
    },[error])

    return (
        <form>
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardHeader title="Sign Up"/>
                    <CardContent>
                        <TextField error={msg != null} label="Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value)}} helperText={msg} />
                        <br />
                        <br />
                        <TextField error={msg != null} label="Password" type="password" variant="filled" onChange={(e) => {
                            setPassword(e.target.value)}} helperText={msg}/>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => dispatch(signUp({email, password}))} variant="contained" color="primary">Submit</Button>
                    </CardActions>
                    <br />
                </Card>                
            </Box>
            
        </form>
    );

}

