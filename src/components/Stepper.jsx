import React from "react";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import LensRoundedIcon from "@mui/icons-material/LensRounded";
import { Step, StepLabel } from "@mui/material";

export default function Stepper({ activeStep, childrenArray }) {
    if (!childrenArray) return <div></div>;

    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
        >
            {childrenArray.map((child) => (
                <Step key={child.props.label}>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#551482",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#551482",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

export function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <TripOriginRoundedIcon className="QontoStepIcon-completedIcon" />
            ) : (
                <LensRoundedIcon />
            )}
        </QontoStepIconRoot>
    );
}

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#551482",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#551482",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));
