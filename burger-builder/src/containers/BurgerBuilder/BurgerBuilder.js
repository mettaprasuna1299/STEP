import React, { useEffect, useState } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-order';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES={
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:0.7

};

const burgerBuilder = (props) => {
  const [ingredients, setIngredients] = useState(null);
  const  [error,setError] = useState(false);

  const fetchData = () =>{
    axios.get('https://react-my-burger-f29ba-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        setIngredients(response.data);
        console.log(response.data);
      })
      .catch( error => {
        console.log(error);
        setError(true);})

  }
  useEffect(() => {
    //console.log(props);
    fetchData();
  }, []);
  const [totalPrice,setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  //const [loading, setLoading] = useState(false);

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
    //console.log(...ingredients);

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
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  }


  const purchaseHandler=()=>{
    setPurchasing(true);
  }
  const purchaseCancelhandler = () => {
    setPurchasing(false);
  }
  const purchaseContinueHandler = () => {
    //alert("you can continue")
     
    const queryParams= [];
    for(let i in ingredients){
      //console.log(ingredients[i])
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i]));
    }
    queryParams.push('price='+ totalPrice);
    //console.log(queryParams);

    const queryString=queryParams.join('&')
    props.history.push({
      pathname: '/checkout',
      search: '?'+queryString

    })
    }
    const disableInfo={
      ...ingredients
    };
    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0 ;
    };
    let orderSummary = null
    let burger = error?<p>Ingredients can't be loaded </p>:<Spinner/>
    if(ingredients){
    burger= (
      <Aux>
      <Burger ingredients={ingredients}/>
         <BuildControls
         ingredientAdded={addIngredientHandler}
         ingredientRemoved = {removeIngredientHandler}
         disabled = {disableInfo}
         purchasable={purchasable}
         ordered={purchaseHandler}
         price={totalPrice}/>
      </Aux>
    );
      orderSummary= <OrderSummary 
            ingredients={ingredients}
            burgerPrice={totalPrice}
            purchaseCancel={purchaseCancelhandler}
            purchaseContinue={purchaseContinueHandler} />;
    };
    // if(loading){
    //     orderSummary = <Spinner/>
    // };
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
           {orderSummary}
        </Modal>
        {burger}
         {/* <Burger ingredients={ingredients}/>
         <BuildControls
         ingredientAdded={addIngredientHandler}
         ingredientRemoved = {removeIngredientHandler}
         disabled = {disableInfo}
         purchasable={purchasable}
         ordered={purchaseHandler}
         price={totalPrice}
         /> */}
        
      </Aux>
    );
  };


export default withErrorHandler(burgerBuilder, axios);