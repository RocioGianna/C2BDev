import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function FilePreview({ file, onDelete, onUpload }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function upload() {
            const url = await uploadFile(file, setProgress);
            onUpload(file, url);
        }

        upload();
    }, []);

    console.log(file);
    const fileType = file.type;
    const icon =
        fileType === "application/pdf" ? (
            <InsertDriveFileIcon style={{ height: "50%", width: "100%" }} />
        ) : (
            <img src={URL.createObjectURL(file)}></img>
        );

    return (
        <Box
            sx={{
                p: 2,
                height: 140,
                width: 90,
                mt: 2,
                mr: 2,
                border: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {icon}
            <Typography style={{ overflow: "hidden" }} variant="caption">
                {file.name}
            </Typography>
        </Box>
    );

    function uploadFile(file, onProgress) {
        const url = "...";
        const key = "...";

        return (
            new Promise() <
            string >
            ((res, rej) => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", url);

                xhr.onload = () => {
                    const resp = JSON.parse(xhr.responseText);
                    res(resp.secure_url);
                };
                xhr.onerror = (evt) => rej(evt);
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentage = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percentage));
                    }
                };

                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", key);

                xhr.send(formData);
            })
        );
    }
}
