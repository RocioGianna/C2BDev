import ClientDataStepBundle from "./ClientDataStep";
import AdditionalStepBundle from "./AdditionalStep";
import DocumentationStepBundle from "./DocumentationStep";

const StepArray = [ClientDataStepBundle, DocumentationStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
