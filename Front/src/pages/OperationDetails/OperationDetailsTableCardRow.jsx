import React from "react";
import TableCardRow from "../../components/new/TableCard/TableCardRow";
import { EditableDetailField } from "../../components/old/EditableDetailField";

import useOperationEditableProperty from "../../hooks/useOperationEditableProperty";

function OperationDetailsTableCardRow({ label, value, show = true, operation, inputProps }) {

    const editable = useOperationEditableProperty(operation, inputProps?.column);

    return (
        <TableCardRow
            label={label}
            value={value}
            show={show}
            editable={editable}
            InputComponent={EditableDetailField}
            inputProps={inputProps} />
    );
}

export default OperationDetailsTableCardRow;
