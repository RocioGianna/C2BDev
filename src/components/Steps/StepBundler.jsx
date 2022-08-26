import ClientDataStepBundle from "./ClientDataStep";
import FirstStepBundle from "./FirstStep";

const StepArray = [FirstStepBundle, ClientDataStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
