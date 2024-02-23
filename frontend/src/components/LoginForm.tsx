import React, {FormEvent, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import LocalizedStrings from "react-localization";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isEmail} from "../functions/stringFunctions";
import {ILoginRequest} from "../interfaces/requests/ILoginRequest";
import {login} from "../utils/FetchData";
import {IValidationErrorResponse} from "../interfaces/responses/IValidationErrorResponse";
import {LoginFormLocalizedStrings} from "../functions/localizedStrings";
import {getValidationErrorMessages} from "../functions/validationFuctions";
import {handleUserLoginResponse} from "../functions/handleApiResponseFunctions";

const LoginForm = (props: {theme: string}) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const nav = useNavigate();

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login({email: email, password: password} as ILoginRequest);
        handleUserLoginResponse(res, nav);
    }

    return (
        <div className="login-form-wrapper">

            <form onSubmit={(e) => loginUser(e)}>
                <div className="login-form-text">
                    {LoginFormLocalizedStrings.loginText}
                </div>

                <div style={{"position": "relative"}}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='login-form-input'
                        placeholder={LoginFormLocalizedStrings.loginInp}
                        type="email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='login-form-input'
                        placeholder={LoginFormLocalizedStrings.passInp}
                        type={showPassword ? "text" : "password"}
                    />
                    <i
                        className={`password-toggle-icon ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>

                <div className='login-form-additional-func'>
                    <Link className='login-form-links' to={'soon'}>
                        {LoginFormLocalizedStrings.forgotPass}
                    </Link>
                    <Link className='login-form-links' to={'register'}>
                        {LoginFormLocalizedStrings.alrHaveAcc}
                    </Link>
                </div>

                <div className='login-form-buttons-wrapper'>
                    <div className={isEmail(email) && password.length > 0 ? 'login-form-button-div active-button-div' : 'login-form-button-div'}>
                        <button type={'submit'} disabled={!isEmail(email) || password.length < 1} className={!isEmail(email) || password.length < 1  ? 'login-form-button' : 'login-form-button active-button' }>
                            {LoginFormLocalizedStrings.logBtn}
                        </button>
                    </div>

                    <div id="signInDiv">

                    </div>
                </div>
            </form>

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

export default LoginForm;