import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper, Typography, Button, Slider } from '@material-ui/core'
import './NewIteration.css'
import Potential from './Potential'
import { newIteration } from '../actions/ideaActions'

class NewIteration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            potential_difficulty: 50,
            potential_brightness: 50,
            description: ""
        }
    }

    updateX = (e, newValue) => {
        this.setState({potential_difficulty: newValue})
    }
    updateY = (e, newValue) => {
        this.setState({potential_brightness: newValue})
    }

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    }

    onSave = () => {
        //dispatch
        const state = this.state
        const idea_id = this.props.idea_id
        const profile_name = this.props.profile_name
        const data = {
            ...state,
            idea_id,
            profile_name
        }               
        this.props.newIteration(data)
        this.props.close()
    }

    render() {
        return (
            <Paper tabIndex={-1} className="paper">
                <div className="leftColumn">
                    <Typography variant="h4">Iterating: {this.props.idea_title}</Typography>
                    <br />
                    <Typography variant="h5">Description</Typography>
                    <br />
                    <textarea className="description" type="text" 
                    placeholder="Iterate the description, improve your idea!"
                    onChange={this.onDescriptionChange} />
                    <br />
                    <br />
                    <div className="actionButtons">
                        <Button variant="contained" color="primary" onClick={this.onSave}>Save</Button>
                        <Button variant="contained" onClick={this.props.close}>Cancel</Button>
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="potential">
                        <Typography className="yLabel" variant="subtitle2">Brightness</Typography>
                        <Typography variant="h5">Potential</Typography>
                        <Slider className="ySlider" orientation="vertical" value={this.state.potential_brightness} 
                        onChange={this.updateY} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Potential x={this.state.potential_difficulty} y={this.state.potential_brightness} type="create" />
                        <Slider className="xSlider" value={this.state.potential_difficulty} 
                        onChange={this.updateX} 
                        aria-labelledby="continuous-slider" valueLabelDisplay="auto"
                        defaultValue={50} />
                        <Typography className="xLabel" variant="subtitle2">Difficulty</Typography>
                    </div>    
                </div>
    
            </Paper>
        )
    }
}

const mapDispatchToProps = {
    newIteration
}
export default connect(null, mapDispatchToProps) (NewIteration)
