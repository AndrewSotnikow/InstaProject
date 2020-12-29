import React from 'react';
import logo from './logo.png';


function Header() {
    return (
            <header className="header container">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                {/*<div className="login-btn">*/}
                {/*    <a href="#">Log in</a>*/}
                {/*</div>*/}
            </header>
    );
}

export default Header;