/**
 * Interfaccia che definisce le regole di validazione
 */
export interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
}

/**
 * funzione di validazione
 * @param validatableInput input da validare
 */
export function validate(validatableInput: Validatable) {
    let isValid: boolean = true;

    if (validatableInput.required) {
        isValid &&= validatableInput.value.toString().trim().length !== 0;
    }
    if (typeof validatableInput.value === "string" && validatableInput.maxLength != null) {
        isValid &&= validatableInput.value.toString().trim().length <= validatableInput.maxLength;
    }
    if (typeof validatableInput.value === "string" && validatableInput.minLength != null) {
        isValid &&= validatableInput.value.toString().trim().length >= validatableInput.minLength;
    }
    if (typeof validatableInput.value === "number" && validatableInput.min != null) {
        isValid &&= validatableInput.value >= validatableInput.min;
    }
    if (typeof validatableInput.value === "number" && validatableInput.max != null) {
        isValid &&= validatableInput.value <= validatableInput.max;
    }

    return isValid;
}
