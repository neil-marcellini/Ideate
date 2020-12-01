import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        paddingLeft: "2rem"
    }
})

export default function Comment(props) {
    const comment = props.comment
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="subtitle2"></Typography>
            <p>{comment.comment_profile_name} - {comment.comment_text}</p>
        </div>
    )
}
