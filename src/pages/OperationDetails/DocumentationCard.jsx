import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { useTheme } from "@mui/material/styles";
import Card from "../../components/new/Card";

function Item({ item }) {
    const theme = useTheme();
    const itemName = item.path.substring(item.path.lastIndexOf("/") + 1);

    return (
        <Stack sx={{ border: 1, ml: 1, borderColor: "grey.400", borderRadius: "4px", width: "150px" }}>
            <Box sx={{ display: "flex", justifyContent: "center", py: 2, alignItems: "center" }}>
                <FileCopyIcon color="primary" sx={{ fontSize: 50 }} />
            </Box>
            <Box sx={{ background: `${theme.palette.primary.extraLight}`, display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                <Typography variant="subtitle2" noWrap>
                    {itemName}
                </Typography>
                <DownloadIcon />
            </Box>
        </Stack>
    );
}

function DocumentationCard({ operation }) {
    return (
        <Card title="Documentación">
            <Box style={{ overflow: "hidden" }}>
                <Box sx={{ height: "100%", display: "flex", justifyContent: "flex-start", py: 1 }} style={{ overflow: "auto" }}>
                    {operation.documentation.map((item, index) => (
                        <Item key={index} item={item} />
                    ))}
                </Box>
            </Box>
        </Card>
    );
}

export default DocumentationCard;
