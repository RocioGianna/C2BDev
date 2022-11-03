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

    const handleNewOperationPost = (values) => {
        const filteredProps = Object.keys(values).filter((prop) => prop.match("phoneStep"));
        console.log(filteredProps.length);
        const operationDetails = Array.apply(null, new Array(filteredProps.length / 8));

        console.log(operationDetails);
        operationDetails.forEach((opD, index) => {
            const opDProps = filteredProps.filter((prop) => prop.match(index));
            console.log("opDProps: ", index, opDProps);
            operationDetails[index] = {
                
            }
        });

        const body = {
            colaboratorCode: values.collaboratorId,
            colaboratorEmail: values.collaboratorEmail,
            colaboratorPhone: values.collaboratorPhoneNumber,
            productOptionId: values.productOptionId,
            additionalIds: values.additionals,
            operationDetails: operationDetails,
            customer: {
                firstName: values.clientName,
                lastName: values.clientSurname,
                nid: values.dni,
                phone: values.phonePrefix + " " + values.phoneNumber,
                email: values.email,
                bankAccount: values.bankAccount,
                address: {
                    address: values.billingAddress,
                    zipcode: values.zipcode,
                    municipality: values.municipality,
                    province: values.province,
                },
            },
            installationAddress: {
                address: values.instalattionAddress,
                zipcode: values.zipCodeInstallation,
                municipality: values.municipalityInstallation,
                province: values.provinceInstallation,
            },
            shippingAddress: {
                address: values.instalattionAddress2,
                zipcode: zipCodeInstallation2,
                municipality: values.municipalityInstallation2,
                province: provinceInstallation2,
            },
            documentation,
        };
    };

    return (
        <>
            <Dialog open={open} maxWidth={"md"} width={"md"} fullWidth={true} scroll={"paper"} fullScreen={xsMatch}>
                <Title title={"Nueva Operacion"} handleClose={handleClose} />
                <DialogContent>
                    <MultiStepForm
                        onSubmit={async (values) => {
                            await sleep(2000); // SLEEP DE POST
                            handleNewOperationPost(values);
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
