import LocalizedStrings from "react-localization";
import {LocalStorageHelper} from "./localStorageHelper";
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY,
    LANGUAGE_LOCAL_STORAGE_KEY
} from "../utils/constants";
import {ApiErrorCodes} from "../enums/apiErrors";


export function localizeApiErrors(message: string): string {
    console.log('message: ' + message);
    const errorCode = ApiErrorCodes[message as keyof typeof ApiErrorCodes];

    if (errorCode) {
        const lang = LocalStorageHelper.getItem(LANGUAGE_LOCAL_STORAGE_KEY)
        if (lang === 'en') {
            console.log('en');
            return errorCode;
        }
        else if (lang === 'ua') {
            console.log('ua');
            return localizeApiErrorsEnum(errorCode);
        }
    }

    return message;
}

export function localizeApiErrorsEnum(errorCode: string): string {
    console.log('localizeApiErrorsEnum: ' + errorCode);
    switch (errorCode) {
        case ApiErrorCodes.UserNotFound:
            return 'Користувача не знайдено';
        case ApiErrorCodes.InvalidPasswordException:
            return 'Невірний пароль';
        case ApiErrorCodes.ApiCommunicationError:
            return 'Щось пішло не так. Будь ласка, спробуйте пізніше.';
        case ApiErrorCodes.ExistingEmailException:
            return 'Ця електронна адреса вже існує';
        case ApiErrorCodes.InvalidUserClaims:
            return 'Дані користувача недійсні';
        case ApiErrorCodes.SurveyNotFound:
            return 'Опитування не знайдено';
        case ApiErrorCodes.SurveyUnitNotFound:
            return 'Юніт опитування не знайдено';
        case ApiErrorCodes.TargetingNotFound:
            return 'Тагретинг не знайдено';
        case ApiErrorCodes.TemplateNotFound:
            return 'Шаблон не знайдено';
        case ApiErrorCodes.UnexistingEmailException:
            return 'Ця електронна адреса не існує';
        case ApiErrorCodes.UnitAppearanceNotFound:
            return 'Вигляд юніту опитування не знайдено';

        default:
            return errorCode;
    }
}

export const localizeValidationError = (error: string) => {
    console.log('error: ' + error);
    const lang = LocalStorageHelper.getItem(LANGUAGE_LOCAL_STORAGE_KEY)
    if (lang === 'en') {
        return error;
    }
    else if (lang === 'ua'){
        if (error.includes('You must enter your email address.')) {
            return 'Ви повинні ввести свою адресу електронної пошти.';
        }
        else if (error.includes('You must enter your password.')) {
            return 'Ви повинні ввести свій пароль.';
        }
        else if (error.includes('You must enter a valid email address.')) {
            return 'Ви повинні ввести дійсну адресу електронної пошти.';
        }
        else if (error.includes('Password must contain at least 8 symbols.')) {
            return 'Пароль повинен містити принаймні 8 символів.';
        }
        else if (error.includes('Password must contain at least one uppercase letter, one lowercase letter and one digit.')) {
            return 'Пароль повинен містити принаймні одну велику літеру, одну маленьку літеру та одну цифру.';
        }
    }
}
export const ValidationErrorMessages = new LocalizedStrings({
    en:{
        "You must enter your email address.": "You must enter your email address.",
        "You must enter the password.": "You must enter the password.",
        "You must enter a valid email address.": "You must enter a valid email address.",
        "Password must contain at least 8 symbols.": "Password must contain at least 8 symbols.",
        "Password must contain at least one uppercase letter, one lowercase letter and one digit.": "Password must contain at least one uppercase letter, one lowercase letter and one digit.",
    },
    ua: {
        "You must enter your email address.": "Ви повинні ввести свою електронну адресу.",
        "You must enter the password.": "Ви повинні ввести пароль.",
        "You must enter a valid email address.": "Ви повинні ввести дійсну електронну адресу.",
        "Password must contain at least 8 symbols.": "Пароль повинен містити принаймні 8 символів.",
        "Password must contain at least one uppercase letter, one lowercase letter and one digit.": "Пароль повинен містити принаймні одну велику літеру, одну маленьку літеру та одну цифру.",

    }
});



