import React, { Children } from "react";
import Stack from "@mui/material/Stack";

function DividedStack({ children, ...props }) {
    return (
        <Stack
            {...props}
            sx={
                props.direction === "row"
                    ? {
                        "& >:not(:first-of-type)": {
                            display: "flex",
                            alignItems: "center",
                        },
                        "& >:not(:first-of-type)::before": {
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
                console.log(child);
                if (child && child.props?.show !== false) {
                    return <div key={i}>{child}</div>;
                }
            }))}
        </Stack>
    );
}

export default DividedStack;
