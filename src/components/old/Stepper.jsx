import React, { useEffect } from "react";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import LensRoundedIcon from "@mui/icons-material/LensRounded";
import { Step, StepLabel, Stepper as StepperMaterial, MobileStepper } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Stepper({ activeStep, childrenArray }) {
    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down("sm"));

    if (!childrenArray) return <div>Loading</div>;

    if (xsMatch)
        return (
            <MobileStepper variant="dots" steps={childrenArray.length} position="static" activeStep={activeStep} sx={{ background: "none", justifyContent: "center", flexGrow: 1 }}>
                {childrenArray.map((child, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={StepIcon}></StepLabel>
                    </Step>
                ))}
            </MobileStepper>
        );

    return (
        <StepperMaterial alternativeLabel activeStep={activeStep} connector={<Connector />}>
            {childrenArray.map((child, index) => (
                <Step key={index}>
                    <StepLabel StepIconComponent={StepIcon}></StepLabel>
                </Step>
            ))}
        </StepperMaterial>
    );
}

const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
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

function StepIcon(props) {
    const { active, completed, className } = props;

    return (
        <StepIconRoot ownerState={{ active }} className={className}>
            {completed ? <TripOriginRoundedIcon className="QontoStepIcon-completedIcon" /> : <LensRoundedIcon />}
        </StepIconRoot>
    );
}

const Connector = styled(StepConnector)(({ theme }) => ({
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
        borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));
