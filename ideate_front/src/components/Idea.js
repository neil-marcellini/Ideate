import React, { useState, useEffect } from 'react'
import { Paper, TextField, Typography, Button, Chip, IconButton, Avatar} from '@material-ui/core'
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import Potential from './Potential';
import AveragePotential from './AveragePotential'
import { rate } from '../actions/ideaActions'

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
        height: "2rem",
        font: "14px Arial",
        padding: "0.5rem"
    },
    ratingPotential: {
        marginRight: "3rem"
    }
})

export default function Idea(props) {
    const idea = props.idea
    const classes = useStyles()
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [isRating, setIsRating] = useState(false)
    const dispatch = useDispatch()
    const latestPotential = useSelector(state => state.potential)

    useEffect(() => {
        const arr = new Uint8Array(idea.profile_photo.data)
        const file = new File([arr], "profile_photo")
        const image = URL.createObjectURL(file)
        setProfilePhoto(image)
    }, [idea.profile_photo.data])

    const onRate = () => {
        setIsRating(true)
    }

    const onSave = () => {
        setIsRating(false)
        if (latestPotential.isRating) {
            var data = {}
            data.iteration_id = idea.iteration_id
            data.potential_brightness = latestPotential.y
            data.potential_difficulty = latestPotential.x
            data.profile_name = localStorage.getItem('profile_name')
            console.log("dispatching rating")
            console.log(data)
            dispatch(rate(data))
        }
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
                <textarea className={classes.commentBox} type="text" placeholder="What are your thoughts?" />
            </div>
            <div className={classes.rightColumn}>
                { !isRating &&
                <>
                    <AveragePotential x={idea.potential_difficulty} y={idea.potential_brightness}/>
                    <Button className={classes.rate} variant="contained" 
                    color="primary" onClick={onRate}>Rate</Button>
                    <p>Difficulty={idea.potential_difficulty}, Brightness={idea.potential_brightness}</p>
                </>
                }
                { isRating &&
                <>
                    <Potential className={classes.ratingPotential} x={idea.potential_difficulty} 
                    y={idea.potential_brightness} type="rate" />
                    <Button className={classes.save} variant="contained" onClick={onSave}>Save</Button>
                </>
                }

                
            </div>
            
        </Paper>
    )
}
