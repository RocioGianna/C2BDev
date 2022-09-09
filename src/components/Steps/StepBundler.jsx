import ClientDataStepBundle from "./ClientDataStep";
import FirstStepBundle from "./FirstStep";
import AdditionalStep from "./AdditionalStep";

const StepArray = [FirstStepBundle, AdditionalStep, ClientDataStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
