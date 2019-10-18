import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../../Navigation/NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggleSide} />
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav className={classes.DeskTopOnly }>
                <NavItems/>
            </nav>
        </header>
    )
}

export default toolbar