import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Field, useField } from "formik";
import {
    Select,
    Box,
    Grid,
    MenuItem,
    Button,
    InputLabel,
    ListSubheader,
    Typography,
} from "@mui/material";
import FormSelect from "../form/FormSelect";
import AdditionalsMultiSelect from "../form/AdditionalsMultiSelect";
import { Autocomplete } from "formik-mui";

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

export function ProductStep() {
    const [productId] = useField("productId");
    const [productOptionId] = useField("productOptionId");
    const [additionals3] = useField("additionals");

    console.log(
        "VALORES: " +
            "productId.value : " +
            productId.value +
            "\n" +
            "productOptionId.value : " +
            productOptionId.value +
            "\n" +
            "additionals3.value : " +
            additionals3.value
    );

    const optionsByProduct = (productId) => {
        const product = products.find((p) => p.id == productId);
        const productOptions = product.options;

        return productOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
                {option.name}
            </MenuItem>
        ));
    };

    const additionalsByProduct = (productId) => {
        const product = products.find((p) => p.id == productId);
        const additionalsIds = product.additionalTypes;
        return additionals.filter((a) => additionalsIds.includes(a.id));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect name={"productId"} label={"Nombre de Producto"}>
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {products.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </FormSelect>
                </Grid>
                <Grid item xs={12}>
                    <FormSelect
                        name={"productOptionId"}
                        label={"Opcion de Producto"}
                        disabled={productId.value === ""}
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {productId.value !== "" &&
                            optionsByProduct(productId.value)}
                    </FormSelect>
                </Grid>

                <Grid item xs={12}>
                    <AdditionalsMultiSelect
                        disabled={
                            productId.value === "" ||
                            productOptionId.value === ""
                        }
                        name={"additionals"}
                        title={"Adicionales"}
                    >
                        {productId.value !== "" &&
                            additionalsByProduct(productId.value).map((a) => {
                                return a.options.map((o) => (
                                    <MenuItem key={o.id} value={o}>
                                        <Box sx={{ fontWeight: "bold" }}>
                                            {a.name}
                                        </Box>{" "}
                                        : {o.name}
                                    </MenuItem>
                                ));
                            })}
                    </AdditionalsMultiSelect>
                </Grid>
            </Grid>
        </Box>
    );
}

const validationSchema = yup.object().shape({
    productId: yup.string().required("El producto es requerido"),
    productOptionId: yup.string().required("La opcion es requerida"),
});

export default {
    ValidationSchema: validationSchema,
    ReactComponent: ProductStep,
    Label: "Producto",
};
