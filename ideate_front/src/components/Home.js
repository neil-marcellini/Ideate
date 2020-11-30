import React, { useState, useEffect } from 'react'
import Idea from './Idea'
import { useDispatch, useSelector } from 'react-redux'
import { getAllIdeas } from '../actions/ideaActions'

export default function Home() {
    const dispatch = useDispatch()
    const ideas = useSelector(state => state.idea.ideas)

    useEffect(() => {
        dispatch(getAllIdeas())
    }, [])

    return (
        <>
            {ideas.map((idea) => (
                <Idea data={idea} />
            ))}
        </>
    )
}
