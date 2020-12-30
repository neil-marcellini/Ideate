import React from 'react'
import { Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        padding: "1rem 0",
        display: "grid",
        gridTemplateColumns: "min-content auto",
        gridColumnGap: "2rem",
        alignItems: "top",
        justifyItems: "left"
    }, 
    profile_photo: {
        width: "2rem",
        height: "2rem"
    }, 
    nameDate: {
        whiteSpace: "nowrap"
    }
})

export default function Comment(props) {
    const comment = props.comment
    const classes = useStyles()

    const s3_url_prefix = "https://ideate-images.s3.amazonaws.com/"
    const profile_photo = s3_url_prefix + comment.profile_photo_file_name

    var datetime = comment.comment_creation
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = datetime.split(/[- : T .]/);

    let year = parseInt(t[0])
    let month = parseInt(t[1]-1)
    let day = parseInt(t[2])
    let hour = parseInt(t[3])
    let minute = parseInt(t[4])
    let second = parseInt(t[5])


    // Apply each element to the Date function
    var utc_date = new Date(Date.UTC(year, month, day, hour, minute, second));

    utc_date.setHours(utc_date.getHours() - 8)
    let dateDisplay = utc_date.toLocaleDateString()
    let timeDisplay = utc_date.toLocaleTimeString()

    return (
        <div className={classes.container}>
            <div>
                <Avatar className={classes.profile_photo} variant="rounded" src={profile_photo} />
            </div>
            <div>
                <p className={classes.nameDate} variant="h6"><b>{comment.comment_profile_name}</b> - {dateDisplay + " at " + timeDisplay}</p>
                <p> {comment.comment_text}</p>
            </div>
        </div>
    )
}
