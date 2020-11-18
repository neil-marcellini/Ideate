import React, { useState, useEffect} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {logIn} from '../actions/authActions'
import { useDispatch, useSelector } from "react-redux";




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

export default function LogIn() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailMsg, setEmailMsg] = useState(null);
    const [emailError, setEmailError] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()

    const error = useSelector(state => state.error)

    function checkFields() {
        const emailBlank = email === ''
        const passwordBlank = password === ''
        if (emailBlank){
            console.log("setting email error")
            setEmailError(true)
            setEmailMsg("You must provide an email")
        } else {
            setEmailError(false)
            setEmailMsg(null)
        }
        if (passwordBlank){
            console.log("setting password error")
            setPasswordError(true)
            setPasswordMsg("You must provide a password")
        }else {
            setPasswordError(false)
            setPasswordMsg(null)
        }
        console.log(`emailError=${emailError}, passwordError=${passwordError}`)
        if (!emailBlank && !passwordBlank) {
            console.log("dispatching")
            dispatch(logIn({email, password}))
        }
    }

    useEffect(()=> {
        // Check for login error
        if (error.id === 'LOGIN_FAIL') {
            if (error.msg.field === 'both') {
                setEmailMsg(error.msg.msg)
                setPasswordMsg(error.msg.msg)
                setEmailError(true)
                setPasswordError(true)
            } else if (error.msg.field === 'email'){
                setEmailError(true)
                setEmailMsg(error.msg.msg)
            } else if (error.msg.field === 'password') {
                setPasswordMsg(error.msg.msg)
                setPasswordError(true)
            }

        } else {
            setEmailMsg(null)
            setEmailError(false)
            setPasswordMsg(null)
            setPasswordError(false)
        }
    },[error])

    return (
        <form >
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardHeader title="Welcome Back!"/>
                    <CardContent>
                        <TextField id="filled-basic" error={emailError} label="Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value)}} helperText={emailMsg} fullWidth />
                        <br />
                        <br />
                        <TextField id="filled-basic" error={passwordError} label="Password" type="password" variant="filled" onChange={(e) => {
                            setPassword(e.target.value)}} helperText={passwordMsg} fullWidth />
                    </CardContent>
                    <CardActions>
                        <div className={classes.paddedButton}>
                            <Button onClick={checkFields} variant="contained" color="primary">Log In</Button>
                        </div>
                    </CardActions>
                    <br />
                    <div className={classes.padded}>
                        <p> Don't have an account? <Link className={classes.link} to="/signup">Sign Up</Link></p>
                    </div>
                    
                </Card>                
            </Box>
        </form>
    );
}
