import React, { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import LocalizedStrings from "react-localization";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmail } from "../functions/stringFunctions";
import { register } from "../utils/service/FetchData";
import { IValidationErrorResponse } from "../interfaces/responses/IValidationErrorResponse";
import { RegisterFormLocalizedStrings } from "../functions/localizedStrings";
import { getValidationErrorMessages } from "../functions/validationFuctions";
import { handleUserLoginResponse } from "../functions/handleApiResponseFunctions";
import { IRegisterRequest } from '../interfaces/requests/IRegisterRequest';

const RegisterForm = (props: { theme: string }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const nav = useNavigate();

    const registerUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await register({ email: email, password: password, firstName: firstName, lastName: lastName } as IRegisterRequest);
        handleUserLoginResponse(res, nav);
    }

    return (
        <div className="register-form-wrapper">

            <form onSubmit={(e) => registerUser(e)}>
                <div className="register-form-text">
                    {RegisterFormLocalizedStrings.regText}
                </div>

                <div style={{ "position": "relative" }}>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className='register-form-input'
                        placeholder={RegisterFormLocalizedStrings.firstNameInp}
                        type="text"
                    />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className='register-form-input'
                        placeholder={RegisterFormLocalizedStrings.lastNameInp}
                        type="text"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='register-form-input'
                        placeholder={RegisterFormLocalizedStrings.emailInp}
                        type="email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='register-form-input'
                        placeholder={RegisterFormLocalizedStrings.passInp}
                        type={showPassword ? "text" : "password"}
                    />
                </div>

                <div className='register-form-additional-func'>
                    <Link className='register-form-links' to={'/'}>
                        {RegisterFormLocalizedStrings.alrHaveAcc}
                    </Link>
                </div>

                <div className='register-form-buttons-wrapper'>
                    <div className={isEmail(email) && password.length > 0 && firstName.length > 0 && lastName.length > 0 ? 'register-form-button-div active-button-div' : 'register-form-button-div'}>
                        <button type={'submit'} disabled={!isEmail(email) || password.length < 1 || firstName.length < 1 || lastName.length < 1} className={!isEmail(email) || password.length < 1 || firstName.length < 1 || lastName.length < 1 ? 'register-form-button' : 'register-form-button active-button'}>
                            {RegisterFormLocalizedStrings.regBtn}
                        </button>
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

export default RegisterForm;