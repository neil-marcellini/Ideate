import React, { useState, useEffect } from 'react'
import { Paper, TextField, Typography, Button, Chip, IconButton, Avatar} from '@material-ui/core'
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Potential from './Potential';
import AveragePotential from './AveragePotential'

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
    commentBox: {
        width: "50%",
        height: "2rem",
        font: "14px Arial",
        padding: "0.5rem"
    }
})

export default function Idea(props) {
    const idea = props.idea
    const classes = useStyles()
    const [profilePhoto, setProfilePhoto] = useState(null)

    useEffect(() => {
        const arr = new Uint8Array(idea.profile_photo.data)
        const file = new File([arr], "profile_photo")
        const image = URL.createObjectURL(file)
        setProfilePhoto(image)
    }, [idea.profile_photo.data])

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
                <AveragePotential x={idea.potential_difficulty} y={idea.potential_brightness}/>
                <Button className={classes.rate} variant="contained" color="primary">Rate</Button>
            </div>
            
        </Paper>
    )
}
