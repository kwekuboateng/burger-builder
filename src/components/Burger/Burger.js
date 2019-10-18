import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props.ingredients, 'props')

    let transIngredient = Object.keys( props.ingredients )
    .map(IngKey => {
        return [...Array(props.ingredients[IngKey])].map((_, i) => {
            return <BurgerIngredient key={IngKey + i} type={IngKey}/>
        })
    }).reduce((acc, el) => {
        return acc.concat(el)
    }, []);

    if(transIngredient.length === 0 ){
        transIngredient = <p>Please start adding Ingredients</p>
    }
    console.log(transIngredient )
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transIngredient}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    )
}

export default burger;