import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import Stepper from "./Stepper";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

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
                            <CurrentComponent />
                        </Grid>
                        <DialogActions
                            sx={{
                                width: "100%",
                                paddingLeft: 0,
                                paddingRight: 0,
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
                        </DialogActions>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
