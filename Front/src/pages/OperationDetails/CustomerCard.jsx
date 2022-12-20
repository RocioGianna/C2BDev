import React from "react";
import TableCard from "../../components/new/TableCard";
import TableCardSection from "../../components/new/TableCard/TableCardSection";
import { isCollaborator } from "../../utils/RolesUtils";
import OperationDetailsTableCardRow from "./OperationDetailsTableCardRow";

function CustomerCard({ operation }) {
    return (
        <TableCard title="Cliente">
            <OperationDetailsTableCardRow
                label="Apellido"
                value={operation.customer.lastName}
                operation={operation}
                inputProps={{
                    name: "lastName",
                    column: "CUSTOMER",
                }} />
            <OperationDetailsTableCardRow
                label="Nombre"
                value={operation.customer.firstName}
                operation={operation}
                inputProps={{
                    name: "firstName",
                    column: "CUSTOMER",
                }} />
            <OperationDetailsTableCardRow
                label="DNI"
                value={operation.customer.nid}
                operation={operation}
                inputProps={{
                    name: "nid",
                    column: "CUSTOMER",
                }} />
            <OperationDetailsTableCardRow
                label="Teléfono"
                value={operation.customer.phone}
                operation={operation}
                inputProps={{
                    name: "phone",
                    column: "CUSTOMER",
                    type: "tel",
                }} />
            <OperationDetailsTableCardRow
                label="Email"
                value={operation.customer.email}
                operation={operation}
                inputProps={{
                    name: "email",
                    column: "CUSTOMER",
                }} />
            <OperationDetailsTableCardRow
                label="IBAN"
                value={operation.customer.bankAccount}
                operation={operation}
                inputProps={{
                    name: "bankAccount",
                    column: "CUSTOMER",
                }} />
            <OperationDetailsTableCardRow
                label="A3"
                show={!isCollaborator()}
                value={operation.reprocess ? "Si" : "No"} />

            <TableCardSection title="Dirección de facturación">
                <OperationDetailsTableCardRow
                    label="Dirección"
                    value={operation.customer.billingAddress.address}
                    operation={operation}
                    inputProps={{
                        name: "address",
                        column: "CUSTOMER",
                    }} />
                <OperationDetailsTableCardRow
                    label="Municipio"
                    value={operation.customer.billingAddress.municipality}
                    operation={operation}
                    inputProps={{
                        name: "municipality",
                        column: "CUSTOMER",
                    }} />
                <OperationDetailsTableCardRow
                    label="Provincia"
                    value={operation.customer.billingAddress.province}
                    operation={operation}
                    inputProps={{
                        name: "province",
                        column: "CUSTOMER",
                    }} />
                <OperationDetailsTableCardRow
                    label="Código postal"
                    value={operation.customer.billingAddress.zipcode}
                    operation={operation}
                    inputProps={{
                        name: "zipCode",
                        column: "CUSTOMER",
                    }} />
            </TableCardSection>

            {operation.installationAddress && (
                <TableCardSection title="Dirección de instalación">
                    <OperationDetailsTableCardRow
                        label="Dirección"
                        value={operation.installationAddress.address}
                        operation={operation}
                        inputProps={{
                            name: "address",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Municipio"
                        value={operation.installationAddress.municipality}
                        operation={operation}
                        inputProps={{
                            name: "municipality",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Provincia"
                        value={operation.installationAddress.province}
                        operation={operation}
                        inputProps={{
                            name: "province",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Código postal"
                        value={operation.installationAddress.zipcode}
                        operation={operation}
                        inputProps={{
                            name: "zipCode",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                </TableCardSection>
            )}

            {operation.shippingAddress && (
                <TableCardSection title="Dirección de envío SIMs">
                    <OperationDetailsTableCardRow
                        label="Dirección"
                        value={operation.shippingAddress.address}
                        operation={operation}
                        inputProps={{
                            name: "address",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Municipio"
                        value={operation.shippingAddress.municipality}
                        operation={operation}
                        inputProps={{
                            name: "municipality",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Provincia"
                        value={operation.shippingAddress.province}
                        operation={operation}
                        inputProps={{
                            name: "province",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <OperationDetailsTableCardRow
                        label="Código postal"
                        value={operation.shippingAddress.zipcode}
                        operation={operation}
                        inputProps={{
                            name: "zipCode",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                </TableCardSection>
            )}
        </TableCard>
    );
}

export default CustomerCard;
