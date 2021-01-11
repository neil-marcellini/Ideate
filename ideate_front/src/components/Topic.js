import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Chip, Avatar} from '@material-ui/core'


const useStyles = makeStyles({
    container: {
        padding: "1rem",
        display: "grid",
        gridTemplateRows: "auto auto auto",
        gridRowGap: "0.5rem",
        justifyItems: "center",
        width: "fit-content",
        height: "fit-content"
    },
    photo: {
        width: "10rem",
        height: "10rem"
    },
    description: {
        width: "80%",
        height: "5rem",
        overflow: "scroll"
    }
})


export default function Topic(props) {
    const classes = useStyles()
    const topic = props.topic
    const s3_url_prefix = "https://ideate-images.s3.amazonaws.com/"


    return (
        <Paper className={classes.container}>
            <Chip label={topic.topic_name}/>
            <Avatar className={classes.photo} src={s3_url_prefix + topic.topic_photo_file_name} variant="rounded"/>
            <div className={classes.description}>
                <Typography variant="subtitle2"><b>Description:</b></Typography>
                <p>{topic.topic_description}</p>
            </div>
        </Paper>
    )
}
