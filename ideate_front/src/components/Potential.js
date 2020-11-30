import React, {useState} from 'react'
import { Typography, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch} from "react-redux";
import { updatePotential } from '../actions/potentialActions'


const useStyles = makeStyles({
    containerGrid: {
        padding: "1rem",
        marginRight: "2.7rem",
        width: "fit-content",
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(4, auto)",
        gridColumnGap: "0.5rem",
        gridRowGap: "0.5rem",
    },
    box: {
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        position: "relative",
        width: "100px",
        height: "100px",
        border: "1px solid black",
        borderCollapse: "collapse",
        backgroundColor: "#4CB1F7",

        '& tr': {
            border: "1px solid black",
            borderCollapse: "collapse"
        },
        '& td': {
            border: "1px solid black",
            borderCollapse: "collapse"
        }
    },
    symbol: {
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        width: "16px",
        height: "16px",
        position: "absolute",
        left: props => props.x,
        bottom: props => props.y
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
    }
})


export default function Potential(props) {

    const offset = 8
    
    const [x, setX] = useState(props.x)
    const [y, setY] = useState(props.x)
    const style_props = {x: `${x-offset}%`, y: `${y}%`}
    const classes = useStyles(style_props)
    const dispatch = useDispatch()
    
    const onAnyChange = () => {
        dispatch(updatePotential({x, y}))
    }

    const updateX = (e, newValue) => {
        setX(newValue)
        onAnyChange()
    }
    const updateY = (e, newValue) => {
        setY(newValue)
        onAnyChange()
    }
    

    return (
        <div className={classes.containerGrid}>
            <Typography className={classes.yLabel} variant="subtitle2">Brightness</Typography>
            <Typography variant="h5">Potential</Typography>
            <Slider className={classes.ySlider} orientation="vertical" value={y} 
            onChange={updateY} 
            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
            defaultValue={50} />
            <table className={classes.box}>
                <tbody>
                    <tr>
                        <td /><td />
                    </tr>
                    <tr>
                        <td> <div className={classes.symbol}>💡</div></td><td />
                    </tr>
                </tbody>
            </table>
            <Slider className={classes.xSlider} value={x} 
            onChange={updateX} 
            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
            defaultValue={50} />
            <Typography className={classes.xLabel} variant="subtitle2">Difficulty</Typography>
        </div>
    )
}
