import React,{ useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


const checkout = (props) => {
    console.log(props);
    const [ingredients, setIngredients] = useState({
        salad:0,
        meat:0,
        bacon:0,
        cheese:0
    });
    const [totalPrice, setTotalPrice]= useState(0);
    const getIngredients= () =>{
        const query =new URLSearchParams(props.location.search);
        const ingredient={}
        let price=0;
        for(let param of query.entries()){
            if(param[0]=== 'price'){
                price= param[1];
            }
            else{
            ingredient[param[0]]=+param[1];
            }
        }
       setIngredients(ingredient);
       setTotalPrice(price);
        
    };
    useEffect(()=>{
        getIngredients();
    },[]);



    const checkoutCancelHandler = () => {
        //console.log("cancelled");
        props.history.goBack();
    }
    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }
    //console.log(ingredients);

    return(
        <div>
            <CheckoutSummary 
            
            ingredients={ingredients}
            checkoutCancel={checkoutCancelHandler}
            checkoutContinue={checkoutContinueHandler} />
            <Route 
                path={props.match.path + '/contact-data'} 
                render={(props)=> (<ContactData ingredients={ingredients} price={totalPrice} {...props}/>)}
                />
        </div>
    )
}

export default checkout;