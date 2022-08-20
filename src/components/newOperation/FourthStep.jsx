import React from "react";
import { TextField } from "formik-material-ui";
import { Field } from "formik";

export default function FourthStep() {
    return (
        <div>
            <Field name="demo" fullWidth label="DEMO" component={TextField} />
        </div>
    );
}
