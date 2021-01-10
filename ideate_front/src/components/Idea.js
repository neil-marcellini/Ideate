import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Paper, Slider, Typography, IconButton, 
    Button, ButtonGroup, Chip, Avatar, CircularProgress,
    Modal
} from '@material-ui/core'
import { AddBox, IndeterminateCheckBox, Check, Close, Send } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import Potential from './Potential';
import AveragePotential from './AveragePotential'
import { rate, addComment, seeMore, seeLess, fetchLatestComment, nextIteration } from '../actions/ideaActions'
import Comment from './Comment'
import NewIteration from './NewIteration'

const useStyles = makeStyles({
    paper: {
        maxWidth: "960px",
        margin: "auto",
        marginTop: "2rem",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "auto auto"
    },
    profile: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline"
    },
    profilePic: {
        width: "3rem",
        height: "3rem"
    },
    profileName: {
        padding: "0.5rem"
    },
    iteration: {
        marginLeft: "3rem",
        width: "fit-content",
        display: "grid",
        gridTemplateRows: "auto auto auto",
        justifyItems: "center"
    },
    HStack: {
        display: "flex",
        flexDirection: "row"
    },
    rightColumn: {
        display: "grid",
        gridTemplateRows: "auto auto",
        justifyItems: "center"
    },
    rate: {
        width: "fit-content",
        height: "fit-content"
    },
    save: {
        color: "green",
        marginLeft: "2rem"
    },
    commentBox: {
        width: "50%",
        height: "3rem",
        font: "14px Arial",
        padding: "0.5rem"
    },
    ratingPotential: {
        marginRight: "3rem"
    },
    potential: {
        padding: "1rem",
        marginRight: "2.7rem",
        width: "fit-content",
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(4, auto)",
        gridColumnGap: "0.5rem",
        gridRowGap: "0.5rem",
    },
    ratingContainer: {
        width: "fit-content",
        height: "fit-content",
        display: "grid",
        placeItems: "center"
    },
    xSlider: {
        width: "100px",
        gridColumn: "2 / 2"
    },
    xLabel: {
        gridColumn: "2 / 2",
        justifySelf: "center"
    },
    ySlider: {
        justifySelf: "end",
    },
    yLabel: {
        alignSelf: "end"
    },
    seeAll: {
        textDecoration: "underline",
        color: "blue"
    }
})

