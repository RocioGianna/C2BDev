import React, { useState } from "react";
import {
    Button,
    Typography,
    Modal,
    Card,
    Grid,
    CircularProgress,
} from "@mui/material";

import { Form, Formik } from "formik";

import FormSteps from "../utils/Utils";

import Stepper from "./Stepper";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function NewOperationModal(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 8,
                    width: "80%",
                }}
            >
                <FormikStepper
                    initialValues={{
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
                    }}
                    onSubmit={async () => {
                        await sleep(3000);
                        console.log("submit");
                    }}
                />
            </Card>
        </Modal>
    );
}

export function FormikStepper(...props) {
    const [activeStep, setActiveStep] = useState(0);
    const currentChild = FormSteps[activeStep];

    const CurrentComponent = currentChild.Component;
    const currentValidationSchema = currentChild.ValidationSchema;
    const currentLabel = currentChild.Label;

    function isLastStep() {
        return activeStep === FormSteps.length - 1;
    }

    return (
        <Formik
            {...props}
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
