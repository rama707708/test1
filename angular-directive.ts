import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercaseNoSpace]'
})
export class UppercaseNoSpaceDirective {

  // Handle keyboard input
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const keyCode = event.keyCode || event.which;

    // Allow control keys
    const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (controlKeys.includes(key)) {
      return; // allow navigation keys
    }

    // Allow only A-Z, a-z, 0-9
    const isLetterOrNumber =
      (keyCode >= 65 && keyCode <= 90) || // A–Z
      (keyCode >= 97 && keyCode <= 122) || // a–z
      (keyCode >= 48 && keyCode <= 57); // 0–9

    if (!isLetterOrNumber) {
      event.preventDefault();
      return;
    }

    // Convert lowercase to uppercase
    if (keyCode >= 97 && keyCode <= 122) {
      const target = event.target as HTMLInputElement;
      const uppercaseChar = key.toUpperCase();
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;

      const newValue =
        target.value.substring(0, start) + uppercaseChar + target.value.substring(end);

      target.value = newValue;
      target.setSelectionRange(start + 1, start + 1);

      event.preventDefault();
    }
  }

  // Handle pasted text
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');

    // Keep only letters/numbers, convert to uppercase
    const cleanedText = pastedText.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    const target = event.target as HTMLInputElement;
    const start = target.selectionStart || 0;
    const end = target.selectionEnd || 0;

    target.value =
      target.value.substring(0, start) + cleanedText + target.value.substring(end);

    target.setSelectionRange(start + cleanedText.length, start + cleanedText.length);

    event.preventDefault(); // stop default paste
  }
}
