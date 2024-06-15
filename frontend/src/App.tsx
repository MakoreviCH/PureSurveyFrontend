import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import useLocalStorage from 'use-local-storage'
import LoginPage from "./pages/LoginPage";
import {setInitialLanguageForLocalizedStrings} from "./functions/localizedStrings";
import CreateSurveyPage from "./pages/create/CreateSurveyPage";
import AppearancePage from "./pages/create/AppearancePage";
import SurveyUnitPage from './pages/view/SurveyUnitPage';
import SurveyStatsPage from './pages/view/SurveyStatPage';
import SurveyPage from './pages/view/SurveyPage';
import UnitAppearancePage from './pages/view/UnitAppearancePage';
import CreateSurveyUnitPage from './pages/create/CreateUnitPage';
import TargetingViewPage from './pages/view/TargetingPage';
import CreateTargetingPage from './pages/create/CreateTargetingPage';
import {ColorModeProvider } from './utils/ThemeContext'
import EditSurveyUnitPage from './pages/create/EditUnitPage';
import NotFound from './pages/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';

  export default function App() {

    return (
      <ColorModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage theme="mode" setTheme={"mode"}/>}/>
            <Route path="/register" element={<RegisterPage theme="mode" setTheme={"mode"}/>}/>

            {/* User*/}

            <Route element={<ProtectedRoute requiredRole="User" />}>
              <Route path="/survey" element={<SurveyPage/>}/>
              <Route path="/survey/create" element={<CreateSurveyPage/>}/>
              <Route path="/survey/stats/:surveyId" element={<SurveyStatsPage/>}/>

              <Route path="/appearance" element={<UnitAppearancePage/>}/>
              <Route path="/appearance/create" element={<AppearancePage/>}/>
              <Route path="/appearance/edit/:appearanceId" element={<AppearancePage />} />

              <Route path="/survey-unit" element={<SurveyUnitPage/>}/>
              <Route path="/survey-unit/create" element={<CreateSurveyUnitPage/>}/>
              <Route path="/survey-unit/edit/:unitId" element={<EditSurveyUnitPage/>}/>

              <Route path="/targeting" element={<TargetingViewPage/>}/>
              <Route path="/targeting/create" element={<CreateTargetingPage/>}/>
            </Route>
            {/*Admin*/}


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ColorModeProvider>
  );
}