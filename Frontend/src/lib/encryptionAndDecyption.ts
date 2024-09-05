import * as crypto from 'crypto';

// Function to derive key from password
function deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

// Encrypt function
function encrypt(text: string, password: string): string {
    const iv = crypto.randomBytes(16); // Initialization vector
    const salt = crypto.randomBytes(16); // Salt for key derivation
    const key = deriveKey(password, salt); // Derive key from password and salt
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the salt, iv, and encrypted data in a single string
    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;
}

// Decrypt function
function decrypt(encryptedText: string, password: string): string {
    const parts = encryptedText.split(':');
    const salt = Buffer.from(parts[0], 'hex');
    const iv = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const key = deriveKey(password, salt); // Derive the key from password and salt
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// // Example usage
// const password = 'my-secret-password';
// const dataToEncrypt = 'Sensitive data to be encrypted';

// // Encrypt the data
// const encryptedData = encrypt(dataToEncrypt, password);
// console.log('Encrypted:', encryptedData);

// // Decrypt the data
// const decryptedData = decrypt(encryptedData, password);
// console.log('Decrypted:', decryptedData);
