import React, {useState, useRef} from 'react'
import { TextareaAutosize, Typography, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { AddAPhoto } from '@material-ui/icons';
import { useDispatch} from "react-redux";
import { updateTopicImage, updateTopicDescription } from '../actions/topicActions'


const useStyles = makeStyles({
    imageUpload: {
        display: "none"
    },
    photoDisplay: {
        width: "20rem",
        height: "15rem"
    },

})



export default function NewTopic(props) {
    const inputElement = useRef(null)
    const [avatarSrc, setAvatarSrc] = useState(null)
    const [photoSizeError, setPhotoSizeError] = useState(null)
    const MAX_FILE_SIZE = 16000000

    const classes = useStyles()
    const dispatch = useDispatch()
    

    const onFileChange = (e) => {
        var file = null
        if(!e.target.files.length) {
            setAvatarSrc(null)
            setPhotoSizeError(null)
        } else {
            file = e.target.files[0]
            setAvatarSrc(URL.createObjectURL(file))
            if (file.size > MAX_FILE_SIZE) {
                setPhotoSizeError("Error: max size 16mb.")
            } else {
                setPhotoSizeError(null)
            }
        }
        dispatch(updateTopicImage(file))
    }

    const updateDescription = (e) => {
        const description = e.target.value
        dispatch(updateTopicDescription(description))
    }

    return (
        <>
            <Typography variant="h5">Photo</Typography>
            <br />
            <input className={classes.imageUpload} ref={inputElement} type="file" name="topic" accept="image/*" onChange={onFileChange} />
            <Avatar className={classes.photoDisplay} variant="rounded" src={avatarSrc} onClick={() => inputElement.current.click()}
                error={props.topicImageError}>
                <AddAPhoto />
            </Avatar>
            <br />
            <Typography variant="h5">Description</Typography>
            <br />
            <TextareaAutosize style={{width: "100%"}} 
                    aria-label="Description" rowsMin={10} onChange={updateDescription} 
                    error={props.topicDescriptionError}/>
            <br />
        </>
    )
}
