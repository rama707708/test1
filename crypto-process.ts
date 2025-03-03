
// Secret key for XOR encryption
function getSecret(): string {
    return '3c028d93-2132-4192-81c4-536e0d714def';
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

// Encrypt function (Base64 encoding)
function encryptDataSync(plainText: string): string {
    return btoa(xorEncryptDecrypt(plainText, getSecret())); // Convert to Base64
}

// Decrypt function (Base64 decoding)
function decryptDataSync(encryptedText: string): string {
    return xorEncryptDecrypt(atob(encryptedText), getSecret()); // Convert from Base64
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
