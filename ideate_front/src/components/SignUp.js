import React, { useState, useEffect} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import {signUp} from '../actions/authActions'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    box: {
        padding: "5rem 0"
    },
    card: {
        margin: "auto",
        padding: "2rem",
        width: "30%",
    },
    cardHeader: {
        textAlign: "center"
    },
    link: {
        color: "blue",
        textDecoration: "underline",
        paddingBottom: "1rem"
    },
    padded: {
        paddingLeft: "16px"
    },
    paddedButton: {
        paddingLeft: "8px"
    }
});


export default function SignUp() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMsg, setEmailMsg] = useState(null);
    const [emailError, setEmailError] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [passwordError, setPasswordError] = useState(false)
    const error = useSelector(state => state.error) 

    const dispatch = useDispatch();

    useEffect(()=> {
        // Check for register error
        if (error.id === 'SIGNUP_FAIL') {
            if (error.msg.field === 'both') {
                setEmailMsg(error.msg.msg)
                setPasswordMsg(error.msg.msg)
                setEmailError(true)
                setPasswordError(true)
            } else if (error.msg.field === 'email'){
                setEmailError(true)
                setEmailMsg(error.msg.msg)
                setPasswordMsg(null)
                setPasswordError(false)
            } else if (error.msg.field === 'password') {
                setPasswordMsg(error.msg.msg)
                setPasswordError(true)
                setEmailMsg(null)
                setEmailError(false)
            }
        } else {
            setEmailMsg(null)
            setEmailError(false)
            setPasswordMsg(null)
            setPasswordError(false)
        }
    },[error])


    return (
        <form>
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardHeader title="Sign Up"/>
                    <CardContent>
                        <TextField error={emailError} label="Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value)}} helperText={emailMsg} fullWidth/>
                        <br />
                        <br />
                        <TextField error={passwordError} label="Password" type="password" variant="filled" onChange={(e) => {
                            setPassword(e.target.value)}} helperText={passwordMsg} fullWidth/>
                    </CardContent>
                    <CardActions>
                        <div className={classes.paddedButton}>
                            <Button onClick={() => dispatch(signUp({email, password}))} variant="contained" color="primary">Submit</Button>
                        </div>
                    </CardActions>
                    <br />
                    <div className={classes.padded}>
                        <p> Already have an account? <Link className={classes.link} to="/">Log In</Link></p>
                    </div>
                </Card>                
            </Box>
            
        </form>
    );

}

