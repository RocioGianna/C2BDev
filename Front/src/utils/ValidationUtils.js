import { getCountryCallingCode, getCountries } from "libphonenumber-js";

export const countryCodes = [
    ...new Set(getCountries().map((c) => "+" + getCountryCallingCode(c))),
];
