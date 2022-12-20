import React from "react";
import DividedStack from "../DividedStack";
import Card from "../Card";

function TableCard({ title, children }) {
    return (
        <Card title={title}>
            <DividedStack>{children}</DividedStack>
        </Card>

    );
}

export default TableCard;
