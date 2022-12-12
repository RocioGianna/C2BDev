import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


function useOperationEditableProperty(operation, column) {
    const [editable, setEditable] = useState(false);
    const editPermissions = useSelector((state) => state.operations.permissions);

    useEffect(() => {
        if (column) {
            const editPermission = editPermissions[operation.status];
            setEditable(editPermission.includes(column));
        }
    }, [operation]);

    return editable;
}

export default useOperationEditableProperty;
