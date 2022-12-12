import React from "react";
import { Dialog, DialogContent, Typography, IconButton, DialogTitle } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { OperationDetailForm } from "./OperationDetailForm";
import CloseIcon from "@mui/icons-material/Close";


const Title = ({ title, handleClose }) => {
    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down("sm"));

    const titleVariant = xsMatch ? "h5" : "h4";

    return (
        <DialogTitle textAlign="center">
            <Typography variant={titleVariant} component="p">
                {title}
            </Typography>
            <IconButton
                aria-label="close"
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
};

export function OperationDetailEditModal({ operationId, operationDetailToEdit, closeModal }) {
    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down("sm"));

    return (!!operationDetailToEdit
        && <Dialog open={!!operationDetailToEdit} maxWidth={"md"} width={"md"} fullWidth scroll={"paper"} fullScreen={xsMatch}>
            <Title title={"Editar detalle de producto"} handleClose={closeModal} />
            <DialogContent>
                <OperationDetailForm operationId={operationId} operationDetail={operationDetailToEdit} handleClose={closeModal} />
            </DialogContent>
        </Dialog>
    );
}
