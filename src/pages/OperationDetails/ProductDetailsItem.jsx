import React from "react";
import MuiCard from "@mui/material/Card";
import { OperationDetailsType } from "../../model/Operation/OperationDetailsType";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

function ProductDetailsItem({ operationDetail, step, editable, onEdit }) {
    return (
        <MuiCard
            variant="outlined"
            sx={{
                "py": 1,
                "px": 1.5,
                "position": "relative",
                "& .edit-btn": { display: "none" },
                "&:hover .edit-btn": { display: "flex" },
            }}>
            <Stack px={0.5} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" fontWeight={600}>{step.name}</Typography>
                {operationDetail.phone && <Typography variant="body2">{operationDetail.phone}</Typography>}
            </Stack>
            <Stack px={0.5} direction="row" alignItems="center" justifyContent="space-between">
                <Typography lineHeight={1.5} variant="overline">{OperationDetailsType[operationDetail.type]}</Typography>
                {operationDetail.currentProvider && <Typography variant="body2">{operationDetail.currentProvider}</Typography>}
            </Stack>
            { operationDetail.currentOwnerFirstName != null && <>
                <Divider sx={{ my: 1 }} />
                <Stack px={0.5} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">Cambio de titular</Typography>
                    <Typography variant="body2">
                        {operationDetail.currentOwnerFirstName} {operationDetail.currentOwnerLastName}, {operationDetail.currentOwnerNID}
                    </Typography>
                </Stack>
            </>}
            {editable && <Button
                className="edit-btn"
                variant="contained"
                sx={{
                    "position": "absolute",
                    "top": "0",
                    "right": "0",
                    "width": "100%",
                    "height": "100%",
                    "backgroundColor": "#ffffff88",
                    "border": (theme) => `1px solid ${theme.palette.grey[400]}`,
                    "color": (theme) => theme.palette.grey[400],
                    "&:hover": {
                        backgroundColor: "#ffffff88",
                        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                        color: (theme) => theme.palette.grey[600],
                    },
                }}
                onClick={onEdit} >
                <EditIcon />
            </Button>}
        </MuiCard>
    );
}

export default ProductDetailsItem;
