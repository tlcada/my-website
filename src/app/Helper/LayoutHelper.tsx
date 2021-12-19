import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";
import { Container } from "@mui/material";

export type ThemeSelectorType = [boolean, (blackThemeOn: boolean) => void];

type PropsTypes = {
    readonly themeSelector: ThemeSelectorType;
}

export const BasicLayout = (props: PropsTypes): React.ReactElement => {
    return (
        <Container maxWidth="lg">
            <Header themeSelector={ props.themeSelector } />
                <Outlet />
            <Footer />
        </Container>
    );
};
