import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Chip, Avatar} from '@material-ui/core'


const useStyles = makeStyles({
    container: {
        display: "grid",
        placeItems: "center"
    },
    photo: {
        width: "5rem",
        height: "5rem"
    }
})


export default function Topic(props) {
    const classes = useStyles()
    const topic = props.topic
    const [topicPhoto, setTopicPhoto] = useState(null)


    useEffect(() => {
        const arr = new Uint8Array(topic.topic_photo.data)
        const file = new File([arr], "topic_photo")
        const image = URL.createObjectURL(file)
        setTopicPhoto(image)
    }, [topic.topic_photo.data])

    return (
        <Paper className={classes.container}>
            <Typography variant="h3">{topic.topic_name}</Typography>
            <Avatar className={classes.photo} src={topicPhoto}/>
            <p>{topic.topic_description}</p>
        </Paper>
    )
}
