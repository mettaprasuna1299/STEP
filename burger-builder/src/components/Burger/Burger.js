import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger= (props)=>{
    let transformedIngredients= Object.keys(props.ingredients)
    .map(igkey=>{
        // console.log(igkey)
        return [...Array(props.ingredients[igkey])]
        .map((_,i)=> {
           return <BurgerIngredient key={igkey + i} type={igkey}/>

        });
    })
    .reduce((prevArr, ele) => {
        return prevArr.concat(ele)
    },[]);
    //console.log(transformedIngredients);
    //console.log(Object.values(props.ingredients));

    if(transformedIngredients.length=== 0){
        transformedIngredients=<p> Please start adding ingredients</p>
    }
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
           {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};
 
export default burger;