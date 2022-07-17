import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

function FormText(props) {
	const { control } = useFormContext();

	return (
		<Controller
			name={props.name}
			control={control}
			defaultValue={props.defaultValue ? props.defaultValue : ""}
			render={({ field, fieldState: { error } }) => {
				return (
					<TextField
						{...field}
						type={props.type}
						disabled={!!props.disabled}
						error={!!error}
						label={props.label}
						helperText={error ? error.message : null}
						variant="outlined"
						fullWidth
						margin="normal"
					/>
				);
			}}
		/>
	);
}

export default FormText;
