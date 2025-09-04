// Secret key for XOR encryption
function getSecret(): string {
    return '3c028d93-2132-4192-81c4-536e0d714def';
}

// Convert string to hexadecimal representation
function stringToHex(str: string): string {
    return Array.from(str)
        .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
}

// Convert hexadecimal representation back to string
function hexToString(hex: string): string {
    return hex.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join("") || "";
}

// XOR Encryption & Decryption
function xorEncryptDecrypt(data: string, key: string): string {
    let keyIndex = 0;
    let output = "";

    for (let i = 0; i < data.length; i++) {
        output += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(keyIndex));
        keyIndex = (keyIndex + 1) % key.length;
    }

    return output;
}

// Escape JSON string to prevent control character issues
function escapeJsonString(str: string): string {
    return str.replace(/[\u007F-\uFFFF]/g, (char) =>
        `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
    );
}

// Unescape JSON string before parsing
function unescapeJsonString(str: string): string {
    return str.replace(/\\u([\dA-Fa-f]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
    );
}

// Encrypt function (Hex encoding)
function encryptDataSync(plainText: string): string {
    return stringToHex(xorEncryptDecrypt(escapeJsonString(plainText), getSecret()));
}

// Decrypt function (Hex decoding)
function decryptDataSync(encryptedText: string): string {
    return unescapeJsonString(xorEncryptDecrypt(hexToString(encryptedText), getSecret()));
}

// 🚀 Synchronous SessionStorage Helper Class
export class SessionStorageHelper {
    static setItem(key: string, value: any): void {
        const jsonData = JSON.stringify(value);
        const encryptedData = encryptDataSync(jsonData);
        sessionStorage.setItem(key, encryptedData);
    }

    static getItem(key: string): any {
        const encryptedData = sessionStorage.getItem(key);
        if (!encryptedData) return null;

        try {
            return JSON.parse(decryptDataSync(encryptedData));
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    }

    static removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    static clear(): void {
        sessionStorage.clear();
    }
}


-----------------------------------
ngOnInit(): void {
  ($('.datepicker') as any).datepicker({
    dateFormat: 'mm/dd/yy',
    showButtonPanel: true,       // Show the button panel
    closeText: 'Close',          // Text for the close button
    currentText: 'Today',        // Text for the "Today" button

    // When a date is selected
    onSelect: (dateText: string, inst: any) => {
      const inputId = inst.input[0].id;
      if (inputId === 'beginDate') {
        this.beginDate = dateText;
      } else if (inputId === 'endDate') {
        this.endDate = dateText;
      }
    },

    // Before showing the datepicker → override Today button
    beforeShow: (input: any, inst: any) => {
      setTimeout(() => {
        // Find the "Today" button
        const todayButton = $(inst.dpDiv).find('.ui-datepicker-current');

        // Override its click behavior
        todayButton.off('click').on('click', () => {
          const today = new Date();
          const formattedToday = $.datepicker.formatDate('mm/dd/yy', today);

          // Update input value
          $(input).val(formattedToday);

          // Update Angular variables
          if (input.id === 'beginDate') {
            this.beginDate = formattedToday;
          } else if (input.id === 'endDate') {
            this.endDate = formattedToday;
          }

          // Actually set the date in the datepicker + close it
          $(input).datepicker('setDate', today).datepicker('hide');
        });
      }, 0);
    }
  });
}


----------------

    ngOnInit(): void {
  const self = this;

  ($('.datepicker') as any).datepicker({
    dateFormat: 'mm/dd/yy',
    showButtonPanel: true,
    closeText: 'Close',
    currentText: 'Today',

    onSelect: (dateText: string, inst: any) => {
      this.ngZone.run(() => {
        const inputId = inst.input[0].id;
        if (inputId === 'beginDate') {
          this.beginDate = dateText;
        } else if (inputId === 'endDate') {
          this.endDate = dateText;
        }
      });
    },

    beforeShow: (input: any, inst: any) => {
      setTimeout(() => {
        const todayButton = $(inst.dpDiv).find('.ui-datepicker-current');

        todayButton.off('click').on('click', () => {
          const today = new Date();
          const formattedToday = $.datepicker.formatDate('mm/dd/yy', today);

          this.ngZone.run(() => {
            $(input).val(formattedToday);

            if (input.id === 'beginDate') {
              this.beginDate = formattedToday;
            } else if (input.id === 'endDate') {
              this.endDate = formattedToday;
            }
          });

          $(input).datepicker('setDate', today).datepicker('hide');
        });
      }, 0);
    }
  });

  // 👇 Force show datepicker again if input is empty and re-focused
  $('.datepicker').on('focus', function () {
    if (!$(this).val()) {
      $(this).datepicker('show');
    }
  });
}
----
    $('.datepicker').on('change', function () {
  if (!$(this).val()) {
    $(this).datepicker('setDate', null);
  }
});

    
