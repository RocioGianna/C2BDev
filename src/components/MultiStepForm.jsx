import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import Stepper from "./Stepper";
import { DialogActions, Box } from "@mui/material";
import { steps } from "../model/Steps";
import { useSelector } from "react-redux";
import { store } from "../state/store";

const user = store.getState().session.user;

const multiStepInitialValues = {
    clientName: "",
    clientSurname: "",
    isProfessionalProduct: "",
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
    observations: "",
    offeredPrice: "",
    collaboratorEmail: "",
    collaboratorPhone: "",
    images: [""],
    collaboratorId: "",
};
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function MultiStepForm({ ...props }) {
    const additionals = useSelector((state) => state.formSteps);
    const [activeStep, setActiveStep] = useState(0);
    const stepsArray = props.steps.map((s) => steps[s]);

    const currentChild = stepsArray[activeStep];

    const CurrentComponent = currentChild.reactComponent;
    const currentValidationSchema = currentChild.validationSchema;

    const isAdditional = isAdditionalStep(activeStep, stepsArray.length);
    const currentLabel = isAdditional
        ? additionals.phoneSteps[activeStep - 2]?.mobile
            ? "Linea Movil - " + additionals.phoneSteps[activeStep - 2]?.name
            : "Linea Fija"
        : currentChild.label;

    const currentOnSubmit = currentChild.onSubmit;

    function isAdditionalStep(index, size) {
        return props.steps[activeStep] === "PHONE_STEP";
    }

    function isLastStep() {
        return activeStep === stepsArray.length - 1;
    }

    return (
        <Formik
            {...props}
            initialValues={multiStepInitialValues}
            validationSchema={() => currentValidationSchema(activeStep - 2)}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    console.log(values);
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
                            <Stepper
                                activeStep={activeStep}
                                childrenArray={stepsArray}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                align="center"
                                component="h2"
                            >
                                {currentLabel}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CurrentComponent index={activeStep - 2} />
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
                                        onClick={() =>
                                            setActiveStep(activeStep - 1)
                                        }
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
                                    startIcon={
                                        isSubmitting ? (
                                            <CircularProgress size="1rem" />
                                        ) : null
                                    }
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
                                        {isSubmitting
                                            ? "Confirmando"
                                            : isLastStep()
                                            ? "Confirmar"
                                            : "Siguiente"}
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
