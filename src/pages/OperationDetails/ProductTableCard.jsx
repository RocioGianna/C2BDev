import React from "react";
import TableCard from "../../components/containers/TableCard";
import TableCardRow from "../../components/containers/TableCard/TableCardRow";

function ProductTableCard({ row }) {
    return (
        <TableCard title="Producto">
            <TableCardRow
                label="Producto"
                value={row.productOption.product.name} />
            <TableCardRow
                label="Opción"
                value={row.productOption.name} />
            {row.additionalProducts && <TableCardRow
                label="Adicionales"
                value={row.additionalProducts.length > 0
                    ? row.additionalProducts.reduce((prev, additional, index) => {
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

export default ProductTableCard;
