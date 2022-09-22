import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import FilePreview from "./form/FilePreview";

import { Box, Grid, Button, Typography } from "@mui/material";

export default function Dropzone() {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((accFiles, rejFiles) => {
        const mappedAcc = accFiles.map((file) => ({
            file,
            errors: [],
            id: uuidv4(),
        }));
        const mappedRej = rejFiles.map((r) => ({ ...r, id: uuidv4() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <React.Fragment>
            <Box
                sx={{
                    border: 1,
                    p: 2,
                    textAlign: "center",
                    width: "100%",
                    borderColor: "#8F9499",
                    borderRadius: "4px",
                }}
            >
                <input {...getInputProps()} />
                <Typography align="left">Documentacion</Typography>
                <Box
                    sx={{
                        p: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        width: "100%",
                    }}
                >
                    {files.map((fileWrapper, index) => (
                        <FilePreview file={fileWrapper.file} key={index} />
                    ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        mt: 5,
                    }}
                >
                    <Button variant="contained" {...getRootProps()}>
                        Subir archivos
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}
