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

    var datetime = comment.comment_creation
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = datetime.split(/[- : T .]/);
    console.log(t)

    let year = parseInt(t[0])
    let month = parseInt(t[1]-1)
    let day = parseInt(t[2])
    let hour = parseInt(t[3])
    let minute = parseInt(t[4])
    let second = parseInt(t[5])


    // Apply each element to the Date function
    var utc_date = new Date(Date.UTC(year, month, day, hour, minute, second));
    // let local_string = utc_date.toString()
    // console.log(local_string)
    // let date = new Date(local_string)

    // let diff = utc_date.getTimezoneOffset()
    // console.log("time zone offset")
    // console.log(diff)

    // const timeDisplay = utc_date.toLocaleTimeString("en-US", { 
    //     timeZone: "America/Los_Angeles"  
    // }); 
    // const dateDisplay = utc_date.toLocaleDateString("en-US", { 
    //     timeZone: "America/Los_Angeles"  
    // }); 

    utc_date.setHours(utc_date.getHours() - 8)
    let dateDisplay = utc_date.toDateString()
    let timeDisplay = utc_date.toTimeString()

    return (
        <div className={classes.container}>
            <Typography variant="subtitle2">{comment.comment_profile_name} - {dateDisplay + " at " + timeDisplay}</Typography>
            <p> {comment.comment_text}</p>
        </div>
    )
}
