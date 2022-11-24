import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";

export function Chat({ chatData }) {
    function ChatContent({ chatData }) {
        return chatData ? (
            <Typography variant="h8" sx={{ flexGrow: 1, p: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis libero odio, eu bibendum neque congue a. Sed eu tortor vel eros consequat sodales et quis libero. Fusce at justo hendrerit, facilisis leo vel, ornare nulla. Etiam sed risus eros. Etiam a sagittis lacus. Nam posuere ex nec mauris convallis, tempor venenatis ante blandit. Praesent egestas eleifend arcu, sit amet vestibulum nisl condimentum et. Donec ullamcorper sem sed diam egestas tempor. Nullam ut urna vel diam interdum malesuada. Vestibulum porttitor suscipit porttitor. Integer at arcu vitae orci condimentum euismod. Morbi posuere, sapien sit amet maximus porttitor, mi turpis feugiat quam, vel pulvinar lacus dolor id turpis. Vivamus purus felis, consequat sed risus et, malesuada rhoncus velit. Pellentesque accumsan in augue et suscipit. Duis condimentum erat sed ex imperdiet euismod. Integer scelerisque massa sed felis ultricies, sed iaculis risus ultrices. In hac habitasse platea dictumst. Maecenas vitae sapien est. Sed mi ligula, laoreet at odio maximus, pulvinar scelerisque risus. Nulla consectetur blandit lectus, ac sollicitudin enim consectetur ac. Donec luctus quis dui et tempor. Aenean volutpat nisl a nisi condimentum, quis dignissim turpis facilisis. Nunc id est non ligula fringilla venenatis. Maecenas eros diam, porta eu mi nec, dignissim tempus metus. Vivamus volutpat ipsum urna, a molestie massa pharetra a. Aliquam erat volutpat.
            </Typography>
        ) : (
            <Typography variant="h6" sx={{ flexGrow: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }} align="center">
                No hay chats
            </Typography>
        );
    }

    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "column", height: "50vh" }}>
            <Box>
                <Typography variant="h5" sx={{ flexGrow: 1, p: 2 }}>
                    Chat
                </Typography>
                <Divider style={{ width: "100%" }} />
            </Box>
            <ChatContent />
        </Paper>
    );
}
