import React from 'react'
import { Paper, TextareaAutosize, TextField, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    namePhoto: {
        display: "flex",
        flexDirection: "row"
    }
})


export default function CreateProfile() {
    const classes = useStyles()
    return (
        <form className={classes.formContainer}>
            <Paper>
                <Typography variant="h3" style={{textDecoration: "underline"}}>Create Your Profile</Typography>
                <br />
                <div className={classes.namePhoto}>
                    <Typography variant="h5">Profile Name</Typography>
                    <Avatar>H</Avatar>
                </div>
                <br />
                <TextField variant="filled"/>
                <br />
                <br />
                <Typography variant="h5">Bio</Typography>
                <Typography>Let us know who you are!</Typography>
                <br />
                <TextareaAutosize style={{width: "20rem"}} aria-label="Bio" rowsMin={15} />
            </Paper>
        </form>
    )
}
