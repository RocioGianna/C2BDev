import ProductStepBundle from "../components/steps/ProductStep";
import ClientDataStepBundle from "../components/steps/ClientDataStep";
import DocumentationStep from "../components/steps/DocumentationStep";
import PhoneStep from "../components/steps/PhoneStep";
import AdminStep from "../components/steps/AdminStep";

export const steps = {
    ADMIN_STEP: AdminStep,
    PRODUCT_STEP: ProductStepBundle,
    CLIENT_STEP: ClientDataStepBundle,
    DOCUMENTATION_STEP: DocumentationStep,
    PHONE_STEP: PhoneStep,
};
