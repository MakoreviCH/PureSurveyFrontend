import React from 'react';
import {toast, ToastContainer} from "react-toastify";
import TopPanelComponent from "../components/TopPanelComponent";
import LoginMainLogo from "../components/LoginMainLogo";
import LoginForm from "../components/LoginForm";

const LoginPage = (props:{theme: string, setTheme: any}) => {
    return (
        <div data-theme={props.theme} className='login-wrapper'>
            <TopPanelComponent theme={props.theme} setTheme={props.setTheme}/>
            <div className='login-main-content-wrapper'>
                <LoginMainLogo theme={props.theme}/>
                <LoginForm theme={props.theme}/>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme={props.theme === 'dark' ? 'dark' : 'light'}
            />
        </div>
    );
};

export default LoginPage;