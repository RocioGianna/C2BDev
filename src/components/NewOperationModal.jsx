import React, { useState, useEffect } from "react";
import { MultiStepForm } from "./MultiStepForm";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset, addStep } from "../state/formStepsSlice";
import { isAdmin } from "../utils/RolesUtils.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Title = ({ title }) => {
    return (
        <DialogTitle textAlign="center">
            <Typography variant="h4" component="p">
                {title}
            </Typography>
        </DialogTitle>
    );
};

export default function NewOperationModal() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const formSteps = useSelector((state) => state.formSteps.steps);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        navigate("..");
        dispatch(reset());
    };

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (user && isAdmin()) {
            dispatch(addStep("ADMIN_STEP"));
        }
    }, [user]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={"md"} width={"md"} fullWidth={true} scroll={"paper"}>
            <Title title={"Nueva Operacion"} />
            <DialogContent>
                <MultiStepForm
                    onSubmit={async () => {
                        await sleep(3000);
                        handleClose();
                    }}
                    steps={formSteps}
                />
            </DialogContent>
        </Dialog>
    );
}
