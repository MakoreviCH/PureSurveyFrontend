import React from 'react';
import { ToastContainer } from "react-toastify";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = (props: { theme: string, setTheme: any }) => {
    return (
        <div data-theme={props.theme} className='register-wrapper'>
            <div className='register-main-content-wrapper'>
                <RegisterForm theme={props.theme} />
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

export default RegisterPage;
