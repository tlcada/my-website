import * as React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import logo from "../../../assets/img/logo.png";
import { Brightness4, BrightnessHigh, Translate } from "@mui/icons-material";
import { Namespace, useTranslation, UseTranslationResponse } from "react-i18next";
import { ThemeSelectorType, TokenHelper, darkThemeOnCookie, RoutesName } from "../../Helper";
import { Link } from "react-router-dom";
import i18nOwn from "../../../i18n";
import config from "../../../config/config";

type PropsType = {
    readonly themeSelector: ThemeSelectorType;
}

export default function Header(props: PropsType) {
    const { t } = useTranslation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="transparent" sx={{ boxShadow: "none" }} position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, pt: 1 }}>
                        <Link to={ RoutesName.default }>
                            <img aria-hidden="true" style={{ width: 45, marginRight: 10 }} alt="" src={ logo } />
                        </Link>
                    </Box>
                    <LanguageSelector />
                    <ThemeSelect themeSelector={ props.themeSelector }  />
                    <Link to={ RoutesName.login }>{ t("header.login") }</Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

// TODO change this to a drop-down menu later
function LanguageSelector(): React.ReactElement {
    const { i18n, t }: UseTranslationResponse<Namespace> = useTranslation();

    const changeLanguage = () => {
        const lng = i18n.language === config.general.languages.fi ? config.general.languages.en : config.general.languages.fi;
        i18nOwn.changeLanguage(lng).finally();
    };

    return (
        <IconButton onClick={ () => changeLanguage() } aria-label={ t("header.language.ariaLabel") } color="inherit">
            <Translate />
            <Typography sx={{ marginLeft: 1 }} color="inherit" component="div">
                { t("header.language.selectedLanguage") }
            </Typography>
        </IconButton>
    );
}

function ThemeSelect({ themeSelector }: {
    readonly themeSelector: ThemeSelectorType;
}): React.ReactElement {
    const [blackThemeOn, setBlackThemeOn] = themeSelector;

    return (
        <IconButton
            sx={{ marginRight: 1 }}
            color="inherit"
            onClick={ () => {
                setBlackThemeOn(!blackThemeOn);
                TokenHelper.setCookie(darkThemeOnCookie.DARK_THEME_ON, String(!blackThemeOn));
            } }
            component="span"
        >
            { blackThemeOn ? <BrightnessHigh fontSize="small" /> : <Brightness4 fontSize="small" /> }
        </IconButton>
    );
}
