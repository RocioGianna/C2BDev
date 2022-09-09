import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Field, useField } from "formik";
import { Select, Box, Grid, MenuItem, InputLabel } from "@mui/material";

// GET /products
const products = [
    {
        id: 0,
        name: "PROD1",
        options: [
            {
                id: 0,
                name: "OPT1",
                requiredSteps: {
                    mobile: 3, // amounts
                    fixed: 1,
                },
            },
            {
                id: 1,
                name: "OPT2",
                requiredSteps: {
                    mobile: 1,
                    fixed: 1,
                },
            },
            {
                id: 2,
                name: "OPT3",
                requiredSteps: {
                    mobile: 0,
                    fixed: 1,
                },
            },
        ],
        additionalTypes: [0, 1], // additional types ids
    },
    {
        id: 1,
        name: "PROD2",
        options: [
            {
                id: 3,
                name: "OPT1",
                requiredSteps: {
                    mobile: 3,
                    fixed: 1,
                },
            },
            {
                id: 4,
                name: "OPT2",
                requiredSteps: {
                    mobile: 1,
                    fixed: 1,
                },
            },
            {
                id: 5,
                name: "OPT3",
                requiredSteps: {
                    mobile: 0,
                    fixed: 1,
                },
            },
        ],
        additionalTypes: [2],
    },
];

// GET /additionals
const additionals = [
    {
        id: 0,
        name: "ADDITIONAL TYPE 1",
        options: [
            {
                id: 0,
                name: "ADDITIONAL 1",
                requiredSteps: {
                    mobile: 1,
                    fixed: 0,
                },
            },
            {
                id: 1,
                name: "ADDITIONAL 2",
                requiredSteps: {
                    mobile: 1,
                    fixed: 0,
                },
            },
        ],
    },
    {
        id: 1,
        name: "ADDITIONAL TYPE 2",
        options: [
            {
                id: 2,
                name: "ADDITIONAL 1",
                requiredSteps: {
                    mobile: 0,
                    fixed: 1,
                },
            },
            {
                id: 3,
                name: "ADDITIONAL 2",
                requiredSteps: {
                    mobile: 0,
                    fixed: 1,
                },
            },
        ],
    },
    {
        id: 2,
        name: "ADDITIONAL TYPE 2",
        options: [
            {
                id: 4,
                name: "ADDITIONAL 1",
                requiredSteps: {
                    mobile: 0,
                    fixed: 0,
                },
            },
            {
                id: 5,
                name: "ADDITIONAL 2",
                requiredSteps: {
                    mobile: 0,
                    fixed: 0,
                },
            },
        ],
    },
];

const ProductSelect = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
        <Select
            defaultValue=""
            name={name}
            value={value}
            fullWidth
            onChange={(e) => {
                setFieldValue(name, e.target.value);
            }}
        >
            {children}
        </Select>
    );
};

export function ProductStep() {
    const [productIdField] = useField("productId");
    const [productIdField2] = useField("productDetailId");

    const currentProductId = productIdField;
    const currentAdditionals = additionals[currentProductId.value];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel id="helperLabel">Producto</InputLabel>
                    <Field
                        fullWidth
                        id="helperLabel"
                        labelId="helperLabel"
                        component={ProductSelect}
                        label="Producto"
                        name="productId"
                    >
                        {products.map((prod) => (
                            <MenuItem value={prod.id} key={prod.id}>
                                {prod.name}
                            </MenuItem>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="helperDetailLabel">
                        Detalle de Producto
                    </InputLabel>
                    <Field
                        fullWidth
                        id="helperDetailLabel"
                        labelId="helperDetailLabel"
                        component={ProductSelect}
                        label="Detalle de Producto"
                        name="productDetailId"
                    >
                        {currentAdditionals &&
                            currentAdditionals.options.map((opt) => (
                                <MenuItem value={opt.id} key={opt.id}>
                                    {opt.name}
                                </MenuItem>
                            ))}
                    </Field>
                </Grid>
            </Grid>
        </Box>
    );
}

const validationSchema = yup.object().shape({});

export default {
    ValidationSchema: validationSchema,
    ReactComponent: ProductStep,
    Label: "Producto",
};
