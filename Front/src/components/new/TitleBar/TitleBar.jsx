import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TitleBar({ title, actions, navigateBackTo, customActions }) {

    const navigate = useNavigate();

    return (
        <Paper sx={{ px: 2, py: 1, pr: 1, width: "100%" }}>
            <Stack direction="row" width="100%" justifyContent="space-between">
                <Stack direction="row" spacing={1}>
                    {navigateBackTo && <IconButton sx={{ ml: -1 }} onClick={() => navigate(navigateBackTo)}>
                        <ArrowBackIcon color="primary" />
                    </IconButton>}
                    <Typography variant="h5" sx={{ py: 0.5 }}>
                        {title}
                    </Typography>
                </Stack>
                {customActions
                    ? customActions
                    : actions && <Stack direction="row" spacing={1}>
                        {
                            actions.map((action, i) => (<Button sx={{ px: 1.5, pl: 0.75, display: "flex", gap: 0.5 }} key={i} variant="contained" onClick={action.onClick}>
                                {action.icon}
                                {action.label}
                            </Button>))
                        }
                    </Stack>}
            </Stack>

        </Paper>
    );
}

export default TitleBar;
