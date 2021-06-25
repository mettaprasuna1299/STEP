import React,{ useState } from 'react';
import Aux from '../Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
const layout =(props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerCloseHandler = () =>{
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
        //console.log("loo");
    }

    return(
    
    <Aux>
        <Toolbar 
            drawerToggleClicked={sideDrawerToggleHandler}  
        />
        <SideDrawer 
            open={sideDrawerIsVisible} 
            closed={sideDrawerCloseHandler}
        />
        <main className={classes.Content}> 
            {props.children}
            {/* {console.log(props.children)} */}
        </main>
    </Aux>
    )
    };
export default layout;