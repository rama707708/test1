// Constant - Password to encrypt and decrypt
function getPassword(): string {
    return '3c028d93-2132-4192-81c4-536e0d714def';
}

// Constant - Salt to encrypt and decrypt
function getSaltKey(): string {
    return '69ae5b7b-937e-41f5-95f6-9c68469f5da8';
}

// Convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
}

// Convert Uint8Array to string
function uint8ArrayToString(uint8Array: Uint8Array): string {
    return new TextDecoder().decode(uint8Array);
}

// Derive key from a constant string (passphrase)
async function deriveKey(password: string): Promise<CryptoKey> {
    const salt = stringToUint8Array(getSaltKey()); // Use a fixed salt for consistency
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        stringToUint8Array(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Encrypt data
export async function encryptData(plainText: string): Promise<{ iv: number[]; encrypted: number[] }> {
    const key = await deriveKey(getPassword());
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
    const encodedText = stringToUint8Array(plainText);

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encodedText
    );

    return {
        iv: Array.from(iv), // Convert Uint8Array to normal array for storage
        encrypted: Array.from(new Uint8Array(encryptedBuffer)) // Convert to array for easy storage
    };
}

// Decrypt data
export async function decryptData(encryptedData: { iv: number[]; encrypted: number[] }): Promise<string> {
    const key = await deriveKey(getPassword());
    const iv = new Uint8Array(encryptedData.iv);
    const encryptedArray = new Uint8Array(encryptedData.encrypted);

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encryptedArray
    );

    return uint8ArrayToString(new Uint8Array(decryptedBuffer));
}

// SessionStorage Helper Class
export class SessionStorageHelper {
    static async setItem(key: string, value: any): Promise<void> {
        const encryptedData = await encryptData(JSON.stringify(value));
        sessionStorage.setItem(key, JSON.stringify(encryptedData));
    }

    static async getItem(key: string): Promise<any> {
        const encryptedData = sessionStorage.getItem(key);
        if (!encryptedData) return null;

        try {
            return JSON.parse(await decryptData(JSON.parse(encryptedData)));
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
