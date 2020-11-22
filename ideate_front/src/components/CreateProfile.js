import React, { useState } from 'react'
import { Paper, TextareaAutosize, TextField, Typography, Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch} from "react-redux";
import { createProfile } from "../actions/profileActions"



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
    const [profileName, setProfileName] = useState(null)
    const [profileBio, setProfileBio] = useState(null)
    const dispatch = useDispatch()
    const [profileImage, setProfileImage] = useState(null);


    const upload = () => {
        // Create an object of formData 
        const formData = new FormData();
        formData.append("profileName", profileName)
        formData.append("profileImage", profileImage)
        formData.append("profileBio", profileBio)
            
        // Details of the uploaded file 
        console.log(profileImage)
        dispatch(createProfile(formData))
    }

    return (
        <form className={classes.formContainer}>
            <Paper className={classes.paper}>
                <Typography variant="h3" style={{textDecoration: "underline"}}>Create Your Profile</Typography>
                <br />
                <Typography variant="h5">Profile Name</Typography>
                <TextField variant="filled" onChange={(e) => {
                            setProfileName(e.target.value)}} />
                <Typography variant="h5">Photo</Typography>
                <div className={classes.namePhoto}>
                    <input type="file" name="profile" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
                    <Avatar className={classes.photoDisplay} variant="rounded" src={profileImage}/>
                    
                </div>
                <br />
                <Typography variant="h5">Bio</Typography>
                <Typography>Let us know who you are!</Typography>
                <br />
                <TextareaAutosize style={{width: "20rem"}} 
                    aria-label="Bio" rowsMin={15} onChange={(e) => {
                    setProfileBio(e.target.value)}} />
                <br />
                <br />
                <Button variant="contained" color="primary" onClick={upload}>Save</Button>
            </Paper>
        </form>
    )
}
