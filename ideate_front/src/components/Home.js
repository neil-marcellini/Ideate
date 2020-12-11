import React, { useState, useEffect } from 'react'
import Idea from './Idea'
import { useDispatch, useSelector } from 'react-redux'
import { getAllIdeas, clearIdeas } from '../actions/ideaActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    loading: {
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center"
    }
})

export default function Home() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const ideas = useSelector(state => state.idea.ideas)
    const classes = useStyles()

    useEffect(() => {
        dispatch(getAllIdeas())
        // return () => {
        //     dispatch(clearIdeas())
        // }
    }, [])

    useEffect(() => {
        if(ideas.length > 0) {
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
            {ideas.map((idea) => (
                <Idea key={idea.idea_id} idea={idea} />
            ))}
        </>
    )
}
