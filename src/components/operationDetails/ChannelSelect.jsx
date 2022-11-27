import React, { useState } from "react";
import { Select, MenuItem, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";

export function ChannelSelect({ channel }) {
    const [selected, setSelected] = useState(channel || "");

    const validationSchema = {
        channel: yup.string().required("El canal es requerido"),
    };

    const initialValues = {
        channel: selected,
    };

    return (
        <Formik
            validationSchema={() => yup.object().shape(validationSchema)}
            onSubmit={async (values, helpers) => {
                console.log(values.channel);
            }}
            initialValues={initialValues}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {console.log(values.channel)}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                            Canal
                        </Typography>
                        <Select
                            value={selected}
                            onChange={(event) => {
                                setSelected(event.target.value);
                                setFieldValue("channel", event.target.value);
                            }}
                            size="small"
                            sx={{ maxWidth: 250, minWidth: 120 }}
                        >
                            <MenuItem value={""}>-</MenuItem>
                            <MenuItem value={"AR"}>AR</MenuItem>
                            <MenuItem value={"FM"}>FM</MenuItem>
                            <MenuItem value={"IR"}>IR</MenuItem>
                            <MenuItem value={"NE"}>NE</MenuItem>
                            <MenuItem value={"OT_LAB"}>OT_LAB</MenuItem>
                            <MenuItem value={"OT_CTG"}>OT_CTG</MenuItem>
                            <MenuItem value={"TF_MUR"}>TF_MUR</MenuItem>
                            <MenuItem value={"SC"}>SC</MenuItem>
                            <MenuItem value={"TOT"}>TOT</MenuItem>
                            <MenuItem value={"TPHS"}>TPHS</MenuItem>
                        </Select>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
