import React from "react";
import { MultiStepForm } from "./MultiStepForm";
import FormSteps from "./Steps/StepBundler";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
} from "@mui/material";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Title = ({ title }) => {
    return (
        <DialogTitle>
            <Box display="flex">
                <Box m="auto">
                    <Typography variant="h4" component="span">
                        {title}
                    </Typography>
                </Box>
            </Box>
        </DialogTitle>
    );
};

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
            <Title title={"Nueva Operacion"} />

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
