import { Box, Typography } from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            { "Copyright © " }
            { new Date().getFullYear() }
            { "." }
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box sx={{ p: 4 }} component="footer">
            <Copyright />
        </Box>
    );
}
