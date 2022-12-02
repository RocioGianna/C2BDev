import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import { countryCodes } from "../utils/ValidationUtils";

export default {
    userCode: yup.string().required("El codigo de usuario es requerido"),
    name: yup.string().required("El nombre es requerido"),
    lastName: yup.string().required("El apellido es requerido"),
    nid: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
    phonePrefix: yup
        .string()
        .required("El prefijo es requerido")
        .test("valid-prefix", "Prefijo no valido", (value) => {
            return countryCodes.includes(value);
        }),
    phoneNumber: yup
        .string()
        .required("El numero es requerido")
        .test("is-valid-phone", "El formato del telefono no es valido", function (value) {
            return isValidPhoneNumber(this.options.parent.phonePrefix + " " + value);
        }),
    email: yup.string().email("Ingrese un correo electronico valido").required("El correo electronico es requerido"),
    bankAccount: yup.string().required("La cuenta bancaria es requerida"),
    address: yup.string().required("La direccion es requerida"),
    zipCode: yup.string().required("El codigo postal es requerido"),
    municipality: yup.string().required("El municipio es requerido"),
    province: yup.string().required("La provincia es requerida"),
    offeredPrice: yup.string().required("El precio es requerido"),
    selectOptional: yup.string(),
    select: yup.string().required("El campo es requerido"),
};
