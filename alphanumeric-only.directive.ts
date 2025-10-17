import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAlphanumericOnly]'
})
export class AlphanumericOnlyDirective {

  private regex: RegExp = /^[a-zA-Z0-9]*$/;

  constructor(private ngControl: NgControl) {}

  // Handle manual typing
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value;
    const filteredValue = originalValue.replace(/[^a-zA-Z0-9]/g, '');

    // If invalid chars were typed, strip them out
    if (originalValue !== filteredValue) {
      input.value = filteredValue;
      this.ngControl?.control?.setValue(filteredValue);
    }
  }

  // Block paste if it contains any invalid character
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pasteData = event.clipboardData?.getData('text') || '';

    // If pasted text contains anything except A–Z, a–z, 0–9 → block it
    if (!this.regex.test(pasteData)) {
      event.preventDefault();
    }
  }
}
