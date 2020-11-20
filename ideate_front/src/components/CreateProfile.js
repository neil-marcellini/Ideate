import React from 'react'
import { Paper, TextareaAutosize, TextField, Typography, Avatar, Button } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    paper: {
        width: "40%",
        padding: "1em",
    },
    namePhoto: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridColumnGap: "1em",
        alignItems: "center"
    },
    imageUpload: {
        width: "10em",
    },
    photoDisplay: {
        width: "5em",
        height: "5em"
    }
})


export default function CreateProfile() {
    const classes = useStyles()
    return (
        <form className={classes.formContainer}>
            <Paper className={classes.paper}>
                <Typography variant="h3" style={{textDecoration: "underline"}}>Create Your Profile</Typography>
                <br />
                <Typography variant="h5">Profile Name</Typography>
                <TextField variant="filled"/>
                <Typography variant="h5">Photo</Typography>
                <div className={classes.namePhoto}>
                    <ImageUploader className={classes.imageUpload}
                            withIcon={false}
                            withPreview={true}
                            label=""
                            buttonText="Upload"
                            onChange={()=>{}}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            singleImage
                    />
                    <Avatar className={classes.photoDisplay} variant="rounded">H</Avatar>
                    
                </div>
                <br />
                <Typography variant="h5">Bio</Typography>
                <Typography>Let us know who you are!</Typography>
                <br />
                <TextareaAutosize style={{width: "20rem"}} aria-label="Bio" rowsMin={15} />
            </Paper>
        </form>
    )
}
