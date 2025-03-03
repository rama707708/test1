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

// Encrypt function (Hex encoding)
function encryptDataSync(plainText: string): string {
    return stringToHex(xorEncryptDecrypt(plainText, getSecret()));
}

// Decrypt function (Hex decoding)
function decryptDataSync(encryptedText: string): string {
    return xorEncryptDecrypt(hexToString(encryptedText), getSecret());
}

// 🚀 Synchronous SessionStorage Helper Class
export class SessionStorageHelper {
    static setItem(key: string, value: any): void {
        const encryptedData = encryptDataSync(JSON.stringify(value));
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
