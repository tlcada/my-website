import * as React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { authSelector, AuthState, clearState, loginUser } from "./slices/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const validationSchema = Yup.object({
    username: Yup.string().min(3).max(65).required(),
    password: Yup.string().min(3).max(150).required(),
});

export default function Login(): React.ReactElement {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authSelector) as AuthState;

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Call useEffect only once

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            dispatch(loginUser({ username: values.username, password: values.password }));
            resetForm();
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
                            disabled={ auth.fetching }
                            startIcon={ auth.fetching && (<CircularProgress size={ 20 } color="inherit" />) }
                        >
                            { t("login.form.login") }
                        </Button>
                    </Box>

                    <Box m={ 1 }>
                        { (auth.error !== undefined) && <Alert severity="error">{ t("login.form.fail") }</Alert> }
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
