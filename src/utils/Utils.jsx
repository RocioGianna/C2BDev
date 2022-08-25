import ClientDataStepBundle from "../components/newOperation/ClientDataStep";
import FirstStepBundle from "../components/newOperation/FirstStep";

const StepArray = [FirstStepBundle, ClientDataStepBundle];
const isValid = (value) => {
    console.log("value: ", value);
    value.ValidationSchema && value.Label && value.ReactComponent;
};
const res = StepArray.every(isValid);
console.log("res ", res);
export default StepArray;
