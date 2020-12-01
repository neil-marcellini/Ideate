import React, {useState} from 'react'
import { Typography, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch} from "react-redux";
import { ratePotential, updatePotential } from '../actions/potentialActions'


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
    }
})


export default function Potential(props) {

    const offset = 8
    const potential_type = props.type
    
    const style_props = {x: `${props.x-offset}%`, y: `${props.y}%`}
    const classes = useStyles(style_props)

    return (
        <div >
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
