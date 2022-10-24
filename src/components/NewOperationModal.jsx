import React, { useState, useEffect } from "react";
import { MultiStepForm } from "./MultiStepForm";
import { useNavigate } from "react-router-dom";
import { IconButton, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { reset, addStep } from "../state/formStepsSlice";
import { isAdmin } from "../utils/RolesUtils.js";
import CloseIcon from "@mui/icons-material/Close";
import { notificationDispatched } from "../state/notificactionSlice";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
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

    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Dialog open={open} maxWidth={"md"} width={"md"} fullWidth={true} scroll={"paper"} fullScreen={xsMatch}>
                <Title title={"Nueva Operacion"} handleClose={handleClose} />
                <DialogContent>
                    <MultiStepForm
                        onSubmit={async () => {
                            await sleep(2000); // SLEEP DE POST
                            dispatch(
                                notificationDispatched({
                                    notification: { message: "Operacion completada", state: "success" },
                                })
                            );
                            handleClose();
                        }}
                        steps={formSteps}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
