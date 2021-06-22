import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const burgerBuilder = (props) =>{
    let state= { 
        ingredients: {
            salad:1,
            bacon:0,
            cheese:2,
            meat:1
        },
        totalPrice: 4,
    };    
    // const addIngredientHandler = (type) =>{
    //     const oldCount = state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updateIngredients = {
    //         ...state.ingredients
    //     };
    //     updateIngredients[type] = updateCount;
    //     const priceAddition = ingredientPrices[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     const [totalPrice, setTotalPrice] = useState(newPrice);
    //     const [ingredients, setIngredients] = useState([{ingredients:updateIngredients}]);

    // }
    // const removeIngredientHandler = (type) => {

    // }
        return(
            
            <Aux>
            
            <Burger ingredients={state.ingredients}></Burger>
            <BuildControls/>
            </Aux>
        );
    
}
export default burgerBuilder;