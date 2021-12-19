import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

const theme = (blackThemeOn: boolean): Theme => {
    const theme: Theme = createTheme({
        palette: {
            mode: blackThemeOn ? "dark" : "light",
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    a: {
                        textDecoration: "none",
                        color: blackThemeOn ? "#FFF" : "#212121" // Dirty fix
                    },
                },
            },
        },
    });

    return responsiveFontSizes(theme);
};

export default theme;
