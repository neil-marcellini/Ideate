import React from 'react'

export default function Topic(props) {
    const topic = props.topic
    return (
        <div>
            <p>{topic.topic_name}</p>
            <p>{topic.topic_description}</p>
        </div>
    )
}
