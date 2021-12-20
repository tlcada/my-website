import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import ReactGA from "react-ga";
import config from "../../../config/config";
import { useTranslation } from "react-i18next";

export default function Presentation(): React.ReactElement {
    const { t } = useTranslation();

    return (
        <Box sx={{ pt: 2 }}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    { t("welcome.presentation.title") }
                </Typography>
                <ReactGA.OutboundLink eventLabel="Clicked go to Guard Service button" to={ config.linkedIn.url } target="_blank">
                    <Typography align="center" style={{ color: "#8E3235", marginTop: -10 }} variant="subtitle1">
                     { t("welcome.presentation.linkedIn") }
                    </Typography>
                </ReactGA.OutboundLink>
            </Container>
        </Box>
    );
}
