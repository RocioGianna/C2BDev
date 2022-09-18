import React from "react";
import * as yup from "yup";
import { useField } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormSelect from "../form/FormSelect";
import AdditionalsFieldArray from "../form/AdditionalsFieldArray";
import { useSelector } from "react-redux";

export function ProductStep() {
    const products = useSelector((state) => state.products.products);
    const additionals = useSelector((state) => state.products.additionals);

    const [productId] = useField("productId");
    const [productOptionId] = useField("productOptionId");

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
        const additionalsIds = product.availableAdditionals;
        return additionals.filter((a) => additionalsIds.includes(a.id));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect name={"productId"} label={"Nombre de Producto"}>
                        {products.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </FormSelect>
                </Grid>
                <Grid item xs={12}>
                    <FormSelect name={"productOptionId"} label={"Opcion de Producto"} disabled={productId.value === ""}>
                        {productId.value !== "" && optionsByProduct(productId.value)}
                    </FormSelect>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" align="center" component="h2" sx={{ m: 2 }}>
                        Adicionales
                    </Typography>
                    <AdditionalsFieldArray
                        disabled={productId.value === "" || productOptionId.value === ""}
                        name={"additionals"}
                    >
                        {productId.value !== "" &&
                            additionalsByProduct(productId.value).map((a) => {
                                return a.options.map((o) => (
                                    <MenuItem key={o.id} value={o}>
                                        <strong>{a.name}</strong>: {o.name}
                                    </MenuItem>
                                ));
                            })}
                    </AdditionalsFieldArray>
                </Grid>
            </Grid>
        </Box>
    );
}

const validationSchema = (index) => {
    return yup.object().shape({
        productId: yup.string().required("El producto es requerido"),
        productOptionId: yup.string().required("La opcion es requerida"),
    });
};

export default {
    ValidationSchema: validationSchema,
    ReactComponent: ProductStep,
    Label: "Producto",
};
