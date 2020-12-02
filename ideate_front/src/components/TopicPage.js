import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopicIdeas, clearIdeas } from '../actions/ideaActions'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Idea from './Idea'

const useStyles = makeStyles({
    loading: {
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center"
    }
})


export default function TopicPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const ideas = useSelector(state => state.idea.ideas)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const topic_id = props.match.params.topic_id
        dispatch(getTopicIdeas(topic_id))
        return () => {
            dispatch(clearIdeas())
        }

    }, [])

    useEffect(() => {
        if(ideas.length > 0) {
            console.log("done loading")
            setLoading(false)
        }
    }, [ideas])

    return (
        <>
            {loading &&
            <div className={classes.loading}>
                <CircularProgress />
            </div>
            }
            {!loading &&
            <>
                {ideas.map((idea) => (
                    <Idea key={idea.idea_id} idea={idea} />
                ))}
            </>
            }
            
        </>
    )
}
