import React, { Component } from 'react'
import {Box, Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    }
  });

export default function SignUp() {
    const classes = useStyles()
    return (
        <form >
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardHeader title="Sign Up"/>
                    <CardContent>
                        <TextField id="filled-basic" label="Email" variant="filled" />
                        <br />
                        <br />
                        <TextField id="filled-basic" label="Password" variant="filled" />
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </CardActions>
                </Card>                
            </Box>
            
        </form>
    );
}
