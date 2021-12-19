import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ReactGA from "react-ga";
import config from "../../../config/config";
import { useTranslation } from "react-i18next";

export default function Illustration(): React.ReactElement {
    const { t } = useTranslation();

    return (
        <Box sx={{ pt: 8 }}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    { t("welcome.illustration.title") }
                </Typography>
                <Stack direction="row" spacing={ 2 } justifyContent="center">
                    <ReactGA.OutboundLink eventLabel="Clicked go to Guard Service button" to={ config.linkedIn.url } target="_blank">
                        <Button variant="outlined">{ t("welcome.illustration.linkedIn") }</Button>
                    </ReactGA.OutboundLink>
                </Stack>
            </Container>
        </Box>
    );
}
