import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useField, useFormikContext } from "formik";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormSelect from "../form/FormSelect";
import AdditionalsFieldArray from "../form/AdditionalsFieldArray";
import { useSelector } from "react-redux";
import { store } from "../../state/store";
import { resetPhoneSteps, addPhoneStep } from "../../state/formStepsSlice";

export function ProductStep() {
    const products = useSelector((state) => state.products.products);
    const additionals = useSelector((state) => state.products.additionals);
    const [firstTime, setFirstTime] = useState(true);
    const [firstTime2, setFirstTime2] = useState(true);

    const { setFieldValue } = useFormikContext();

    const [productId] = useField("productId");
    const [productOptionId] = useField("productOptionId");
    const [productType] = useField("isProfessionalProduct");

    useEffect(() => {
        if (!firstTime) {
            setFieldValue("productOptionId", "", false);
            setFieldValue("productId", "", false);
            setFieldValue("additionals", [], false);
        } else {
            setFirstTime(false);
        }
    }, [productType.value]);

    useEffect(() => {
        if (!firstTime2) {
            setFieldValue("productOptionId", "", false);
        } else {
            setFirstTime2(false);
        }
    }, [productId.value]);

    const optionsByProduct = (productId) => {
        const product = products.find((p) => p.id === productId);
        const productOptions = product.options;

        return productOptions.map((option) => (
            <MenuItem key={option.id} value={option.id} divider>
                {option.name}
            </MenuItem>
        ));
    };

    const additionalsByProduct = (productId) => {
        const product = products.find((p) => p.id === productId);
        const additionalsIds = product.availableAdditionals;
        return additionals.filter((a) => additionalsIds.includes(a.id));
    };

    // if (productId.value) console.log(additionalsByProduct(productId.value));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect name={"isProfessionalProduct"} label={"Tipo de producto"}>
                        {/* <MenuItem value={true}>Profesional</MenuItem> */}
                        <MenuItem value={false}>Particular</MenuItem>
                    </FormSelect>
                </Grid>
                <Grid item xs={12}>
                    <FormSelect name={"productId"} label={"Nombre de Producto"} disabled={productType.value === ""}>
                        {products
                            .filter((p) => p.professional === productType.value)
                            .map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    {`${p.name}${p.description ? " (" + p.description + ")" : ""}`}
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
                    <AdditionalsFieldArray disabled={productId.value === "" || productOptionId.value === "" || !additionalsByProduct(productId.value).length} name={"additionals"} availableAdditionals={productId.value !== "" && additionalsByProduct(productId.value)} />
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
    store.dispatch(resetPhoneSteps());
    const selectedProductId = values.productId;
    const selectedProductOptionId = values.productOptionId;
    const productList = store.getState().products.products;
    const product = productList.find((p) => p.id === selectedProductId);
    const option = product.options.find((o) => o.id === selectedProductOptionId);

    let steps = [];
    values.additionals.forEach((additional) => {
        steps.push(additional.steps);
    });

    steps.push(option.steps);
    steps = steps.flat();

    steps.forEach((step, index) => {
        store.dispatch(addPhoneStep(step));
        setFieldValue(`phoneStep_${index}_id`, step.id, false);
        setFieldValue(`phoneStep_${index}_phoneOperationType`, "", false);
        setFieldValue(`phoneStep_${index}_phonePrefix`, "+34", false);
        setFieldValue(`phoneStep_${index}_phoneNumber`, "", false);
        setFieldValue(`phoneStep_${index}_phoneOperator`, "", false);
        setFieldValue(`phoneStep_${index}_lastName`, "", false);
        setFieldValue(`phoneStep_${index}_name`, "", false);
        setFieldValue(`phoneStep_${index}_nid`, "", false);
        setFieldValue(`phoneStep_${index}_changePhoneOwner`, false, false);
    });
};

export default {
    validationSchema: validationSchema,
    reactComponent: ProductStep,
    label: "Producto",
    onSubmit: onSubmit,
};
