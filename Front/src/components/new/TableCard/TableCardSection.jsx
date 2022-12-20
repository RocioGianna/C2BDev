import React from "react";
import Typography from "@mui/material/Typography";
import DividedStack from "../DividedStack";
import Stack from "@mui/material/Stack";

function TableCardSection({ title, children }) {
    return (
        <Stack>
            <Typography sx={{ px: 1, pt: 2, pb: 0.25, fontWeight: 500 }} variant="subtitle1">{title}</Typography>
            <DividedStack>{children}</DividedStack>
        </Stack>
    );
}

export default TableCardSection;
