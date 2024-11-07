function stringToArrayBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str).buffer;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
    .buffer;
}

async function deriveKey(
  password: string,
  salt: ArrayBuffer,
): Promise<CryptoKey> {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    stringToArrayBuffer(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encrypt(text: string, password?: string): Promise<string> {
  if (!password) {
    return text;
  }

  const iv = window.crypto.getRandomValues(new Uint8Array(16)); // Initialization vector
  const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Salt for key derivation
  const key = await deriveKey(password, salt.buffer); // Derive key from password and salt

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    stringToArrayBuffer(text),
  );

  // Return salt, iv, and encrypted data as hex strings
  return `${arrayBufferToHex(salt)}:${arrayBufferToHex(iv)}:${arrayBufferToHex(encrypted)}`;
}

async function decrypt(
  encryptedText: string,
  password: string,
): Promise<string | null> {
  try {
    const parts = encryptedText.split(":");
    const salt = hexToArrayBuffer(parts[0]);
    const iv = hexToArrayBuffer(parts[1]);
    const encryptedData = hexToArrayBuffer(parts[2]);

    const key = await deriveKey(password, salt); // Derive the key from password and salt

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: new Uint8Array(iv) },
      key,
      encryptedData,
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

export { encrypt, decrypt };

// Example usage
// (async () => {
//   const password = "my-secret-password";
//   const dataToEncrypt = "Sensitive data to be encrypted";
//
//   // Encrypt the data
//   const encryptedData = await encrypt(dataToEncrypt, password);
//   console.log("Encrypted:", encryptedData);
//
//   // Decrypt the data
//   const decryptedData = await decrypt(encryptedData, password);
//   console.log("Decrypted:", decryptedData);
// })();

//*========================================================================================================

// import * as crypto from "crypto";
//
// // Function to derive key from password
// function deriveKey(password: string, salt: Buffer): Buffer {
//   return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
// }
//
// // Encrypt function
// function encrypt(text: string, password: string): string {
//   const iv = crypto.randomBytes(16); // Initialization vector
//   const salt = crypto.randomBytes(16); // Salt for key derivation
//   const key = deriveKey(password, salt); // Derive key from password and salt
//   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");
//
//   // Return the salt, iv, and encrypted data in a single string
//   return `${salt.toString("hex")}:${iv.toString("hex")}:${encrypted}`;
// }
//
// // Decrypt function
// function decrypt(encryptedText: string, password: string): string {
//   const parts = encryptedText.split(":");
//   const salt = Buffer.from(parts[0], "hex");
//   const iv = Buffer.from(parts[1], "hex");
//   const encrypted = parts[2];
//
//   const key = deriveKey(password, salt); // Derive the key from password and salt
//   const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
//
//   let decrypted = decipher.update(encrypted, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//
//   return decrypted;
// }
//
//
// export { encrypt, decrypt };
// // // Example usage
// // const password = 'my-secret-password';
// // const dataToEncrypt = 'Sensitive data to be encrypted';
//
// // // Encrypt the data
// // const encryptedData = encrypt(dataToEncrypt, password);
// // console.log('Encrypted:', encryptedData);
//
// // // Decrypt the data
// // const decryptedData = decrypt(encryptedData, password);
// // console.log('Decrypted:', decryptedData);
