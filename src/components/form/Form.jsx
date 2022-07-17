import React from "react";
import { useForm, FormProvider } from "react-hook-form";

function Form(props) {
	const methods = useForm({ mode: props.mode || "onTouched" });

	return (
		<FormProvider {...methods}>
			<form noValidate onSubmit={methods.handleSubmit(props.onSubmit, props.onError)}>
				{props.children}
			</form>
		</FormProvider>
	);
}

export default Form;
