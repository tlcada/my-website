import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().max(65).required(),
    title: Yup.string().min(5).max(35).required(),
    message: Yup.string().min(10).max(800).required(),
});

export default function Contact(): React.ReactElement {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            title: "",
            message: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            alert("This form is work in progress...");
            resetForm();
        },
    });

    return (
        <Box sx={{ pt: 6 }}>
            <Container maxWidth="md">
                <Typography component="h2" align="center" variant="h4">
                    { t("welcome.contact.title") }
                </Typography>
                <Typography align="center" style={{ color: "#8E3235" }} component="div" variant="subtitle2">
                    { t("welcome.contact.subtitle") }
                </Typography>

                <form noValidate style={{ marginTop: 20 }} onSubmit={ formik.handleSubmit }>
                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label={ t("welcome.contact.form.name") }
                            value={ formik.values.name }
                            onChange={ formik.handleChange }
                            error={ formik.touched.name && Boolean(formik.errors.name) }
                            helperText={ formik.touched.name && formik.errors.name }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label={ t("welcome.contact.form.email") }
                            value={ formik.values.email }
                            onChange={ formik.handleChange }
                            error={ formik.touched.email && Boolean(formik.errors.email) }
                            helperText={ formik.touched.email && formik.errors.email }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            name="title"
                            label={ t("welcome.contact.form.title") }
                            value={ formik.values.title }
                            onChange={ formik.handleChange }
                            error={ formik.touched.title && Boolean(formik.errors.title) }
                            helperText={ formik.touched.title && formik.errors.title }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={ 4 }
                            id="message"
                            name="message"
                            label={ t("welcome.contact.form.message") }
                            value={ formik.values.message }
                            onChange={ formik.handleChange }
                            error={ formik.touched.message && Boolean(formik.errors.message) }
                            helperText={ formik.touched.message && formik.errors.message }
                        />
                    </Box>

                    <Box m={ 1 }>
                        <Button color="inherit" variant="outlined" fullWidth type="submit">
                            { t("welcome.contact.form.send") }
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
