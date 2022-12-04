import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import Stepper from "./Stepper";
import { DialogActions, Box } from "@mui/material";

import { steps } from "../model/Steps";
import { useSelector } from "react-redux";
import { isAdmin } from "../utils/RolesUtils.js";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const multiStepInitialValues = {
    customerName: "",
    customerlastName: "",
    isProfessionalProduct: "",
    nid: "",
    phonePrefix: "+34",
    phoneNumber: "",
    email: "",
    bankAccount: "",
    billingAddress: "",
    billingZipCode: "",
    billingMunicipality: "",
    billingProvince: "",
    productId: "",
    productOptionId: "",
    documentation: [],
    additionals: [],
    differentInstallAddress: false,
    differentShippingAddress: false,
    installationAddress: "",
    installationZipCode: "",
    installationMunicipality: "",
    installationProvince: "",
    shippingAddress: "",
    shippingZipCode: "",
    shippingMunicipality: "",
    shippingProvince: "",
    observations: "",
    offeredPrice: "",
    collaboratorEmail: "",
    collaboratorPhonePrefix: "",
    collaboratorPhoneNumber: "",
    images: [""],
    collaborator: "",
};

export function MultiStepForm({ ...props }) {
    const formSteps = useSelector((state) => state.formSteps);
    const [activeStep, setActiveStep] = useState(0);
    const stepsArray = props.steps.map((s) => steps[s]);
    const currentChild = stepsArray[activeStep];

    const CurrentComponent = currentChild.reactComponent;
    const currentValidationSchema = currentChild.validationSchema;

    const currentPhoneStepIndex = activeStep - (isAdmin() ? 3 : 2);

    const currentLabel = props.steps[activeStep] === "PHONE_STEP" ? (formSteps.phoneSteps[currentPhoneStepIndex].stepType ==="MOBILE" ? "Linea Movil - " + formSteps.phoneSteps[currentPhoneStepIndex].name : "Linea Fija") : currentChild.label;

    const currentOnSubmit = currentChild.onSubmit;

    function isLastStep() {
        return activeStep === stepsArray.length - 1;
    }

    return (
        <Formik
            {...props}
            initialValues={multiStepInitialValues}
            validationSchema={() => currentValidationSchema(currentPhoneStepIndex)}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    if (currentOnSubmit) {
                        currentOnSubmit(values, helpers.setFieldValue);
                    }
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
                            <CurrentComponent index={currentPhoneStepIndex} />
                        </Grid>
                        <DialogActions
                            sx={{
                                width: "100%",
                                pt: 5,
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        >
                            <Grid item xs={6} xl={4}>
                                {activeStep > 0 ? (
                                    <Button onClick={() => setActiveStep(activeStep - 1)} variant="contained" fullWidth disabled={isSubmitting}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: { xs: "center", sm: "space-between" },
                                                width: "100%",
                                            }}
                                        >
                                            <ArrowBackOutlinedIcon />
                                            <Box sx={{ display: { xs: "none", sm: "block" } }}>Paso anterior</Box>
                                            <span />
                                        </Box>
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item xs={0} xl={4}></Grid>
                            <Grid item xl={4} xs={6}>
                                <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: { xs: "center", sm: "space-between" },
                                            width: "100%",
                                        }}
                                    >
                                        <span />
                                        <Box sx={{ display: { xs: "none", sm: "block" } }}>{isSubmitting ? "Confirmando" : isLastStep() ? "Confirmar" : "Siguiente"}</Box>
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
