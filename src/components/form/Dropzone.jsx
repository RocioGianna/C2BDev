import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import FilePreview from "./FilePreview";
import { Box, Button, Typography } from "@mui/material";

export default function Dropzone({ onPush, onDelete }) {
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

    const handleDelete = (id, path) => {
        setFiles((curr) => curr.filter((f) => f.path !== path));
        onDelete(id);
    };

    const handlePush = (id) => {
        onPush(id);
    };

    return (
        <>
            <Box
                sx={{
                    border: 1,
                    p: 2,
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    borderColor: "grey.400",
                    borderRadius: "4px",
                    position: "relative",
                }}
                onClick={() => {}}
            >
                <input
                    style={{
                        position: "absolute",
                        width: "100%",
                    }}
                    {...getInputProps()}
                />

                <Typography align="left" sx={{ color: "grey.600" }}>
                    Documentacion
                </Typography>
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
                        <FilePreview file={fileWrapper.file} key={index} handlePush={(id) => handlePush(id)} handleDelete={(id) => handleDelete(id)} />
                    ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        mt: 5,
                    }}
                >
                    <Button variant="contained" onClick={getRootProps().onClick}>
                        Subir archivos
                    </Button>
                </Box>
            </Box>
        </>
    );
}
