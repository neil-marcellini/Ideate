import React, { useState, useEffect } from 'react'

export default function TopicPage(props) {
    const [topicId, setTopicId] = useState(null)

    useEffect(() => {
        console.log(props)
        setTopicId(props.match.params.topic_id)
    }, [])


    return (
        <div>
            <h1> Topic page</h1>
            <p>{topicId}</p>
        </div>
    )
}
