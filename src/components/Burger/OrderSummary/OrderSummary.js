import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    UNSAFE_componentWillUpdate(){
        console.log('ORDERSUMMARYRE-RENDERS')
    }
    render(){
        const orderIngredients = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span>{igKey}: {this.props.ingredients[igKey]}</span>
            </li>)
        });
        return (
            <Aux>
        <p>Your Order</p>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
            {orderIngredients}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancel} btnType="Danger">Cancel</Button>
        <Button clicked={this.props.continue} btnType="Success">Continue</Button>
        </Aux>
        )
    }
}


export default OrderSummary;