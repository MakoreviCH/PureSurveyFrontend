import React, { useState } from 'react';
import {setLanguageForLocalizedStrings} from "../functions/localizedStrings";
import {LocalStorageHelper} from "../functions/localStorageHelper";
import {ENGLISH_LANG_DEFAULT_VALUE, LANGUAGE_LOCAL_STORAGE_KEY, UKR_LANG_DEFAULT_VALUE} from "../utils/constants";

const DropDownLanguageMenu = () => {
    const language = LocalStorageHelper.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    const [selectedLanguage, setSelectedLanguage] = useState(language); // Default language

    const handleLanguageChange = (language: string) => {
        setLanguageForLocalizedStrings(language);
        setSelectedLanguage(language);
    };

    return (
        <div className="dropdown">
            <button className="dropbtn">{selectedLanguage === 'en' ? ENGLISH_LANG_DEFAULT_VALUE : UKR_LANG_DEFAULT_VALUE}</button>
            <div className="dropdown-content">
                <button onClick={() => handleLanguageChange('en')}>English</button>
                <button onClick={() => handleLanguageChange('ua')}>Українська</button>
            </div>
        </div>
    );
};

export default DropDownLanguageMenu;