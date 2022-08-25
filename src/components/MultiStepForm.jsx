import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import FormSteps from "../utils/Utils";
import Stepper from "./Stepper";

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
    demo: "",
};

export function MultiStepForm(...props) {
    const [activeStep, setActiveStep] = useState(0);
    const currentChild = FormSteps[activeStep];

    const CurrentComponent = currentChild.ReactComponent;
    const currentValidationSchema = currentChild.ValidationSchema;
    const currentLabel = currentChild.Label;

    function isLastStep() {
        return activeStep === FormSteps.length - 1;
    }

    return (
        <Formik
            {...props}
            initialValues={multiStepInitialValues}
            validationSchema={currentValidationSchema}
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
                            <Typography
                                id="modal-modal-title"
                                variant="h4"
                                fontWeight="bold"
                                align="center"
                                component="h2"
                            >
                                Nueva operacion
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Stepper
                                activeStep={activeStep}
                                childrenArray={FormSteps}
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
                            <CurrentComponent />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
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
                                            Paso anterior
                                        </Button>
                                    ) : null}
                                </Grid>
                                <Grid item xs={4}></Grid>
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
                                        {isSubmitting
                                            ? "Confirmando"
                                            : isLastStep()
                                            ? "Confirmar"
                                            : "Siguiente"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
