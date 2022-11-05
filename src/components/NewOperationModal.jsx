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
import {postOperation, postOperationAdmin} from "../services/OperationService";

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
        const filteredProps = Object.entries(values).filter((prop) => prop[0].match("phoneStep"));
        const operationDetails = [];

        for (let index = 0; index < filteredProps.length / 8; index++) {
            let opDProps = filteredProps.filter((prop) => prop[0].match(index));
            opDProps.forEach((o) => (o[0] = o[0].split("_").pop())); 
            let opDetailObject = Object.fromEntries(opDProps);
            operationDetails[index] = {
                optionId: opDetailObject.id,
                type: opDetailObject.phoneOperationType,
                phone: opDetailObject.phonePrefix + " " + opDetailObject.phoneNumber,
                currentProvider: opDetailObject.phoneOperator,
                currentOwnerFirstname: opDetailObject.name,
                currentOwnerLastname: opDetailObject.surname,
                currentOwnerNID: opDetailObject.dni,
            };
        }

        const body = {
            colaboratorCode: values.collaboratorId,
            colaboratorEmail: values.collaboratorEmail,
            colaboratorPhone: values.collaboratorPhoneNumber,
            refererCode: "XXX",
            productOptionId: values.productOptionId,
            additionalIds: values.additionals.map((a) => a.id),
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
                zipcode: values.zipCodeInstallation2,
                municipality: values.municipalityInstallation2,
                province: values.provinceInstallation2,
            },
            documentation: [values.documentation], //?
        };

        if ( isAdmin() ){
            postOperationAdmin(body)
        }else{
            postOperation(body);
        }
    };

    return (
        <>
            <Dialog open={open} maxWidth={"md"} width={"md"} fullWidth={true} scroll={"paper"} fullScreen={xsMatch}>
                <Title title={"Nueva Operacion"} handleClose={handleClose} />
                <DialogContent>
                    <MultiStepForm
                        onSubmit={async (values) => {
                            try {
                                handleNewOperationPost(values);
                                dispatch(
                                    notificationDispatched({
                                        notification: { message: "Operacion completada", state: "success" },
                                    })
                                );
                                handleClose();
                            } catch {
                                dispatch(
                                    notificationDispatched({
                                        notification: { message: "Hubo un error en la subida de la operacion", state: "success" },
                                    })
                                );
                            }
                        }}
                        steps={formSteps}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
