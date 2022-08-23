import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useField } from "formik";

export default function FirstStep() {
    const [field, meta, helpers] = useField("files");
    const { value } = meta;
    const { setValue } = helpers;

    return (
        <DropzoneArea
            acceptedFiles={["image/*", "video/*", "application/*"]}
            showFileNames
            onChange={(e) => setValue(e)}
            dropzoneText="Arrastre su archivo aqui"
            showAlerts={false}
            filesLimit={20}
        />
    );
}
