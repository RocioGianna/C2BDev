import React, { useState, useEffect } from "react";
import { MultiStepForm } from "../components/MultiStepForm";
import { useNavigate } from "react-router-dom";
import { IconButton, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { reset, addStep } from "../state/formStepsSlice";
import { isAdmin } from "../utils/RolesUtils.js";
import CloseIcon from "@mui/icons-material/Close";
import { notificationDispatched } from "../state/notificactionSlice";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { fetchOperations, postOperation, postOperationAdmin } from "../services/OperationService";
import { operationsFetched } from "../state/operationsSlice.js";
import { store } from "../state/store.js";

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

export default function OperationNew() {
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
        console.log(values);

        const filteredProps = Object.entries(values).filter((prop) => prop[0].match("phoneStep"));
        const operationDetails = [];

        for (let index = 0; index < filteredProps.length / 9; index++) {
            let opDProps = filteredProps.filter((prop) => prop[0].match(index));
            opDProps.forEach((o) => (o[0] = o[0].split("_").pop()));
            let opDetailObject = Object.fromEntries(opDProps);
            operationDetails[index] = {
                stepId: opDetailObject.id,
                type: opDetailObject.phoneOperationType,
                phone: opDetailObject.phoneNumber != "" ? opDetailObject.phonePrefix + " " + opDetailObject.phoneNumber : null,
                currentProvider: opDetailObject.phoneOperator != "" ? opDetailObject.phoneOperator : null,
                currentOwnerfirstName: opDetailObject.name != "" ? opDetailObject.name : null,
                currentOwnerlastName: opDetailObject.lastName != "" ? opDetailObject.lastName : null,
                currentOwnerNID: opDetailObject.nid != "" ? opDetailObject.nid : null,
            };
        }

        const body = {
            collaboratorCode: isAdmin() ? values.collaborator.userCode : user.userCode,
            refererCode: "XXX",
            productOptionId: values.productOptionId,
            additionalIds: values.additionals.map((a) => a.id),
            operationDetails: operationDetails,
            customer: {
                firstName: values.customerName,
                lastName: values.customerlastName,
                nid: values.nid,
                phone: values.phonePrefix + " " + values.phoneNumber,
                email: values.email,
                bankAccount: values.bankAccount,
                billingAddress: {
                    address: values.billingAddress,
                    zipcode: values.billingZipCode,
                    municipality: values.billingMunicipality,
                    province: values.billingProvince,
                },
            },
            documentationIds: values.documentation,
        };

        if (values.differentInstallAddress) {
            body.installationAddress = {
                address: values.installationAddress,
                zipcode: values.installationZipCode,
                municipality: values.installationMunicipality,
                province: values.installationProvince,
            };
        }

        if (values.differentShippingAddress) {
            body.shippingAddress = {
                address: values.shippingAddress,
                zipcode: values.shippingZipCode,
                municipality: values.shippingMunicipality,
                province: values.shippingProvince,
            };
        }

        if (user.phone !== body.collaboratorPhone) body.collaboratorPhone = values.collaboratorEmail;
        if (user.email !== body.collaboratorEmail) body.collaboratorEmail = values.collaboratorPhonePrefix + " " + values.collaboratorPhoneNumber;

        if (isAdmin()) {
            postOperationAdmin(body).then(() => {
                fetchOperations().then((res) => {
                    console.log(res);
                    store.dispatch(operationsFetched(res.data));
                });
            });
        } else {
            postOperation(body).then(() => {
                fetchOperations().then((res) => {
                    console.log(res);
                    store.dispatch(operationsFetched(res.data));
                });
            });
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
                            } catch (error) {
                                console.log(error);
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
