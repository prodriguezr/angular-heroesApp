import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador que verifica si el valor de un campo es "A" o "B".
 * @returns ValidatorFn
 */
export function publisherValidator(enumType: object): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const validValues = Object.values(enumType);

    if (validValues.includes(value)) {
      return null; // El valor es válido
    }
    return { publisherValidator: true }; // El valor es inválido
  };
}
