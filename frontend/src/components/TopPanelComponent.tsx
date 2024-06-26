import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDownLanguageMenu from "./DropDownLanguageMenu";

const TopPanelComponent = (props: {theme: string, setTheme: React.Dispatch<React.SetStateAction<string>>}) => {
    const handleTheme = () => {
        props.setTheme(props.theme === 'light' ? 'dark' : 'light');
    }
    return (
        <div className="login-change-theme-wrapper">
            <DropDownLanguageMenu/>
            <button className="login-change-theme" onClick={handleTheme}>
                <FontAwesomeIcon icon={props.theme === 'light' ? solid('moon') : solid('sun')} />
            </button>
        </div>
    );
};

export default TopPanelComponent;