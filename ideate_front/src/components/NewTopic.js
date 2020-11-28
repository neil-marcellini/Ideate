import React, {useState, useRef} from 'react'
import { TextareaAutosize, Typography, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    imageUpload: {
        display: "none"
    },
    photoDisplay: {
        width: "5em",
        height: "5em"
    },

})



export default function NewTopic() {
    const inputElement = useRef(null)
    const [topicDescription, setTopicDescription] = useState(null)
    const [avatarSrc, setAvatarSrc] = useState(null)
    const [topicImage, setTopicImage] = useState(null);
    const [photoSizeError, setPhotoSizeError] = useState(null)
    const MAX_FILE_SIZE = 16000000

    const classes = useStyles()

    const onFileChange = (e) => {
        if(!e.target.files.length) {
            setAvatarSrc(null)
            setTopicImage(null)
            setPhotoSizeError(null)
        } else {
            const file = e.target.files[0]
            setTopicImage(file)
            setAvatarSrc(URL.createObjectURL(file))
            if (file.size > MAX_FILE_SIZE) {
                setPhotoSizeError("Error: max size 16mb.")
            } else {
                setPhotoSizeError(null)
            }
        }
    }

    return (
        <>
            <Typography variant="h5">Photo</Typography>
            <input className={classes.imageUpload} ref={inputElement} type="file" name="topic" accept="image/*" onChange={onFileChange} />
            <Avatar className={classes.photoDisplay} variant="rounded" src={avatarSrc}/>
            <Typography variant="h5">Description</Typography>
            <TextareaAutosize style={{width: "100%"}} 
                    aria-label="Description" rowsMin={10} onChange={(e) => {
                    setTopicDescription(e.target.value)}} />
            
        </>
    )
}
