import React from "react";
import { Box, Grid, Stack, Button, MenuItem } from "@mui/material";
import FormSelect from "../FormSelect";
import { TextField } from "formik-mui";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";
import PhoneInput from "../PhoneInput";
import { countryCodes } from "../../../utils/ValidationUtils";
import parsePhoneNumber from "libphonenumber-js";
import ConditionalForm from "../ConditionalForm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { putOperationDetail } from "../../../services/OperationService";
import { operationFetched } from "../../../state/operationsSlice";
import { useDispatch } from "react-redux";


export function OperationDetailForm({ operationId, operationDetail, handleClose }) {

    function FormActions() {

        return (
            <Stack direction="row" spacing={2} sx={{ py: 1 }}>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />
                <Button sx={{ flexGrow: 1 }} type="submit" variant="contained" color="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button sx={{ flexGrow: 1 }} type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
            </Stack>
        );


    }

    const dispatch = useDispatch();

    const validationSchema = () => {
        return yup.object().shape({
            phoneOperationType: yup.string().required("El tipo de operacion es requerido"),
            phonePrefix: yup.string().when("phoneOperationType", (opType) => {
                if (opType !== "NEW") {
                    return yup
                        .string()
                        .required("El prefijo es requerido")
                        .test("valid-prefix", "Prefijo no valido", (value) => {
                            return countryCodes.includes(value);
                        });
                }
            }),
            phoneNumber: yup.string().when("phoneOperationType", (opType) => {
                if (opType !== "NEW") {
                    return yup
                        .string()
                        .required("El numero es requerido")
                        .test("is-valid-phone", "El formato del telefono no es valido", function(value) {
                            return isValidPhoneNumber(this.options.parent.phonePrefix + " " + value);
                        });
                }
            }),
            phoneOperator: yup.string().when("phoneOperationType", (opType) => {
                if (opType == "PORTABILITY") {
                    return yup.string().required("El operador es obligatorio");
                }
            }),
            lastName: yup.string().when("changePhoneOwner", {
                is: true,
                then: yup.string().required("El apellido es requerido"),
            }),
            name: yup.string().when("changePhoneOwner", {
                is: true,
                then: yup.string().required("El nombre es requerido"),
            }),
            nid: yup.string().when("changePhoneOwner", {
                is: true,
                then: yup.string().required("El DNI es requerido"),
            }),
        });
    };

    const phoneNumber = parsePhoneNumber(operationDetail.phone || "");
    const prefix = phoneNumber ? phoneNumber.countryCallingCode : "";
    const number = phoneNumber ? phoneNumber.nationalNumber : "";

    // Translate operation
    const additionalType = operationDetail.type === "Portabilidad" ? "PORTABILITY" : operationDetail.type === "Nuevo" ? "NEW" : "EXISTING";

    const changePhoneOwner = operationDetail.currentOwnerFirstname !== null && operationDetail.currentOwnerFirstname !== "" && operationDetail.currentOwnerLastname !== null && operationDetail.currentOwnerLastname !== "" && operationDetail.currentOwnerNID !== null && operationDetail.currentOwnerNID !== "";

    console.log({ operationDetail });
    const initialValues = {
        phoneOperationType: additionalType,
        phonePrefix: prefix || "",
        phoneNumber: number || "",
        phoneOperator: operationDetail.currentProvider || "",
        name: operationDetail.currentOwnerFirstname || "",
        lastName: operationDetail.currentOwnerLastname || "",
        nid: operationDetail.currentOwnerNID || "",
        changePhoneOwner: changePhoneOwner,
    };

    return (
        <Box sx={{ py: 1 }}>
            <Formik
                validationSchema={validationSchema}
                onSubmit={async(values, helpers) => {
                    function renameProperty(obj, oldName, newName) {
                        obj[newName] = obj[oldName];
                        delete obj[oldName];
                    }

                    const body = { ...values };

                    body.phone = body.phonePrefix && body.phoneNumber ? values.phonePrefix + " " + values.phoneNumber : null;
                    delete body.phonePrefix;
                    delete body.phoneNumber;
                    delete body.changePhoneOwner;

                    const operationType = values.phoneOperationType;

                    if (operationType === "NEW") {
                        body.phone = null;
                        body.phoneOperator = null;
                    } else {
                        if (operationType === "EXISTING") {
                            body.phoneOperator = null;
                        }
                    }

                    if (operationType === false || operationType === "NEW") {
                        body.name = null;
                        body.lastName = null;
                        body.nid = null;
                    }

                    // if any property in body is "" change it to null
                    for (const key in body) {
                        if (body[key] === "") {
                            body[key] = null;
                        }
                    }

                    // Rename properties
                    renameProperty(body, "lastName", "currentOwnerLastname");
                    renameProperty(body, "name", "currentOwnerFirstname");
                    renameProperty(body, "nid", "currentOwnerNID");
                    renameProperty(body, "phoneOperator", "currentProvider");
                    renameProperty(body, "phoneOperationType", "type");

                    console.log({ body });
                    putOperationDetail(operationId, operationDetail.id, body).then((res) => {
                        console.log(res);
                        dispatch(operationFetched(res.data));
                        handleClose();
                    });
                }}
                initialValues={initialValues}>
                {({ errors, values }) => (
                    <Form autoComplete="off">
                        {/* {console.log({ errors })}
                    {console.log({ values })} */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormSelect name={"phoneOperationType"} label="Tipo de Operacion">
                                    <MenuItem value={"NEW"}>Nuevo</MenuItem>
                                    <MenuItem value={"PORTABILITY"}>Portabilidad</MenuItem>
                                    <MenuItem value={"EXISTING"}>Existente</MenuItem>
                                </FormSelect>
                            </Grid>
                            {values.phoneOperationType !== "NEW" && values.phoneOperationType !== "" && (
                                <Grid item xs={12}>
                                    <PhoneInput phonePrefixName={"phonePrefix"} phoneNumberName={"phoneNumber"} />
                                </Grid>
                            )}
                            {values.phoneOperationType === "PORTABILITY" && values.phoneOperationType !== "" && (
                                <Grid item xs={12}>
                                    <Field fullWidth name={"phoneOperator"} label="Operador Actual Fijo" component={TextField} />
                                </Grid>
                            )}
                            {values.phoneOperationType !== "NEW" && values.phoneOperationType !== "" && (
                                <ConditionalForm label={"Cambio de titular"} name={"changePhoneOwner"}>
                                    <Grid item xs={12}>
                                        <Field fullWidth name={"name"} label="Nombre titular actual" component={TextField} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field fullWidth name={"lastName"} label="Apellido titular actual" component={TextField} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field fullWidth name={"nid"} label="DNI titular actual" component={TextField} />
                                    </Grid>
                                </ConditionalForm>
                            )}
                            <FormActions />
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );

}
