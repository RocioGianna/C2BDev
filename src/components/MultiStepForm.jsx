import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import Stepper from "./Stepper";
import { DialogActions, Box } from "@mui/material";

const multiStepInitialValues = {
    clientName: "",
    clientSurname: "",
    dni: "",
    phone: "",
    email: "",
    bankAccount: "",
    billingAddress: "",
    zipCode: "",
    municipality: "",
    province: "",
    productId: "",
    productOptionId: "",
    additionals: [],
    checkbox: false,
    checkbox2: false,
    instalattionAddress: "",
    zipCodeInstallation: "",
    municipalityInstallation: "",
    provinceInstallation: "",
    instalattionAddress2: "",
    zipCodeInstallation2: "",
    municipalityInstallation2: "",
    provinceInstallation2: "",
};
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function MultiStepForm({ ...props }) {
    const [activeStep, setActiveStep] = useState(0);

    const stepsArray = props.steps;
    const currentChild = stepsArray[activeStep];

    const CurrentComponent = currentChild.ReactComponent;
    const currentValidationSchema = currentChild.ValidationSchema;
    const currentLabel = currentChild.Label;

    function isLastStep() {
        return activeStep === stepsArray.length - 1;
    }

    return (
        <Formik
            {...props}
            initialValues={multiStepInitialValues}
            validationSchema={() => currentValidationSchema(activeStep)}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    setActiveStep((activeStep) => activeStep + 1);
                }
                helpers.setTouched({});
            }}
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Grid container rowSpacing={4}>
                        <Grid item xs={12}>
                            <Stepper activeStep={activeStep} childrenArray={stepsArray} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h6" align="center" component="h2">
                                {currentLabel}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CurrentComponent index={activeStep} />{" "}
                            {/* //TODO : HACER QUE SE PASE LA PROP SII ES MAYOR A 2 EL STEP */}
                        </Grid>
                        <DialogActions
                            sx={{
                                width: "100%",
                                pt: 5,
                                paddingLeft: 0,
                                paddingRight: 0,
                                justifyContent: "space-between",
                            }}
                        >
                            <Grid item xs={4}>
                                {activeStep > 0 ? (
                                    <Button
                                        onClick={() => setActiveStep(activeStep - 1)}
                                        variant="contained"
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <ArrowBackOutlinedIcon />
                                            Paso anterior
                                            <span />
                                        </Box>
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={isSubmitting}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <span />
                                        {isSubmitting ? "Confirmando" : isLastStep() ? "Confirmar" : "Siguiente"}
                                        <ArrowForwardOutlinedIcon />
                                    </Box>
                                </Button>
                            </Grid>
                        </DialogActions>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