export const LoginFormLocalizedStrings = new LocalizedStrings({
        en:{
            loginText:"Login to Pure Survey",
            loginInp:"Email",
            passInp:"Password",
            forgotPass:"Forgot password",
            alrHaveAcc:"Don`t have an account",
            logBtn:"Log In",
            loginErrorValid:"Entered data was invalid. Try again.",
        },
        ua: {
            loginText:"Вхід до Pure Survey",
            loginInp:"Електронна пошта",
            passInp:"Пароль",
            forgotPass:"Забули пароль",
            alrHaveAcc:"В мене немає акаунта",
            logBtn:"Увійти",
            loginErrorValid:"Введені дані були невірними. Спробуйте ще раз.",
        }
    });

    export const RegisterFormLocalizedStrings = new LocalizedStrings({
        en:{
            regText:"Register in Pure Survey",
            emailInp:"Email",
            passInp:"Password",
            firstNameInp:"First Name",
            lastNameInp:"Last Name",
            forgotPass:"Forgot password",
            alrHaveAcc:"Already registered",
            regBtn:"Register",
            loginErrorValid:"Entered data was invalid. Try again.",
        },
        ua: {
            regText:"Зареєструйтеся в Pure Survey",
            emailInp:"Електронна пошта",
            passInp:"Пароль",
            firstNameInp:"First Name",
            lastNameInp:"Last Name",
            forgotPass:"Забули пароль",
            alrHaveAcc:"Вже зареєстрований",
            regBtn:"Зареєструватися",
            loginErrorValid:"Введені дані були невірними. Спробуйте ще раз.",
        }
    });

    export const SurveyUnitLocalizedStrings = new LocalizedStrings({    
        en:{
            pageLabel:"Survey Units",
            unitNameLabel:"Unit Name",
            surveyNameLabel:"Unit Name",
            dateByLabel:"Date By",
            targetingLabel:"Targeting",
            statusLabel:"Status",
            feedbacksLabel:"Feedbacks",
        },
        ua: {
            pageLabel:"Групи Опитувань",
            unitNameLabel:"Група",
            surveyNameLabel:"Опитування",
            dateByLabel:"Дата до",
            targetingLabel:"Таргетування",
            statusLabel:"Статус",
            feedbacksLabel:"Відгуки",
        }
    });

    export const GeneralLocalizedStrings = new LocalizedStrings({
        en:{
            createButtonLabel:"CREATE",
            nextButtonLabel:"NEXT",
            backButtonLabel:"BACK",
            saveButtonLabel:"SAVE",
            cancelButtonLabel:"CANCEL",
            rowsPerPageLabel:"Rows per page",
            ofLabel:"of"

        },
        ua: {
            createButtonLabel:"ДОДАТИ",
            nextButtonLabel:"ДАЛІ",
            backButtonLabel:"НАЗАД",
            saveButtonLabel:"ЗБЕРЕГТИ",
            cancelButtonLabel:"ВІДМІНА",
            rowsPerPageLabel:"Рядків на сторінці",
            ofLabel:"з"
        }
    });

export const LoginMainLogoLocalizedStrings = new LocalizedStrings({
    en:{
        rights:"All rights reserved.",

    },
    ua: {
        rights:"Всі права захищені.",
    }
});


export function setInitialLanguageForLocalizedStrings(): void {
    const lang = LocalStorageHelper.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    console.log('lang: ' + lang);
    if (lang === null) {
        LoginFormLocalizedStrings.setLanguage(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY);
        LoginMainLogoLocalizedStrings.setLanguage(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY);
        ValidationErrorMessages.setLanguage(DEFAULT_LANGUAGE_LOCAL_STORAGE_KEY);
    }
    else {
        LoginFormLocalizedStrings.setLanguage(lang);
        LoginMainLogoLocalizedStrings.setLanguage(lang);
        ValidationErrorMessages.setLanguage(lang);
    }
}

export function setLanguageForLocalizedStrings(language: string): void {
    LocalStorageHelper.setItem(LANGUAGE_LOCAL_STORAGE_KEY, language);

    LoginFormLocalizedStrings.setLanguage(language);
    LoginMainLogoLocalizedStrings.setLanguage(language);
    ValidationErrorMessages.setLanguage(language);

    window.location.reload();
}
