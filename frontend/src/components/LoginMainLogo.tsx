import React from 'react';
import LocalizedStrings from 'react-localization';
import logoWhite from '../assets/login-logo-2.png'
import logoBlack from '../assets/login-logo.png'
import {LoginMainLogoLocalizedStrings} from "../functions/localizedStrings";

const LoginMainLogo = (props: {theme: string}) => {

    return (
        <div className="login-main-logo-wrapper">
            <img className="login-main-logo-img" src={props.theme === 'dark' ? logoWhite: logoBlack} alt="Pure Connect"/>

            <div className='login-main-logo-text'>
                &copy; 2024 Pure Survey. {LoginMainLogoLocalizedStrings.rights}
            </div>
        </div>
    );
};

export default LoginMainLogo;