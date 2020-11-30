import React from 'react'
import { Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    containerGrid: {
        padding: "1rem",
        width: "fit-content",
        display: "grid",
        justifyItems: "center"
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
    const x = props.x
    const y = props.y
    const style_props = {x: `${x-offset}%`, y: `${y}%`}
    const classes = useStyles(props)

    return (
        <div className={classes.containerGrid}>
            <Typography variant="h5">Average Potential</Typography>
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
        </div>
    )
}
