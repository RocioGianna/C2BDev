import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useField } from "formik";

export default function DropZone({ name }) {
    const [field, meta, helpers] = useField(name);
    const { value } = meta;
    const { setValue } = helpers;

    return (
        <DropzoneArea
            acceptedFiles={["application/pdf"]}
            showFileNames
            onChange={(e) => setValue(e)}
            dropzoneText="Arrastre su archivo aqui"
            showAlerts={false}
            filesLimit={20}
        />
    );
}
