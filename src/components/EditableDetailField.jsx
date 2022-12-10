import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { IconButton, Stack, Box, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import operationValidation from "../model/OperationValidation.js";
import { useSelector } from "react-redux";
import parsePhoneNumber from "libphonenumber-js";
import PhoneInput from "./form/PhoneInput.jsx";
import FormSelect from "./form/FormSelect.jsx";
import { putOperation } from "../services/OperationService.js";
import { store } from "../state/store.js";
import { operationFetched } from "../state/operationsSlice.js";
import { useEffect } from "react";

export function EditableDetailField({ setEditMode, value, name, column, type = "text", options, fetchOptions }) {
    const operation = useSelector((state) => state.operations.operation);
    const [fetchedOptions, setFetchedOptions] = useState();

    let initialValues = {};
    let validationSchema = {};

    if (type !== "tel") {
        initialValues = { [name]: value || "" };
        validationSchema = { [name]: operationValidation[name] };
    } else {
        const phoneNumber = parsePhoneNumber(value);
        const prefix = phoneNumber.countryCallingCode;
        const number = phoneNumber.nationalNumber;
        initialValues = { phonePrefix: prefix, phoneNumber: number };

        validationSchema = {
            phonePrefix: operationValidation.phonePrefix,
            phoneNumber: operationValidation.phoneNumber,
        };
    }

    useEffect(() => {
        if (fetchOptions) {
            (async () => {
                setFetchedOptions(await fetchOptions());
            })();
        }
    }, []);


    return (
        <Formik
            validationSchema={() => yup.object().shape(validationSchema)}
            onSubmit={async (values, helpers) => {
                const operationId = operation.id;
                const attribute = name;
                const value = type === "tel" ? values.phonePrefix + " " + values.phoneNumber : values[name];
                putOperation(operationId, column, attribute, value).then((res) => {
                    console.log(res.data);
                    store.dispatch(operationFetched(res.data));
                });
                setEditMode(false);
            }}
            initialValues={initialValues}>
            <Form autoComplete="off">
                <Stack direction="row" spacing={1} sx={{ height: "100%" }}>
                    {type === "tel"
                        ? (
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <PhoneInput phonePrefixName={"phonePrefix"} phoneNumberName={"phoneNumber"} small />
                            </Box>
                        )
                        : type === "select"
                            ? (
                                <FormSelect name={name} small>
                                    {options || fetchedOptions || <MenuItem value={value}></MenuItem>}
                                </FormSelect>
                            )
                            : (
                                <Field
                                    sx={{ height: "100%", display: "flex", justifyContent: "end", flexDirection: "column" }}
                                    InputProps={{ sx: { "& input": { textAlign: "right" } } }}
                                    name={name}
                                    component={TextField}
                                    size="small"
                                    variant="standard" />
                            )}

                    <IconButton size="small" type="submit" sx={{ p: 0.25, m: 0 }}>
                        <CheckIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton onClick={() => setEditMode(false)} size="small" sx={{ p: 0.25, m: 0 }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Form>
        </Formik>);
}
