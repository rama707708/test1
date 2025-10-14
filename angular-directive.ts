import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercaseNoSpace]'
})
export class UppercaseNoSpaceDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;

    // Allow A-Z (65–90), a-z (97–122), 0–9 (48–57)
    const isValidChar =
      (keyCode >= 65 && keyCode <= 90) || // A-Z
      (keyCode >= 97 && keyCode <= 122) || // a-z
      (keyCode >= 48 && keyCode <= 57); // 0-9

    if (!isValidChar) {
      event.preventDefault(); // block invalid characters
      return;
    }

    // If lowercase a-z → convert to uppercase
    if (keyCode >= 97 && keyCode <= 122) {
      const uppercaseChar = String.fromCharCode(keyCode - 32);
      const target = event.target as HTMLInputElement;

      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;

      // Insert uppercase char manually
      const newValue =
        target.value.substring(0, start) + uppercaseChar + target.value.substring(end);

      target.value = newValue;

      // Move cursor to after inserted character
      target.setSelectionRange(start + 1, start + 1);

      event.preventDefault();
    }
  }
}
