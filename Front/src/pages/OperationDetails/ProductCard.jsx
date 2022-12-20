import React from "react";
import TableCard from "../../components/new/TableCard";
import TableCardRow from "../../components/new/TableCard/TableCardRow";

function ProductCard({ operation }) {
    return (
        <TableCard title="Producto">
            <TableCardRow
                label="Producto"
                value={operation.productOption.product.name} />
            <TableCardRow
                label="Opción"
                value={operation.productOption.name} />
            {operation.additionalProducts && <TableCardRow
                label="Adicionales"
                value={operation.additionalProducts.length > 0
                    ? operation.additionalProducts.reduce((prev, additional, index) => {
                        if (index == 0) {
                            prev += additional.name;
                        } else {
                            prev += ", " + additional.name;
                        }
                        return prev;
                    }, "")
                    : "-"} />}
        </TableCard>
    );
}

export default ProductCard;
