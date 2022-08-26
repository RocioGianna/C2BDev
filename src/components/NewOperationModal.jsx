import React from "react";
import { MultiStepForm } from "./MultiStepForm";
import FormSteps from "./Steps/StepBundler";
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function NewOperationModal({ ...props }) {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClose = (value) => {
        setOpen(false);
        navigate("/home");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"lg"}
            width={"lg"}
            fullWidth={true}
            scroll={"paper"}
        >
            <DialogTitle>
                <Typography variant="h4" component="span">
                    Nueva operacion
                </Typography>
            </DialogTitle>

            <DialogContent>
                <MultiStepForm
                    onSubmit={async () => {
                        await sleep(3000);
                        console.log("submit");
                    }}
                    steps={FormSteps}
                />
            </DialogContent>
        </Dialog>
    );
}
