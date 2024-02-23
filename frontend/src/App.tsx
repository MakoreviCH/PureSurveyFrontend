import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import useLocalStorage from 'use-local-storage'
import LoginPage from "./pages/LoginPage";
import {setInitialLanguageForLocalizedStrings} from "./functions/localizedStrings";

function App() {
    setInitialLanguageForLocalizedStrings();
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage theme={theme} setTheme={setTheme}/>}/>

          {/* User*/}



          {/*Admin*/}

        </Routes>

      </BrowserRouter>
  );
}

export default App;
