import React from "react";
import { FieldArray, useField } from "formik";
import { Grid, Button } from "@mui/material";
import FormSelect from "./FormSelect";

export default function AdditionalsMultiSelect({ disabled, name, children }) {
    const [field, meta, helpers] = useField(name);

    console.log(field);

    return (
        <FieldArray name="additionals">
            {(push, remove) => (
                <>
                    {field.value.map((_, index) => (
                        <div key={index}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <FormSelect
                                        name={`${name}[${index}]`}
                                        label={"Adicionales"}
                                        disabled={disabled}
                                    >
                                        {children}
                                    </FormSelect>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => remove(index)}>
                                        Borrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </>
            )}
        </FieldArray>
    );
}
