import React, {useState, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    container : {
        padding: "1rem",
        width: "fit-content"
    },
    box: {
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        position: "relative",
        width: "100px",
        height: "100px",
        border: "1px solid black"
    },
    symbol: {
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        width: "16px",
        height: "16px",
        position: "absolute",
        left: props => props.x,
        top: props => props.y
    }
})


export default function Potential() {

    const offset = 8
    
    const [x, setX] = useState(50)
    const [y, setY] = useState(0)
    const props = {x: `${x-offset}%`, y: `${y-offset}%`}
    const classes = useStyles(props)

    
    

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <div className={classes.symbol}>💡</div>
            </div>
            <Slider value={x} onChange={(e, newValue) => setX(newValue)} aria-labelledby="continuous-slider" />
        </div>
    )
}
