import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTopics } from '../actions/allTopicActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Topic from './Topic'


const useStyles = makeStyles({
    loading: {
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center"
    },
    topicsGrid: {
        padding: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
        gridGap: "1rem",
        justifyItems: "center"
    }
})

export default function Topics() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const topics = useSelector(state => state.allTopics.topics)
    const classes = useStyles()

    useEffect(() => {
        console.log("dispatching")
        dispatch(getAllTopics())
    }, [])

    useEffect(() => {
        if(topics.length > 0) {
            console.log("done loading")
            setLoading(false)
        }
    }, [topics])

    return (
        <>
            {loading &&
            <div className={classes.loading}>
                <CircularProgress />
            </div>
            }
            <div className={classes.topicsGrid}>
                {topics.map((topic) => (
                    <Topic key={topic.topic_id} topic={topic} />
                ))}
            </div>
        </>
    )
}
