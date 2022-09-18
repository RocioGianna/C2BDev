import ClientDataStepBundle from "./ClientDataStep";
import FirstStepBundle from "./FirstStep";
import ProductStepBundle from "./ProductStep";
import AdditionalStep from "./AdditionalStep";

const StepArray = [ProductStepBundle, ClientDataStepBundle, FirstStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
