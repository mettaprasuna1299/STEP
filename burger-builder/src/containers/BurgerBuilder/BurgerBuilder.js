import React, { useState, useEffect } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";



const INGREDIENT_PRICES={
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:0.7

};

const burgerBuilder = (props) => {

  const [ingredients, setIngredients] = useState({
        salad:0,
        bacon:0,
        cheese:0,
        meat:0

  });
  const [totalPrice,setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false)

  // let state={
  //     ingredients:{
  //       salad:0,
  //       bacon:0,
  //       cheese:0,
  //       meat:0
  //     },
  //     totalPrice:4,
  //     purchasable: false,
  //     purchasing:false
  // }

  const updatePurchaseState = (ingredients)=>{

    const sum = Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum + el;
    },0);
    setPurchasable(sum>0);
  }
  const addIngredientHandler=(type)=>{
    const oldCount= ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
        ...ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition=INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice  = oldPrice+priceAddition;
    //this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  }

  const removeIngredientHandler=(type)=>
  {
    const oldCount=ingredients[type];
    if(oldCount<=0)
    {
      return;
    }
    const updatedCount=oldCount-1;
    const updatedIngredients={
      ...ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduction=INGREDIENT_PRICES[type];
    const oldPrice=totalPrice;
    const newPrice=oldPrice-priceDeduction;
    // this.setState({
    //   totalPrice:newPrice,ingredients:updatedIngredients
    // });
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  }


  const purchaseHandler=()=>{
    //this.setState({purchasing:true});
    setPurchasing(true);
  }
  const purchaseCancelhandler = () => {
    //this.setState({purchasing: false})
    setPurchasing(false);
  }
  const purchaseContinueHandler = () => {
    alert('You Continue!!');
  }  
    const disableInfo={
      ...ingredients
    }
    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0 ;
    }
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
            <OrderSummary 
            ingredients={ingredients}
            burgerPrice={totalPrice}
            purchaseCancel={purchaseCancelhandler}
            purchaseContinue={purchaseContinueHandler} />
        </Modal>
         <Burger ingredients={ingredients}/>
         <BuildControls
         ingredientAdded={addIngredientHandler}
         ingredientRemoved = {removeIngredientHandler}
         disabled = {disableInfo}
         purchasable={purchasable}
         ordered={purchaseHandler}
         price={totalPrice}
         />
        
      </Aux>
    );
  }


export default burgerBuilder;