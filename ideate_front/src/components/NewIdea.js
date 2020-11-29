import React, { useState, useEffect } from 'react'
import { Paper, TextareaAutosize, TextField, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from "react-redux";
import { createIdea } from "../actions/ideaActions"
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


export default function NewIdea() {
    const classes = useStyles()
    const [ideaTitle, setIdeaTitle] = useState(null)
    const [ideaDescription, setIdeaDescription] = useState(null)
    const [topicName, setTopicName] = useState(null)
    const dispatch = useDispatch()
    const filter = createFilterOptions();
    const potential = useSelector(state => state.potential)
    const topic = useSelector(state => state.topic)
    const profileName = useSelector(state => state.profile.profile_name)
    

    
    const save = () => {
        // Create an object of formData 
        const formData = new FormData();
        formData.append("ideaTitle", ideaTitle)
        formData.append("ideaDescription", ideaDescription)
        formData.append("potentialX", potential.x)
        formData.append("potentialY", potential.y)
        formData.append("topicName", topicName)
        formData.append("topicImage", topic.topicImage)
        formData.append("topicDescription", topic.topicDescription)
        formData.append("profileName", profileName)
        dispatch(createIdea(formData))
    }

    const updateTitle = (e) => {
        setIdeaTitle(e.target.value)
    }
    

    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);


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
                        <TextField variant="outlined" onChange={updateTitle} />
                    </div>
                    <Potential />
                </div>
                <Typography variant="h5">Idea Description</Typography>
                <br />
                <TextareaAutosize style={{width: "100%"}} 
                    aria-label="Bio" rowsMin={10} onChange={(e) => {
                    setIdeaDescription(e.target.value)}} />
                <br />
                <Typography variant="h5">Topic</Typography>
                <br />
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
                <br />
                {open &&
                    <NewTopic />
                }
                <Button variant="contained" color="primary" onClick={save} >Save</Button>
            </Paper>
        </form>
    )
}

