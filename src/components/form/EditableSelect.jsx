import React from "react";
import {Autocomplete,TextField} from "@mui/material"
import {useFormikContext} from "formik";

export function EditableSelect({selectOptions,fieldName,disabled}) {

    const {setFieldValue} = useFormikContext()
    const additionals = selectOptions.map(additional => additional.options).flat()
    const options = selectOptions
        .map(additional => additional.options.map(option => ({id:option.id , label:`(${additional.name}) ${option.name}`, popular: option.popular, mobile : additional.name})))
        .flat()
        .sort((a, b) => {
            let sortValue = b.popular - a.popular
            if(sortValue != 0) return sortValue
            let isMobile = b.mobile === "Linea Movil"
            if(isMobile) return 1
            return -1
        })

    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            disablePortal
            name={fieldName}
            sx={{ width: "100%" }}
            onChange={(e,value) => {
                const additional = additionals.find(a => a.id == value?.id)
                setFieldValue(fieldName,additional || "")

            }}
            ListboxProps={{ style: { maxHeight: 200 } }}
            includeInputInList
            disabled={disabled}
            renderInput={(params) =>
                (
                            <TextField
                                {...params}
                                fullWidth
                                label="Adicional"
                                name={fieldName}
                                variant="outlined"
                            />
                        )}
        />


    )
}
