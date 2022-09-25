import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function FilePreview({ file, onDelete, onUpload }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function upload() {
            const url = await uploadFile(file, setProgress);
            onUpload(file, url);
        }

        upload();
    }, []);

    const fileType = file.type;
    const icon =
        fileType === "application/pdf" ? (
            <PictureAsPdfIcon
                style={{ height: "100%", width: "100%", color: "primary.dark" }}
            />
        ) : fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/jpg" ? (
            <img
                style={{ width: "100%" }}
                src={URL.createObjectURL(file)}
            ></img>
        ) : (
            <InsertDriveFileIcon
                style={{ height: "100%", width: "100%", color: "primary.dark" }}
            />
        );

    return (
        <Box
            sx={{
                p: 2,
                height: 160,
                width: 120,
                mt: 2,
                mr: 2,
                border: 1,
                display: "flex",
                flexDirection: "column",
                borderColor: "grey.400",
                borderRadius: "4px",
            }}
        >
            <Box sx={{ flexBasis: "50%" }}>{icon}</Box>
            <Typography
                style={{ overflow: "hidden" }}
                sx={{ flexBasis: "50%" }}
                variant="caption"
            >
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
