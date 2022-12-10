import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";

function Chat() {


    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "column", height: "50vh" }}>
            <Box>
                <Typography variant="h6" sx={{ flexGrow: 1, p: 2 }}>
                    Chat
                </Typography>
                <Divider style={{ width: "100%" }} />
            </Box>
            <Typography variant="overline" sx={{ flexGrow: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }} align="center">
                No hay chats
            </Typography>
        </Paper>
    );
}

export default Chat;
