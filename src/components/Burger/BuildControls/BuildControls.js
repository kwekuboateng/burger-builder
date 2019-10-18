import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
    
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                
                label={ctrl.label} 
                key={ctrl.label}
                added={() => props.addedIngredient(ctrl.type)}
                removed={() => props.removedIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                
                />
            })}
            <button disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;