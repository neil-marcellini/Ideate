import React, { useState, useEffect } from 'react'

export default function TopicPage(props) {
    const [topicId, setTopicId] = useState(null)

    useEffect(() => {
        const { match: { params } } = props
        setTopicId(params)
    }, [])


    return (
        <div>
            <p> {topicId} </p>
        </div>
    )
}
