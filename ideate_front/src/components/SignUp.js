import React, { useState} from 'react';
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

function SignUp(props) {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form onSubmit={props.signUp({email, password})}>
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
                        <Button type="Submit" variant="contained" color="primary">Submit</Button>
                    </CardActions>
                    <br />
                </Card>                
            </Box>
            
        </form>
    );

}

SignUp.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    {signUp}
)(SignUp)
