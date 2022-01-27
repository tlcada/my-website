import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, CircularProgress, Container, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GeneralErrorResponseType, generalResponseHelper, GeneralResponseHelper } from "../../Helper";
import MockDataHelper from "../../Helper/MockDataHelper";
import config from "../../../config/config";
import { post } from "../../utils";
import { useState } from "react";

const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().max(65).required(),
    title: Yup.string().min(5).max(35).required(),
    message: Yup.string().min(10).max(800).required(),
});

export default function Contact(): React.ReactElement {
    const { t } = useTranslation();
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [emailHasBeenSent, setEmailHasBeenSent] = useState<boolean | undefined>(undefined);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            title: "",
            message: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setSendingEmail(true);

            const response: GeneralResponseHelper = await generalResponseHelper(async () => {
                const mockData: MockDataHelper = new MockDataHelper(config.mockData.mailService.sendEmail, "response text", "text");
                const mailHeaders: Headers = new Headers({ "Accept": "application/json", "Content-Type": "application/json;charset=UTF-8" });
                return post(`${config.services.mailService.url}/Mail.php`, mailHeaders, JSON.stringify(values), mockData);
            });

            if (response.successResponse) {
                // If you need success response: await response.successResponse.text();
                setEmailHasBeenSent(true);
                resetForm();
            } else {
                const error: GeneralErrorResponseType = response.errorResponse as GeneralErrorResponseType;
                console.error(`Message: ${error.message} and http code: ${error.httpStatusCode}`);
                setEmailHasBeenSent(false);
            }

            setSendingEmail(false);
        },
    });

    let emailSuccessMessage: React.ReactElement = <React.Fragment />;
    if (emailHasBeenSent !== undefined) {
        if (emailHasBeenSent) {
            emailSuccessMessage = <Alert severity="success">{ t("welcome.contact.email.success") }</Alert>;
        } else {
            emailSuccessMessage = <Alert severity="error">{ t("welcome.contact.email.fail") }</Alert>;
        }
    }

    return (
        <Box sx={{ pt: 1 }}>
            <Container maxWidth="md">
                <form noValidate style={{ marginTop: 10 }} onSubmit={ formik.handleSubmit }>
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
                        <Button
                            color="inherit"
                            variant="outlined"
                            fullWidth
                            type="submit"
                            disabled={ sendingEmail }
                            startIcon={ sendingEmail && (<CircularProgress size={ 20 } color="inherit" />) }
                        >
                            { t("welcome.contact.form.send") }
                        </Button>
                    </Box>

                    <Box m={ 1 }>
                        { emailSuccessMessage }
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
