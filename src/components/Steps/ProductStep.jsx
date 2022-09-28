import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useField, useFormikContext } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormSelect from "../form/FormSelect";
import AdditionalsFieldArray from "../form/AdditionalsFieldArray";
import { useSelector } from "react-redux";
import { store } from "../../state/store";
import { addStep, reset } from "../../state/formStepsSlice";

export function ProductStep() {
    const products = useSelector((state) => state.products.products);
    const additionals = useSelector((state) => state.products.additionals);
    const [firstTime, setFirstTime] = useState(true);

    const { setFieldValue } = useFormikContext();

    const [productId] = useField("productId");
    const [productOptionId] = useField("productOptionId");
    const [productType] = useField("isProfessionalProduct");

    useEffect(() => {
        if (!firstTime) {
            setFieldValue("productOptionId", "", false);
            setFieldValue("productId", "", false);
        } else {
            setFirstTime(false);
        }
    }, [productType.value]);

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
                    <FormSelect
                        name={"isProfessionalProduct"}
                        label={"Tipo de producto"}
                    >
                        <MenuItem value={true}>Profesional</MenuItem>
                        <MenuItem value={false}>Particular</MenuItem>
                    </FormSelect>
                </Grid>
                <Grid item xs={12}>
                    <FormSelect name={"productId"} label={"Nombre de Producto"}>
                        {products
                            .filter((p) => p.professional == productType.value)
                            .map((p) => (
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
                        {productId.value !== "" &&
                            optionsByProduct(productId.value)}
                    </FormSelect>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        align="center"
                        component="h2"
                        sx={{ m: 2 }}
                    >
                        Adicionales
                    </Typography>
                    <AdditionalsFieldArray
                        disabled={
                            productId.value === "" ||
                            productOptionId.value === "" ||
                            !additionalsByProduct(productId.value).length
                        }
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

const onSubmit = async (values, setFieldValue) => {
    store.dispatch(reset());
    const selectedProductId = values.productId;
    const selectedProductOptionId = values.productOptionId;
    const productList = store.getState().products.products;
    const product = productList.find((p) => p.id === selectedProductId);
    const option = product.options.find(
        (o) => o.id === selectedProductOptionId
    );

    let steps = [];
    values.additionals.forEach((additional) => {
        steps.push(additional.steps);
    });

    steps.push(option.steps);
    steps = steps.flat();

    steps.forEach((step, index) => {
        store.dispatch(addStep(step));
        setFieldValue(`phoneStep_${index}_phoneOperationType`, "", false);
        setFieldValue(`phoneStep_${index}_phone`, "", false);
        setFieldValue(`phoneStep_${index}_phoneOperator`, "", false);
        setFieldValue(`phoneStep_${index}_surname`, "", false);
        setFieldValue(`phoneStep_${index}_name`, "", false);
        setFieldValue(`phoneStep_${index}_dni`, "", false);
        setFieldValue(`phoneStep_${index}_changePhoneOwner`, false, false);
    });
};

export default {
    validationSchema: validationSchema,
    reactComponent: ProductStep,
    label: "Producto",
    onSubmit: onSubmit,
};
