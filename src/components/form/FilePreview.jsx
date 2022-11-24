import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { Typography, Box, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { postDocumentation, deleteDocumentation } from "../../services/DocumentationService";

import CloseIcon from "@mui/icons-material/Close";

export default function FilePreview({ file, handleDelete, handlePush }) {
    const session = useSelector((state) => state.session);

    const [preview, setPreview] = useState(null);
    const [docId, setDocId] = useState(null);
    const [docPath, setDocPath] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (file.type === "application/pdf") {
                setPreview(<PictureAsPdfIcon style={{ height: "100%", width: "100%", color: "primary.dark" }} />);
            } else {
                if (file.type.startsWith("image/")) {
                    setPreview(<img style={{ width: "100%" }} src={URL.createObjectURL(file)}></img>);
                } else {
                    setPreview(<InsertDriveFileIcon style={{ height: "100%", width: "100%", color: "primary.dark" }} />);
                }
            }
        };
        postDocumentation(file, session.user.userCode)
            .then((res) => {
                console.log(res);

                // extract file name from path
                const fileName = res.data.path.substring(res.data.path.lastIndexOf("/") + 1);
                setDocId(res.data.id);
                setDocPath(fileName);
                handlePush(res.data.id, fileName);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [file]);

    const onDelete = () => {
        deleteDocumentation(docId)
            .then((res) => {
                console.log(res);
                handleDelete(docId, docPath);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                position: "relative",
            }}
        >
            <IconButton
                onClick={() => {
                    onDelete(docId);
                }}
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ flexBasis: "50%" }}>{preview}</Box>

            <Typography style={{ overflow: "hidden" }} sx={{ flexBasis: "50%" }} variant="caption">
                {file.name}
            </Typography>
        </Box>
    );
}
