import React, { Children } from "react";
import Stack from "@mui/material/Stack";

function DividedStack({ children, ...props }) {
    return (
        <Stack
            {...props}
            sx={
                props.direction === "row"
                    ? {
                        "& >:not(:first-child)": {
                            display: "flex",
                            alignItems: "center",
                        },
                        "& >:not(:first-child)::before": {
                            content: '""',
                            height: "32px",
                            width: "1px",
                            marginRight: "16px",
                            background: (theme) => theme.palette.divider,
                        },
                    }
                    : {
                        "& >:not(:last-child)": {
                            display: "flex",
                            flexDirection: "column",
                        },
                        "& >:not(:last-child)::after": {
                            content: '""',
                            width: "100%",
                            height: "1px",
                            background: (theme) => theme.palette.divider,
                        },
                    }
            }>
            {Children.map(children, ((child, i) => {
                if (child) {
                    return <div key={i}>{child}</div>;
                }
            }))}
        </Stack>
    );
}

export default DividedStack;
