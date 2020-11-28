import React, { useState, useRef, useEffect } from 'react'
import { Paper, TextareaAutosize, TextField, Typography, Avatar, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from "react-redux";
import { createProfile } from "../actions/profileActions"
import Potential from './Potential'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import NewTopic from './NewTopic';


const useStyles = makeStyles({
    formContainer: {
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    paper: {
        width: "40%",
        padding: "1em",
    },
    idea: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        justifyContent: "start"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridColumnGap: "3rem",
        gridRowGap: "1rem",
        gridColumnAlign: "center",
        alignItems: "top"
    },
    imageUpload: {
        display: "none"
    },
    uploadButton: {
        gridColumn: "2 / 2",
        width: "6.5rem",
        height: "2rem"
    },
    photoDisplay: {
        width: "5em",
        height: "5em"
    },
    photoError: {
        color: "red",
        fontSize: "8pt"
    }
})


export default function CreateProfile() {
    const classes = useStyles()
    const [profileName, setProfileName] = useState(null)
    const [profileBio, setProfileBio] = useState(null)
    const [avatarSrc, setAvatarSrc] = useState(null)
    const [topicName, setTopicName] = useState(null)
    const dispatch = useDispatch()
    const [profileImage, setProfileImage] = useState(null);
    const user_id = useSelector(state => state.auth.user.user_id) 
    const inputElement = useRef(null);
    const [photoSizeError, setPhotoSizeError] = useState(null)
    const MAX_FILE_SIZE = 16000000
    const profile = useSelector(state => state.profile)
    const [nameErrorMsg, setNameErrorMsg] = useState(null)
    const [nameError, setNameError] = useState(false)
    const filter = createFilterOptions();
    

    useEffect(() => {
        setNameErrorMsg(profile.msg)
        setNameError(profile.msg !== null)
    }, [profile])


    const onFileChange = (e) => {
        if(!e.target.files.length) {
            setAvatarSrc(null)
            setProfileImage(null)
            setPhotoSizeError(null)
        } else {
            const file = e.target.files[0]
            setProfileImage(file)
            setAvatarSrc(URL.createObjectURL(file))
            if (file.size > MAX_FILE_SIZE) {
                setPhotoSizeError("Error: max size 16mb.")
            } else {
                setPhotoSizeError(null)
            }
        }
    }

    const onUploadPhoto = () => {
        inputElement.current.click()
    }

    
    const upload = () => {
        // Create an object of formData 
        const formData = new FormData();
        formData.append("profileName", profileName)
        formData.append("userId", user_id)
        formData.append("profileImage", profileImage)
        formData.append("profileBio", profileBio)
            
        // Details of the uploaded file 
        console.log(profileImage)
        dispatch(createProfile(formData))
    }

    const updateName = (e) => {
        setProfileName(e.target.value)
        setNameError(false)
        setNameErrorMsg(null)
    }
    

    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        toggleOpen(false);
    };


    const handleSubmit = (event) => {
        handleClose();
    };

    const autocompleteChange = (event, newValue) => {
        toggleOpen(false)
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
            setValue(newValue)
            toggleOpen(true);
            setTopicName(newValue)
            });
        } else if (newValue && newValue.inputValue) {
            setValue(newValue)
            toggleOpen(true);
            setTopicName(newValue.inputValue)
        } else {
            setValue(newValue);
        }
    }

    const topics = []


    return (
        <form className={classes.formContainer}>
            <Paper className={classes.paper}>
                <div className={classes.idea}>
                    <Typography variant="h3" >💡</Typography>
                    <Typography variant="h3" style={{textDecoration: "underline"}}>New Idea</Typography>
                </div>
                <br />
                <div className={classes.grid}>
                    <div>
                        <Typography variant="h5">Title</Typography>
                        <br />
                        <TextField variant="outlined" />
                    </div>
                    <Potential />
                </div>
                <Typography variant="h5">Description</Typography>
                <br />
                <TextareaAutosize style={{width: "100%"}} 
                    aria-label="Bio" rowsMin={10} onChange={(e) => {
                    setProfileBio(e.target.value)}} />
                <br />
                <Typography variant="h5">Topic</Typography>
                <Autocomplete
                    value={value}
                    onChange={autocompleteChange}
                    filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={topics}
                    getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(option) => option.title}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                    <TextField {...params} label="Select, search, or create." variant="outlined" />
                    )}
                />
                {open &&
                    <NewTopic />
                }

                <Button variant="contained" color="primary" onClick={upload} disabled={photoSizeError !== null}>Save</Button>
            </Paper>
        </form>
    )
}

