import React, { useState } from "react";
import ReactGA from "react-ga";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../assets/themes/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicLayout, TokenHelper, darkThemeOnCookie, RoutesName } from "./Helper";
import { Theme } from "@mui/material/styles";
import config from "../config/config";
import { Welcome } from "./components";
import { Login } from "./components/Login";

// Init Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

function App(): React.ReactElement {
    let blackThemeCookiesValue: string | undefined = TokenHelper.getCookieByName(darkThemeOnCookie.DARK_THEME_ON);
    if (blackThemeCookiesValue === undefined && config.general.useBlackThemeAsDefault) {
        blackThemeCookiesValue = "true";
    }

    const blackThemeState = useState<boolean>(blackThemeCookiesValue === "true");
    const themeProvider: Theme = theme(blackThemeState[0]);

    return (
        <ThemeProvider theme={ themeProvider }>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={ <BasicLayout themeSelector={ blackThemeState } /> }>
                        <Route path={ RoutesName.default } element={ <Welcome /> } />
                        <Route path={ RoutesName.login } element={ <Login /> } />
                        { /* Come here if routes not match exact path */ }
                        <Route path="*" element={ <Welcome /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
