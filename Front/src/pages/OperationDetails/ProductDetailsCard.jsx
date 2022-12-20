import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ExpandableCard from "../../components/new/ExpandableCard";
import Stack from "@mui/material/Stack";
import ProductDetailsItem from "./ProductDetailsItem";
import { OperationDetailEditModal } from "../../components/old/form/operationDetail/OperationDetailEditModal";
import useOperationEditableProperty from "../../hooks/useOperationEditableProperty";

function ProductDetailsCard({ operation }) {
    const [steps, setSteps] = useState([]);
    const [stepsDescription, setStepsDescription] = useState("");
    const [operationDetailToEdit, setOperationDetailToEdit] = useState(null);

    const editable = useOperationEditableProperty(operation, "OPERATION_DETAILS");

    useEffect(() => {
        if (operation) {
            const result = [];
            (operation.additionalProducts || []).forEach((additional) => {
                result.push(...additional.steps);
            });
            result.push(...operation.productOption.steps);
            setSteps(result);
        }
    }, [operation]);

    useEffect(() => {
        if (steps) {
            const mobileAmount = steps.filter((step) => step.stepType === "MOBILE").length;
            const fixedAmount = steps.length - mobileAmount;

            let message = "";
            if (fixedAmount > 0) {
                message += fixedAmount + " fijo";
                if (fixedAmount > 1) {
                    message += "s";
                }
                if (mobileAmount > 0) {
                    message += " y ";
                }
            }
            if (mobileAmount > 0) {
                message += mobileAmount + " móvil";
                if (mobileAmount > 1) {
                    message += "es";
                }
            }
            setStepsDescription(message);
        }
    }, [steps]);

    return (
        <>
            <ExpandableCard title="Detalles" subtitle={stepsDescription} defaultExpanded>
                <Stack spacing={1}>
                    {
                        [...operation.operationDetails].sort((a, b) => a.id - b.id).map((operationDetail, i) => {
                            const step = steps.find((step) => {
                                return operationDetail.stepId === step.id;
                            });
                            if (step) {
                                return (<ProductDetailsItem
                                    key={i}
                                    onEdit={() => setOperationDetailToEdit(operationDetail)}
                                    editable={editable}
                                    operationDetail={operationDetail}
                                    step={step} />);
                            }
                        })
                    }
                </Stack>
            </ExpandableCard>
            <OperationDetailEditModal operationId={operation.id} operationDetailToEdit={operationDetailToEdit} closeModal={() => setOperationDetailToEdit(null)} />
        </>
    );
}

export default ProductDetailsCard;
