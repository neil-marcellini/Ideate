import React, { Component } from 'react'
import { Paper, Typography, Button, Slider } from '@material-ui/core'
import './NewIteration.css'
import Potential from './Potential'

export default class NewIteration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            potential_difficulty: 50,
            potential_brightness: 50
        }
    }

    updateX = (e, newValue) => {
        this.setState({potential_difficulty: newValue})
    }
    updateY = (e, newValue) => {
        this.setState({potential_brightness: newValue})
    }

    render() {
        return (
            <Paper tabIndex={-1} className="paper">
                <div className="leftColumn">
                    <Typography variant="h4">Iterating: {this.props.idea_title}</Typography>
                    <br />
                    <Typography variant="h5">Description</Typography>
                    <br />
                    <textarea className="description" type="text" placeholder="Iterate the description, improve your idea!" />
                    <br />
                    <br />
                    <div className="actionButtons">
                        <Button variant="contained" color="primary">Save</Button>
                        <Button variant="contained">Cancel</Button>
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

