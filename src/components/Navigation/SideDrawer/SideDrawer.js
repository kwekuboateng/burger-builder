import React from 'react';

import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {
    let attachClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachClass = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClass.join(' ')}>
                <div className={classes.Logo}>
                <Logo />                
                </div>
                <NavItems />
            </div>
        </Aux>
    )
}

export default sideDrawer;