import React from "react";
import TableCard from "../../components/containers/TableCard";
import TableCardRow from "../../components/containers/TableCard/TableCardRow";
import { EditableDetailField } from "../../components/EditableDetailField";

function CollaboratorTableCard({ row }) {
    return (
        <TableCard title="Colaborador">
            <TableCardRow
                label="Código colaborador"
                value={row.collaborator.userCode} />
            <TableCardRow
                label="Código colaborador"
                value="-" />
            <TableCardRow
                label="Teléfono"
                value={row.collaboratorPhone}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "phone",
                    column: "COLLABORATOR_PHONE",
                }} />
            <TableCardRow
                label="Email"
                value={row.collaboratorEmail}
                editable
                InputComponent={EditableDetailField}
                inputProps={{
                    name: "email",
                    column: "COLLABORATOR_EMAIL",
                }} />

        </TableCard>
    );
}

export default CollaboratorTableCard;
