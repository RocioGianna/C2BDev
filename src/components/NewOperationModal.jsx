import React, { useState } from "react";

import ClientDataStep from "./newOperation/ClientDataStep";
import {
    StepLabel,
    Step,
    Stepper,
    Box,
    Button,
    Typography,
    Modal,
    Card,
    TextField,
    Grid,
} from "@mui/material";
import { Field, Form, Formik } from "formik";

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
                    p: 16,
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
                    onSubmit={() => {}}
                >
                    <div label="Primer pantalla">Ema re capo</div>

                    <ClientDataStep label="Atributos del cliente" />
                    <div label="Tercer">Tercer pantalla</div>
                    <div label="Demo">
                        <Field
                            id="demo"
                            name="demo"
                            label="DEMO"
                            component={TextField}
                        />
                    </div>
                </FormikStepper>
            </Card>
        </Modal>
    );
}

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [activeStep, setActiveStep] = useState(0);

    const currentChild = childrenArray[activeStep];

    function isLastStep() {
        return activeStep === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    setActiveStep((activeStep) => activeStep + 1);
                }
            }}
        >
            <Form autoComplete="off">
                <Grid container rowSpacing={4}>
                    <Grid item xs={12}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            align="center"
                            component="h2"
                        >
                            Nueva operacion
                        </Typography>
                        Tercer
                    </Grid>
                    <Grid item xs={12}>
                        <Stepper alternativeLabel activeStep={activeStep}>
                            {childrenArray.map((child) => (
                                <Step key={child.props.label}>
                                    <StepLabel>{child.props.label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={12}>
                        {currentChild}
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
                                    >
                                        Paso anterior
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    {isLastStep() ? "Guardar" : "Siguiente"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}
