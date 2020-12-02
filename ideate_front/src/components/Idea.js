import React, { useState, useEffect, useRef } from 'react'
import { Paper, Slider, Typography, IconButton, Button, ButtonGroup, Chip, Avatar} from '@material-ui/core'
import { AddBox, IndeterminateCheckBox, Check, Close, Send } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import Potential from './Potential';
import AveragePotential from './AveragePotential'
import { rate, addComment, seeMore } from '../actions/ideaActions'
import Comment from './Comment'

const useStyles = makeStyles({
    paper: {
        maxWidth: "960px",
        margin: "auto",
        marginTop: "2rem",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "auto auto"
    },
    profile: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline"
    },
    profilePic: {
        width: "3rem",
        height: "3rem"
    },
    profileName: {
        padding: "0.5rem"
    },
    iteration: {
        marginLeft: "3rem",
        width: "fit-content",
        display: "grid",
        gridTemplateRows: "auto auto",
        justifyItems: "center"
    },
    HStack: {
        display: "flex",
        flexDirection: "row"
    },
    rightColumn: {
        display: "grid",
        gridTemplateRows: "auto auto",
        justifyItems: "center"
    },
    rate: {
        width: "fit-content",
        height: "fit-content"
    },
    save: {
        color: "green",
        marginLeft: "2rem"
    },
    commentBox: {
        width: "50%",
        height: "3rem",
        font: "14px Arial",
        padding: "0.5rem"
    },
    ratingPotential: {
        marginRight: "3rem"
    },
    potential: {
        padding: "1rem",
        marginRight: "2.7rem",
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
    seeMore: {
        textDecoration: "underline",
        color: "blue"
    }
})

export default function Idea(props) {
    const idea = props.idea
    const classes = useStyles()
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [isRating, setIsRating] = useState(false)
    const [potential_difficulty, setPotentialDifficulty] = useState(idea.potential_difficulty)
    const [potential_brightness, setPotentialBrightness] = useState(idea.potential_brightness)
    const [comment, setComment] = useState("")
    const commentBox = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const arr = new Uint8Array(idea.profile_photo.data)
        const file = new File([arr], "profile_photo")
        const image = URL.createObjectURL(file)
        setProfilePhoto(image)
    }, [idea.profile_photo.data])

    const onRate = () => {
        setIsRating(true)
        setPotentialDifficulty(idea.potential_difficulty)
        setPotentialBrightness(idea.potential_brightness)
    }

    const onSave = () => {
        setIsRating(false)
        const difficulty_unchanged = potential_difficulty === idea.potential_difficulty
        const brightness_unchanged = potential_brightness === idea.potential_brightness
        const unchanged = brightness_unchanged && difficulty_unchanged
        if (!unchanged) {
            var data = {}
            data.iteration_id = idea.iteration_id
            data.potential_brightness = potential_brightness
            data.potential_difficulty = potential_difficulty
            data.profile_name = localStorage.getItem('profile_name')
            console.log("dispatching rating")
            console.log(data)
            dispatch(rate(data))
        }
    }
    const onCancel = () => {
        setIsRating(false)
        setPotentialDifficulty(idea.potential_difficulty)
        setPotentialBrightness(idea.potential_brightness)
    }

    const updateX = (e, newValue) => {
        setPotentialDifficulty(newValue)
    }
    const updateY = (e, newValue) => {
        setPotentialBrightness(newValue)
    }

    const onComment = () => {
        setComment("")
        commentBox.current.value = ""
        const data = {
            iteration_id: idea.iteration_id,
            profile_name: localStorage.getItem("profile_name"),
            comment
        }
        dispatch(addComment(data))
    }

    const onSeeMore = () => {
        dispatch(seeMore(idea.iteration_id))
    }

    return (
        <Paper className={classes.paper}>
            <div>
                <Chip label={idea.topic_name} />
                <div className={classes.HStack}>
                    <Typography variant="h3">{idea.idea_name}</Typography>
                    <div className={classes.iteration}>
                        <Typography variant="subtitle1">Iteration</Typography>
                        <div>
                            <IconButton><IndeterminateCheckBox /></IconButton>
                            <span>0</span>
                            <IconButton><AddBox /></IconButton>
                        </div>
                    </div>
                </div>
                <div className={classes.profile}>
                        <Avatar className={classes.profilePic} variant="rounded" src={profilePhoto} />
                        <Typography className={classes.profileName} variant="subtitle2">{idea.profile_name}</Typography>
                </div>
                <p>{idea.iteration_description}</p>
                <br />
                <hr />
                <Typography variant="h6">Comments</Typography>
                {idea.comments.map((comment) => (
                <Comment key={comment.comment_id} comment={comment} />
                ))}
                <Button className={classes.seeMore} onClick={onSeeMore}>See More</Button>
                <br />
                <textarea className={classes.commentBox} type="text" ref={commentBox}
                    placeholder="What are your thoughts?" onChange={(e) => setComment(e.target.value)} />
                <br />
                <br />
                <Button variant="contained" color="secondary" 
                disabled={comment === ""} endIcon={<Send />} onClick={onComment}>Comment</Button>
            </div>
            <div className={classes.rightColumn}>
                { !isRating &&
                <>
                    <AveragePotential x={idea.potential_difficulty} y={idea.potential_brightness}/>
                    <Button className={classes.rate} variant="contained" 
                    color="primary" onClick={onRate}>Rate</Button>
                </>
                }
                { isRating &&
                <>
                    <div className={classes.potential}>
                        <Typography className={classes.yLabel} variant="subtitle2">Brightness</Typography>
                        <Typography variant="h5">Potential</Typography>
                        <Slider className={classes.ySlider} orientation="vertical" value={potential_brightness} 
                        onChange={updateY} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Potential x={idea.potential_difficulty} y={idea.potential_brightness} type="create" />
                        <Slider className={classes.xSlider} value={potential_difficulty} 
                        onChange={updateX} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Typography className={classes.xLabel} variant="subtitle2">Difficulty</Typography>
                        <p></p>
                        <ButtonGroup size="small">
                            <Button color="secondary" variant="contained" onClick={onCancel}><Close /></Button>
                            <Button color="primary" variant="contained" onClick={onSave}><Check /></Button>
                        </ButtonGroup>
                    </div>
                    
                </>
                }  
            </div>
            
        </Paper>
    )
}
