import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const Preview = (props) => {
    const { name, percent, status } = props.meta;

    return (
        <span
            style={{
                alignSelf: "flex-start",
                margin: "10px 3%",
                fontFamily: "Helvetica",
            }}
        >
            {name}, {Math.round(percent)}%, {status}
        </span>
    );
};

export default function DocumentationDropZone({ name, children }) {
    const getUploadParams = () => ({ url: "https://httpbin.org/post" });

    const handleSubmit = (files, allFiles) => {
        allFiles.forEach((f) => f.remove());
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            PreviewComponent={Preview}
            inputContent="Drop Files (Custom Preview)"
            disabled={(files) =>
                files.some((f) =>
                    [
                        "preparing",
                        "getting_upload_params",
                        "uploading",
                    ].includes(f.meta.status)
                )
            }
        />
    );
}
