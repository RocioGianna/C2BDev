import React from "react";
import TitleBarValue from "../../components/new/TitleBar/TitleBarValue";
import { EditableDetailField } from "../../components/old/EditableDetailField";

import useOperationEditableProperty from "../../hooks/useOperationEditableProperty";

function OperationDetailsTitleBarValue({ label, value, show = true, operation, inputProps }) {

    const editable = useOperationEditableProperty(operation, inputProps?.column);

    return (
        <TitleBarValue
            label={label}
            value={value}
            show={show}
            editable={editable}
            InputComponent={EditableDetailField}
            inputProps={inputProps} />
    );
}

export default OperationDetailsTitleBarValue;
