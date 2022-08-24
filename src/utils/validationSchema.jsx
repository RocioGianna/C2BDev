import * as yup from "yup";
import { phoneRegex } from "../../utils/RegexUtils";

export const validationSchemas = [
    ,
    yup.object().shape({
        clientName: yup.string().required("El nombre es requerido"),
        clientSurname: yup.string().required("El apellido es requerido"),
        dni: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
        phone: yup
            .string()
            .required("El telefono es requerido")
            .matches(phoneRegex, "Numero de telefono no valido"),
        email: yup
            .string("Ingrese su correo electronico")
            .email("Ingrese un correo electronico valido")
            .required("El correo electronico es requerido"),
        bankAccount: yup
            .string("Ingrese su cuenta bancaria")
            .required("La cuenta bancaria es requerida"),
        billingAddress: yup
            .string("Ingrese su direccion de facturacion")
            .required("La direccion de facturacion es requerida"),
        zipCode: yup
            .string("Ingrese su codigo postal")
            .required("El codigo postal es requerido"),
        municipality: yup
            .string("Ingrese su municipio")
            .required("El municipio es requerido"),
        province: yup
            .string("Ingrese su provincia")
            .required("La provincia es requerida"),
    }),
    ,
    yup.object().shape({
        demo: yup.string().required("El demo es requerido"),
    }),
    ,
];
