import ClientDataStepBundle from "./ClientDataStep";
import ProductStepBundle from "./ProductStep";
import PhoneStep from "./PhoneStep";

const StepArray = [ProductStepBundle, PhoneStep, ClientDataStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