export default function Idea(props) {
    const idea = props.idea
    const classes = useStyles()
    const [isRating, setIsRating] = useState(false)
    const [potential_difficulty, setPotentialDifficulty] = useState(idea.potential_difficulty)
    const [potential_brightness, setPotentialBrightness] = useState(idea.potential_brightness)
    const [comment, setComment] = useState("")
    const [commentsLoading, setCommentsLoading] = useState(false)
    const commentBox = useRef(null)
    const dispatch = useDispatch()
    const hasComments = idea.comments.length > 0
    var showSeeLess = idea.comments.length > 1
    const showSeeAll = idea.total_comments > 1
    const [creatingIteration, setCreatingIteration] = useState(false);
    const profile_name = localStorage.getItem("profile_name")
    const s3_url_prefix = "https://ideate-images.s3.amazonaws.com/"
    var add_iter_disabled = profile_name !== idea.profile_name && idea.iteration_num + 1 === idea.total_iterations

    useEffect(() => {
        if (showSeeLess) {
            setCommentsLoading(false)
        }
    }, [showSeeLess])

    useEffect(() => {
        let comments_empty = idea.comments.length === 0
        let more_comments = idea.total_comments > 0
        let fetch_latest_comment = comments_empty && more_comments
        console.log("comments_empty = ", comments_empty)
        console.log("more_comments = ", more_comments)
        if (fetch_latest_comment) {
            console.log("fetchingLatestComment")
            dispatch(fetchLatestComment(idea.iteration_id))
        }
    }, [idea.comments, idea.total_comments, idea.iteration_id, dispatch])

    const onRate = () => {
        setIsRating(true)
        setPotentialDifficulty(idea.potential_difficulty)
        setPotentialBrightness(idea.potential_brightness)
    }

    const onSave = () => {
        setIsRating(false)
        const difficulty_unchanged = potential_difficulty === idea.potential_difficulty
        const brightness_unchanged = potential_brightness === idea.potential_brightness
        const unchanged = brightness_unchanged && difficulty_unchanged
        if (!unchanged) {
            var data = {}
            data.iteration_id = idea.iteration_id
            data.potential_brightness = potential_brightness
            data.potential_difficulty = potential_difficulty
            data.profile_name = profile_name
            dispatch(rate(data))
        }
    }
    const onCancel = () => {
        setIsRating(false)
        setPotentialDifficulty(idea.potential_difficulty)
        setPotentialBrightness(idea.potential_brightness)
    }

    const updateX = (e, newValue) => {
        setPotentialDifficulty(newValue)
    }
    const updateY = (e, newValue) => {
        setPotentialBrightness(newValue)
    }

    const onComment = () => {
        setComment("")
        commentBox.current.value = ""
        const data = {
            iteration_id: idea.iteration_id,
            profile_name,
            comment
        }
        dispatch(addComment(data))
    }

    const onSeeAll = () => {
        setCommentsLoading(true)
        dispatch(seeMore(idea.iteration_id))
    }

    const onSeeLess = () => {
        dispatch(seeLess(idea))
    }

    const handleModalOpen = () => {
        if(profile_name === idea.profile_name){
            setCreatingIteration(true)
        }
    }

    const handleModalClose = () => {
        setCreatingIteration(false)
    }
    
    const plusIteration = () => {
        let has_another_iter = idea.iteration_num + 1 < idea.total_iterations
        console.log("has_another_iter = ", has_another_iter)
        if (has_another_iter) {
            dispatch(nextIteration(idea.idea_id, idea.iteration_num + 1))
        }
        else {
            handleModalOpen()
        }

    }

    const minusIteration = () => {
        let has_lower_iter = idea.iteration_num > 0
        if (has_lower_iter) {
            dispatch(nextIteration(idea.idea_id, idea.iteration_num - 1))
        }
    }

    return (
        <Paper className={classes.paper}>
            <div>
                <Chip label={idea.topic_name} />
                <div className={classes.HStack}>
                    <Typography variant="h3">{idea.idea_name}</Typography>
                    <div className={classes.iteration}>
                        <Typography variant="subtitle1">Iteration</Typography>
                        <div>
                            <IconButton onClick={minusIteration}><IndeterminateCheckBox /></IconButton>
                            <span>{idea.iteration_num}</span>
                            <IconButton onClick={plusIteration} disabled={add_iter_disabled}><AddBox /></IconButton>
                            <Modal
                                open={creatingIteration}
                                onClose={handleModalClose}
                                aria-labelledby="New Iteration"
                                aria-describedby="Create a new iteration of this idea"
                            >
                                <NewIteration idea_title={idea.idea_name} close={handleModalClose} 
                                    idea_id={idea.idea_id} profile_name={profile_name}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className={classes.profile}>
                        <Avatar className={classes.profilePic} variant="rounded"
                            src={s3_url_prefix + idea.profile_photo_file_name} /> 
                        <Typography className={classes.profileName} variant="subtitle2">{idea.profile_name}</Typography>
                </div>
                <p>{idea.iteration_description}</p>
                <br />
                <hr />
                <Typography variant="h6">Comments - {idea.total_comments}</Typography>
                {hasComments && 
                <>
                    {idea.comments.map((comment) => (
                        <Comment key={comment.comment_id} comment={comment} />
                    ))}
                </>
                }
                
                {!showSeeLess && hasComments && showSeeAll &&
                <div className={classes.seeAllSection}>
                    <Button className={classes.seeAll} onClick={onSeeAll}>See All</Button>
                    {commentsLoading &&
                    <CircularProgress size="1rem" />
                    }
                </div>
                }

                {!hasComments &&
                    <Typography variant="subtitle1"> No one has commented yet. Be the first! </Typography>
                }
                
                {showSeeLess &&
                <Button className={classes.seeAll} onClick={onSeeLess}>See Less</Button>
                }
                <br />
                <textarea className={classes.commentBox} type="text" ref={commentBox}
                    placeholder="What are your thoughts?" onChange={(e) => setComment(e.target.value)} />
                <br />
                <br />
                <Button variant="contained" color="secondary" 
                disabled={comment === ""} endIcon={<Send />} onClick={onComment}>Comment</Button>
            </div>
            <div className={classes.rightColumn}>
                <div className={classes.ratingContainer}>
                { !isRating &&
                <>
                    <AveragePotential x={idea.potential_difficulty} y={idea.potential_brightness}/>
                    <Button className={classes.rate} variant="contained" 
                    color="primary" onClick={onRate}>Rate</Button>
                </>
                }
                { isRating &&
                <>
                    <div className={classes.potential}>
                        <Typography className={classes.yLabel} variant="subtitle2">Brightness</Typography>
                        <Typography variant="h5">Potential</Typography>
                        <Slider className={classes.ySlider} orientation="vertical" value={potential_brightness} 
                        onChange={updateY} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Potential x={potential_difficulty} y={potential_brightness} type="create" />
                        <Slider className={classes.xSlider} value={potential_difficulty} 
                        onChange={updateX} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Typography className={classes.xLabel} variant="subtitle2">Difficulty</Typography>
                        <p></p>
                        <ButtonGroup size="small">
                            <Button color="secondary" variant="contained" onClick={onCancel}><Close /></Button>
                            <Button color="primary" variant="contained" onClick={onSave}><Check /></Button>
                        </ButtonGroup>
                    </div>
                    
                </>
                }
                </div>

            </div>
            
        </Paper>
    )
}

