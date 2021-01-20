import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Paper, TextareaAutosize, TextField, Typography, Button, Slider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from "react-redux";
import { createIdea, getAllIdeas } from "../actions/ideaActions"
import { getAllTopics } from '../actions/allTopicActions'
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
        minWidth: "min-content",
        maxWidth: "80%",
        padding: "1em",
    },
    title: {
        minWidth: "8rem",
        maxWidth: "25rem",
    },
    idea: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        justifyContent: "start"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridColumnGap: "1rem",
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
    },
    potential: {
        padding: "1rem",
        width: "fit-content",
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(4, auto)",
        gridColumnGap: "0.5rem",
        gridRowGap: "0.5rem",
    },
    xSlider: {
        width: "100px",
        gridColumn: "2 / 2"
    },
    xLabel: {
        gridColumn: "2 / 2",
        justifySelf: "center"
    },
    ySlider: {
        justifySelf: "end",
    },
    yLabel: {
        alignSelf: "end"
    },
    descriptionError: {
      borderColor: "#F44336"
    },
    descriptionNoError: {
      borderColor: "black"
    }
})


export default function NewIdea() {
    const classes = useStyles()
    const [ideaTitle, setIdeaTitle] = useState(null)
    const [ideaDescription, setIdeaDescription] = useState(null)
    const [topicName, setTopicName] = useState(null)
    const [ideaCreated, setIdeaCreated] = useState(false)
    const [potential_difficulty, setPotentialDifficulty] = useState(50)
    const [potential_brightness, setPotentialBrightness] = useState(50)
    const dispatch = useDispatch()
    const filter = createFilterOptions();
    const topic = useSelector(state => state.topic)
    const profileName = useSelector(state => state.profile.profile_name)
    console.log("NewIdea profileName = ", profileName)
    const topicsData = useSelector(state => state.allTopics.topics)
    const [topics, setTopics] = useState([])
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);
    const [ideaTitleError, setIdeaTitleError] = useState(false)
    const [ideaDescriptionError, setIdeaDescriptionError] = useState(false)
    const [ideaDescriptionClass, setIdeaDescriptionClass] = useState(classes.descriptionNoError)
    const [topicNameError, setTopicNameError] = useState(false)
    const [topicDescriptionError, setTopicDescriptionError] = useState(false)

    useEffect(() => {
        dispatch(getAllTopics())
    }, [dispatch])

    useEffect(() => {
        const topics = topicsData.map(topic => topic.topic_name)
        setTopics(topics)
    }, [topicsData])
    
    useEffect(() => {
        if (ideaDescriptionError) {
            setIdeaDescriptionClass(classes.descriptionError)
        }
        else {
            setIdeaDescriptionClass(classes.descriptionNoError)
        }
    }, [ideaDescriptionError, classes.descriptionError, classes.descriptionNoError])

    const required_filled = () => {
        let ideaTitle_filled = ideaTitle !== null && ideaTitle !== "" 
        setIdeaTitleError(!ideaTitle_filled)
        let ideaDescription_filled = ideaDescription !== null && ideaDescription !== "" 
        setIdeaDescriptionError(!ideaDescription_filled)
        let topicName_filled = topicName !== null && topicName !== ""
        setTopicNameError(!topicName_filled)
        var topicDescription_filled = true
        if (open) {
            topicDescription_filled = topic.topicDescription !== null && topic.topicDescription !== "" 
        }
        setTopicDescriptionError(!topicDescription_filled)
        let required_filled = ideaTitle_filled && ideaDescription_filled &&
            topicName_filled && topicDescription_filled
        return required_filled
    }

    const save = () => {
        const required_empty = !required_filled()
        if (required_empty) {
            return
        }
        // Create an object of formData 
        const formData = new FormData();
        formData.append("ideaTitle", ideaTitle)
        formData.append("ideaDescription", ideaDescription)
        formData.append("potentialDifficulty", potential_difficulty)
        formData.append("potentialBrightness", potential_brightness)
        formData.append("topicName", topicName)
        formData.append("topicImage", topic.topicImage)
        formData.append("topicDescription", topic.topicDescription)
        formData.append("profileName", profileName)
        dispatch(createIdea(formData))
        setIdeaCreated(true)
    }


    const updateTitle = (e) => {
        setIdeaTitleError(false)
        setIdeaTitle(e.target.value)
    }
    
    const updateIdeaDescription = (e) => {
        setIdeaDescriptionError(false)
        setIdeaDescription(e.target.value)
    }

    const updateX = (e, newValue) => {
        setPotentialDifficulty(newValue)
    }
    const updateY = (e, newValue) => {
        setPotentialBrightness(newValue)
    }




    const autocompleteChange = (event, newValue) => {
        toggleOpen(false)
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                setValue(newValue)
                setTopicName(newValue)
            });
        } else if (newValue && newValue.inputValue) {
            setValue(newValue.inputValue)
            toggleOpen(true);
            setTopicName(newValue.inputValue)
        } else {
            setValue(newValue);
        }
    }


    if (ideaCreated) {
        dispatch(getAllIdeas())
        return <Redirect to="/" />
    }

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
                        <TextField className={classes.title} variant="outlined" onChange={updateTitle} error={ideaTitleError}/>
                    </div>
                    <div className={classes.potential}>
                        <Typography className={classes.yLabel} variant="subtitle2">Brightness</Typography>
                        <Typography variant="h5">Potential</Typography>
                        <Slider className={classes.ySlider} orientation="vertical" value={potential_brightness} 
                            onChange={updateY} 
                            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                            defaultValue={50} />
                        <Potential x={potential_difficulty} y={potential_brightness} type="create" />
                        <Slider className={classes.xSlider} value={potential_difficulty} 
                            onChange={updateX} 
                            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                            defaultValue={50} />
                        <Typography className={classes.xLabel} variant="subtitle2">Difficulty</Typography>
                    </div>
                </div>
                <Typography variant="h5">Idea Description</Typography>
                <br />
                <TextareaAutosize className={ideaDescriptionClass} style={{width: "100%"}} 
                    aria-label="Bio" rowsMin={10} onChange={updateIdeaDescription} />
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
                            return `Add "${option.inputValue}"`
                        }
                        return option.title;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Select, search, or create." variant="outlined"
                            error={topicNameError} onClick={() => setTopicNameError(false)} />
                    )}
                />
                <br />
                {open &&
                <NewTopic topicDescriptionError={[topicDescriptionError, setTopicDescriptionError]} />
                }
                <Button variant="contained" color="primary" onClick={save} >Save</Button>
            </Paper>
        </form>
    )
}

