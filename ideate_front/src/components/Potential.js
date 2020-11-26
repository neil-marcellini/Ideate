import React, {useState} from 'react'
import { Typography, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    containerGrid: {
        padding: "1rem",
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


export default function Potential() {

    const offset = 8
    
    const [x, setX] = useState(50)
    const [y, setY] = useState(50)
    const props = {x: `${x-offset}%`, y: `${y}%`}
    const classes = useStyles(props)

    
    

    return (
        <div className={classes.containerGrid}>
            <Typography className={classes.yLabel} variant="subtitle2">Brightness</Typography>
            <Typography variant="h5">Potential</Typography>
            <Slider className={classes.ySlider} orientation="vertical" value={y} 
            onChange={(e, newValue) => setY(newValue)} 
            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
            defaultValue={50} />
            <table className={classes.box}>
                <tr>
                    <td /><td />
                </tr>
                <tr>
                    <td> <div className={classes.symbol}>💡</div></td> <td />
                </tr>
            </table>
            <Slider className={classes.xSlider} value={x} 
            onChange={(e, newValue) => setX(newValue)} 
            aria-labelledby="continuous-slider" valueLabelDisplay="auto"
            defaultValue={50} />
            <Typography className={classes.xLabel} variant="subtitle2">Difficulty</Typography>
        </div>
    )
}
