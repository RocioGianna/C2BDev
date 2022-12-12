import React from "react";
import TableCard from "../../components/new/TableCard";
import OperationDetailsTableCardRow from "./OperationDetailsTableCardRow";
OperationDetailsTableCardRow;
import { isCollaborator } from "../../utils/RolesUtils";

function CollaboratorCard({ operation }) {
    return (
        <TableCard title="Colaborador">
            <OperationDetailsTableCardRow
                label="Código colaborador"
                value={operation.collaborator.userCode}
                operation={operation}
                show={!isCollaborator()} />
            <OperationDetailsTableCardRow
                label="Código Referente"
                value="-"
                operation={operation}
                show={!isCollaborator()} />
            <OperationDetailsTableCardRow
                label="Teléfono"
                value={operation.collaboratorPhone}
                operation={operation}
                inputProps={{
                    name: "phone",
                    column: "COLLABORATOR_PHONE",
                }} />
            <OperationDetailsTableCardRow
                label="Email"
                value={operation.collaboratorEmail}
                operation={operation}
                inputProps={{
                    name: "email",
                    column: "COLLABORATOR_EMAIL",
                }} />

        </TableCard>
    );
}

export default CollaboratorCard;
