import  React,{useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from "../../../components/UI/Spinner/Spinner";

const contactData = (props) => {
    const [customerDetails, setCustomerDetails]= useState({
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    });
    const [loading,setLoading] = useState(false);
    const orderhandler= (e)=>{
        e.preventDefault();
        //console.log(props.ingredients);
        setLoading(true);
        const order={
            burgerIngredients:props.ingredients,
            price: props.price,
            customer: {
                name: 'Jack',
                address:{
                    street: 'test',
                    zipcode: '43562',
                    country: 'India'
                },
                email: 'jackjackie@test.com'
            },
            deliverMode: 'fastest'
        };
        axios.post('/orders.json',order)
            .then(response => {
                setLoading(false);
                props.history.push('/');
            })
            .catch(error => {
                setLoading(false);
                
            });   
    }
    let form =(
        <form>
            <input type="text" className={classes.Input} name="name" placeholder="your name"/>
            <input type="text" className={classes.Input} name="email" placeholder="your email"/>
            <input type="text" className={classes.Input} name="street" placeholder="your street"/>
            <input type="text" className={classes.Input} name="postal" placeholder="Postal code"/>
            <Button 
                btnType="Success"
                click={orderhandler}>ORDER</Button>
        </form>
    );
    if(loading){
        form =<Spinner/>;
    }
    return(
        <div className={classes.ContactData}>
            <h4> Enter your contact data</h4>
            {form}
        </div>
    )

}
export default contactData;

