// Convert string to Uint8Array
function stringToUint8Array(str) {
    return new TextEncoder().encode(str);
}

// Convert Uint8Array to string
function uint8ArrayToString(uint8Array) {
    return new TextDecoder().decode(uint8Array);
}

// Derive key from a constant string (passphrase)
async function deriveKey(password) {
    const salt = stringToUint8Array("some-fixed-salt"); // Use a fixed salt for consistency
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
async function encryptData(plainText, password) {
    const key = await deriveKey(password);
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
async function decryptData(encryptedData, password) {
    const key = await deriveKey(password);
    const iv = new Uint8Array(encryptedData.iv);
    const encryptedArray = new Uint8Array(encryptedData.encrypted);

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encryptedArray
    );

    return uint8ArrayToString(new Uint8Array(decryptedBuffer));
}

// Example usage
(async () => {
    const password = "my-secret-password"; // Use a constant string as the key

    const data = "Hello, World!";
    console.log("Original Data:", data);

    const encryptedData = await encryptData(data, password);
    console.log("Encrypted Data:", encryptedData);

    const decryptedData = await decryptData(encryptedData, password);
    console.log("Decrypted Data:", decryptedData);
})();
