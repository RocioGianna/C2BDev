import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { IconButton, Stack, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import operationValidation from "../model/OperationValidation.js";
import { useSelector } from "react-redux";
import parsePhoneNumber from "libphonenumber-js";
import PhoneInput from "./form/PhoneInput.jsx";
import FormSelect from "./form/FormSelect.jsx";
import { putOperation } from "../services/OperationService.js";

export function EditableDetailField({ value, name, operationStatus, column, type = "text", children }) {
    const [editMode, setEditMode] = useState(false);
    const [hoverMode, setHoverMode] = useState(false);

    const editPermissions = useSelector((state) => state.operations.permissions);
    const editPermission = editPermissions[operationStatus];
    const canEdit = editPermission.includes(column);
    const operation = useSelector((state) => state.operations.operation);

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

    if (editMode)
        return (
            <Formik
                validationSchema={() => yup.object().shape(validationSchema)}
                onSubmit={async (values, helpers) => {
                    let operationId = operation.id;
                    let attribute = name;
                    let value = values[name];
                    putOperation(operationId, column, attribute, value);
                    setEditMode(false);
                }}
                initialValues={initialValues}
            >
                <Form autoComplete="off">
                    <Stack direction="row" spacing={1} sx={{ heigth: "100%" }}>
                        {type === "tel" ? (
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <PhoneInput phonePrefixName={`phonePrefix`} phoneNumberName={`phoneNumber`} small />
                            </Box>
                        ) : type === "select" ? (
                            <FormSelect name={name} small>
                                {children}
                            </FormSelect>
                        ) : (
                            <Field
                                sx={{ heigth: "100%", display: "flex", justifyContent: "end", flexDirection: "column" }}
                                InputProps={{
                                    sx: {
                                        "& input": {
                                            textAlign: "right",
                                            fontSize: "0.875rem",
                                        },
                                    },
                                }}
                                name={name}
                                component={TextField}
                                size="small"
                                variant="standard"
                            />
                        )}

                        <IconButton size="small" type="submit">
                            <CheckIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton onClick={() => setEditMode(false)} size="small">
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Form>
            </Formik>
        );
    else {
        return (
            <Stack direction="row" spacing={1} onMouseEnter={() => setHoverMode(true)} onMouseLeave={() => setHoverMode(false)}>
                <span>{value ? value : "-"}</span>
                {canEdit && hoverMode && (
                    <IconButton onClick={() => setEditMode(true)} size="small" sx={{ p: 0, m: 0 }}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                )}
            </Stack>
        );
    }
}
