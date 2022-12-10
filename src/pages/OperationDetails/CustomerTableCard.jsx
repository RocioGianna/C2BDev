import React from "react";
import TableCard from "../../components/containers/TableCard";
import TableCardSection from "../../components/containers/TableCard/TableCardSection";
import TableCardRow from "../../components/containers/TableCard/TableCardRow";
import { EditableDetailField } from "../../components/EditableDetailField";


function CustomerTableCard({ row }) {
    return (
        <TableCard title="Cliente">
            <TableCardRow
                label="Apellido"
                value={row.customer.lastName}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "lastName",
                    column: "CUSTOMER",
                }} />
            <TableCardRow
                label="Nombre"
                value={row.customer.firstName}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "firstName",
                    column: "CUSTOMER",
                }} />
            <TableCardRow
                label="DNI"
                value={row.customer.nid}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "nid",
                    column: "CUSTOMER",
                }} />
            <TableCardRow
                label="Teléfono"
                value={row.customer.phone}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "phone",
                    column: "CUSTOMER",
                    type: "tel",
                }} />
            <TableCardRow
                label="Email"
                value={row.customer.email}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "email",
                    column: "CUSTOMER",
                }} />
            <TableCardRow
                label="Cuenta bancaria"
                value={row.customer.bankAccount}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "bankAccount",
                    column: "CUSTOMER",
                }} />
            <TableCardRow
                label="A3"
                value={row.reprocess ? "Si" : "No"} />

            <TableCardSection title="Dirección de facturación">
                <TableCardRow
                    label="Dirección"
                    value={row.customer.billingAddress.address}
                    editable
                    InputComponent={EditableDetailField}
                    inputProps={{
                        name: "address",
                        column: "CUSTOMER",
                    }} />
                <TableCardRow
                    label="Municipio"
                    value={row.customer.billingAddress.municipality}
                    editable
                    InputComponent={EditableDetailField}
                    inputProps={{
                        name: "municipality",
                        column: "CUSTOMER",
                    }} />
                <TableCardRow
                    label="Provincia"
                    value={row.customer.billingAddress.province}
                    editable
                    InputComponent={EditableDetailField}
                    inputProps={{
                        name: "province",
                        column: "CUSTOMER",
                    }} />
                <TableCardRow
                    label="Código postal"
                    value={row.customer.billingAddress.zipcode}
                    editable
                    InputComponent={EditableDetailField}
                    inputProps={{
                        name: "zipCode",
                        column: "CUSTOMER",
                    }} />
            </TableCardSection>

            {row.installationAddress && (
                <TableCardSection title="Dirección de instalación">
                    <TableCardRow
                        label="Dirección"
                        value={row.installationAddress.address}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "address",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Municipio"
                        value={row.installationAddress.municipality}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "municipality",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Provincia"
                        value={row.installationAddress.province}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "province",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Código postal"
                        value={row.installationAddress.zipcode}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "zipCode",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                </TableCardSection>
            )}

            {row.shippingAddress && (
                <TableCardSection title="Dirección de envío SIMs">
                    <TableCardRow
                        label="Dirección"
                        value={row.shippingAddress.address}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "address",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Municipio"
                        value={row.shippingAddress.municipality}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "municipality",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Provincia"
                        value={row.shippingAddress.province}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "province",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                    <TableCardRow
                        label="Código postal"
                        value={row.shippingAddress.zipcode}
                        editable
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "zipCode",
                            column: "INSTALLATION_ADDRESS",
                        }} />
                </TableCardSection>
            )}
        </TableCard>
    );
}

export default CustomerTableCard;
