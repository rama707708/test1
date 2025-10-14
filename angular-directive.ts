import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercaseNoSpace]'
})
export class UppercaseNoSpaceDirective {

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const { key, target } = event;
    const input = target as HTMLInputElement;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (allowedKeys.includes(key)) return;

    if (!/^[a-zA-Z0-9]$/.test(key)) return event.preventDefault(); // block invalid
    if (/[a-z]/.test(key)) { // lowercase → uppercase
      const pos = input.selectionStart || 0;
      input.value = input.value.slice(0, pos) + key.toUpperCase() + input.value.slice(input.selectionEnd || pos);
      input.setSelectionRange(pos + 1, pos + 1);
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    const input = event.target as HTMLInputElement;
    const text = (event.clipboardData?.getData('text') || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const start = input.selectionStart || 0;
    input.value = input.value.slice(0, start) + text + input.value.slice(input.selectionEnd || start);
    input.setSelectionRange(start + text.length, start + text.length);
    event.preventDefault();
  }
}
