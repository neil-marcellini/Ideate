import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    containerGrid: {
        padding: "1rem",
        width: "fit-content",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "auto auto"
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
            <Slider orientation="vertical" value={y} onChange={(e, newValue) => setY(newValue)} aria-labelledby="continuous-slider" />
            <table className={classes.box}>
                <tr>
                    <td /><td />
                </tr>
                <tr>
                    <td> <div className={classes.symbol}>💡</div></td> <td />
                </tr>
            </table>
            <Slider className={classes.xSlider} value={x} onChange={(e, newValue) => setX(newValue)} aria-labelledby="continuous-slider" />
        </div>
    )
}
