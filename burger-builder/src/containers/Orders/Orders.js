import React,{useState,useEffect}  from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const orders = (props) => {
    //console.log("ki");
    const [orders, setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const fetchOrders = () => {
        axios.get('/orders.json')
            .then(res =>{
                const orderDetails=[];
                for (let key in res.data){
                    orderDetails.push({
                        ...res.data[key],
                        id: key
                    });
                }
                setLoading(false);
                setOrders(orderDetails);
            })
            .catch(err => {
                setLoading(false);
            });
    }
    useEffect(()=>{
        fetchOrders();
    },[])
    return(
        <div>
            {orders.map(order =>(
                <Order 
                key={order.id}
                ingredients={order.burgerIngredients}
                price={order.price}/>
            ))}
        </div>
    );
}

export default withErrorHandler(orders,axios);