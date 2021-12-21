import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SnippetUtils } from "../../utils";

const validationSchema = Yup.object({
    username: Yup.string().min(3).max(65).required(),
    password: Yup.string().min(3).max(150).required(),
});

export default function Login(): React.ReactElement {
    const { t } = useTranslation();
    const [login, setLogin] = useState<boolean>(false);
    const [loginFail, setLoginFail] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // TODO replace with redux/thunk
            // You can use --template redux-typescript: https://react-redux.js.org/introduction/getting-started
            setLogin(true);
            await SnippetUtils.sleep(2000);
            setLogin(false);
            setLoginFail(true);
        },
    });

    return (
        <Box sx={{ pt: 1 }}>
            <Container maxWidth="sm">
                <Typography align="center" variant="subtitle1">
                    { t("login.title") }
                </Typography>

                <form noValidate style={{ marginTop: 10 }} onSubmit={ formik.handleSubmit }>
                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            name="username"
                            label={ t("login.form.username") }
                            value={ formik.values.username }
                            onChange={ formik.handleChange }
                            error={ formik.touched.username && Boolean(formik.errors.username) }
                            helperText={ formik.touched.username && formik.errors.username }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="password"
                            name="password"
                            label={ t("login.form.password") }
                            value={ formik.values.password }
                            onChange={ formik.handleChange }
                            error={ formik.touched.password && Boolean(formik.errors.password) }
                            helperText={ formik.touched.password && formik.errors.password }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <Button
                            color="inherit"
                            variant="outlined"
                            fullWidth
                            type="submit"
                            disabled={ login }
                            startIcon={ login && (<CircularProgress size={ 20 } color="inherit" />) }
                        >
                            { t("login.form.login") }
                        </Button>
                    </Box>

                    <Box m={ 1 }>
                        { loginFail && <Alert severity="error">{ t("login.form.fail") }</Alert> }
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
