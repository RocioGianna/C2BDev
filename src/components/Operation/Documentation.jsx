import React from "react";
import { Typography, Box, Paper, Stack } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { useTheme } from "@mui/material/styles";

export function Documentation() {
    const items = [{ name: "Name.png" }, { name: "Name.png" }, { name: "Name.png" }, { name: "Name.png" }, { name: "Name.png" }];
    const theme = useTheme();

    function Item({ item }) {
        return (
            <Stack sx={{ border: 1, ml: 1, borderColor: "grey.400", borderRadius: "4px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", py: 2, alignItems: "center" }}>
                    <FileCopyIcon color="primary" sx={{ fontSize: 50 }} />
                </Box>
                <Box sx={{ background: `${theme.palette.primary.extraLight}`, display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                    <Typography>{item.name}</Typography>
                    <DownloadIcon />
                </Box>
            </Stack>
        );
    }

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                Documentacion
            </Typography>
            <Box style={{ overflow: "hidden" }} sx={{ px: 2 }}>
                <Box sx={{ height: "100%", display: "flex", justifyContent: "flex-start", p: 2 }} style={{ overflow: "auto" }}>
                    {items.map((item, index) => (
                        <Item key={index} item={item} />
                    ))}
                </Box>
            </Box>
        </Paper>
    );
}
