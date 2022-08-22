import * as yup from "yup";

export const validationSchemas = [
    ,
    yup.object().shape({
        clientName: yup.string().required("El nombre es requerido"),
        clientSurname: yup.string().required("El apellido es requerido"),
        dni: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
        phone: yup
            .number("El telefono debe ser un numero")
            .required("El telefono es requerido")
            .positive()
            .integer()
            .typeError("El telefono debe ser un numero"),
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
        instalattionAddress: yup
            .string("Ingrese su direccion de instalacion")
            .when("conditionalField", {
                is: true,
                then: yup
                    .string()
                    .required("La direccion de instalacion es requerida")
                    .notOneOf(
                        [yup.ref("billingAddress")],
                        "Las direcciones no deben coincidir"
                    ),
            }),
        zipCodeInstallation: yup
            .string("Ingrese su codigo postal de instalacion")
            .when("conditionalField", {
                is: true,
                then: yup
                    .string()
                    .required("El codigo postal de instalacion es requerido"),
            }),
        municipalityInstallation: yup
            .string("Ingrese su municipio de instalacion")
            .when("conditionalField", {
                is: true,
                then: yup
                    .string()
                    .required("El municipio de instalacion es requerido"),
            }),
        provinceInstallation: yup
            .string("Ingrese su provincia de instalacion")
            .when("conditionalField", {
                is: true,
                then: yup
                    .string()
                    .required("La provincia de instalacion es requerida"),
            }),
    }),
    ,
    yup.object().shape({
        demo: yup.string().required("El demo es requerido"),
    }),
    ,
];
