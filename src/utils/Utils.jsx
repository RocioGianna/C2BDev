import ClientDataStepBundle from "../components/newOperation/ClientDataStep";
import FirstStepBundle from "../components/newOperation/FirstStep";

const StepArray = [FirstStepBundle, ClientDataStepBundle];
StepArray.forEach((value) => {
    const isStepValid =
        value.ValidationSchema && value.Label && value.ReactComponent;
    if (!isStepValid) throw "Invalid Step";
});

export default StepArray;
