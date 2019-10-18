import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-5f568.firebaseio.com/ingredients')
        .then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error: true})
        })
    }
    
    updatePurchasableState = (ingredients) => {
       const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey]
        })
        .reduce((accu, ele) => {
           return accu + ele
        },0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});  
        this.updatePurchasableState(updatedIngredients)  
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return null;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});  
        this.updatePurchasableState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    continueOrderHandler = () => {

        this.setState({loading: true})
        const items = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customerDetails: {
                name: 'Fred',
                email: 'fred@email.com',
                phone: '0987654321',
                location: {
                    street: 'banana street',
                    country: 'Ghana',
                    state: 'Greater Accra'
                }
            }
        }

        axios.post('/orders.json', items)
        .then(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false})
        }).catch(error => {
            console.log(error); 
            this.setState({loading: false, purchasing: false})
        })
    }


    render() {
        const disableIngredient = {
            ...this.state.ingredients
        }
        for(var key in disableIngredient){
            disableIngredient[key] = disableIngredient[key] <= 0
        };

        let orderSummary = null;

        let myburger = this.state.error? <p>No ingredient added</p> : <Spinner/>;

        if(this.state.ingredients){
            myburger = (<Aux>
                         <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        addedIngredient={this.addIngredientHandler}
                        removedIngredient={this.removeIngredientHandler}
                        disabled={disableIngredient}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}/>
                    </Aux>
            );

             orderSummary =  <OrderSummary ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            price={this.state.totalPrice}
            continue={this.continueOrderHandler}
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {myburger}
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios)