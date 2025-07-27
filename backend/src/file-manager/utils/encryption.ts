import * as CryptoJS from 'crypto-js';
import * as pako from 'pako';

// encryptedData: Uint8Array or ArrayBuffer of the file content
// password: string

export function decryptEs3(encryptedBytes: Uint8Array, password) {
  // encryptedBytes is a Uint8Array
  const ivBytes = encryptedBytes.slice(0, 16);
  const cipherBytes = encryptedBytes.slice(16);

  const ivWordArray = u8ToWordArray(ivBytes);
  const cipherWordArray = u8ToWordArray(cipherBytes);

  // Derive key
  const key = CryptoJS.PBKDF2(password, ivWordArray, {
    keySize: 128 / 32,
    iterations: 100,
    hasher: CryptoJS.algo.SHA1,
  });

  // Decrypt
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: cipherWordArray },
    key,
    { iv: ivWordArray, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  const decryptedBytes = wordArrayToUint8Array(decrypted);

  if (decryptedBytes[0] === 0x1f && decryptedBytes[1] === 0x8b) {
    const decompressed = pako.ungzip(decryptedBytes);
    return new TextDecoder().decode(decompressed);
  } else {
    return new TextDecoder().decode(decryptedBytes);
  }
}

export function encryptEs3(plainText: string, password: string): Uint8Array {
  // 1. Gzip-compress the data
  const compressed = pako.gzip(plainText); // Uint8Array

  // 2. Generate a random IV (16 bytes)
  const ivBytes = CryptoJS.lib.WordArray.random(16);
  const ivUint8 = wordArrayToUint8Array(ivBytes);

  // 3. Derive the key with PBKDF2 (must match decrypt)
  const key = CryptoJS.PBKDF2(password, ivBytes, {
    keySize: 128 / 32, // 128-bit key
    iterations: 100,
    hasher: CryptoJS.algo.SHA1,
  });

  // 4. Encrypt using AES-CBC with that IV
  const plaintextWA = u8ToWordArray(compressed);
  const encrypted = CryptoJS.AES.encrypt(plaintextWA, key, {
    iv: ivBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 5. Combine IV + ciphertext into a single Uint8Array
  const cipherUint8 = wordArrayToUint8Array(encrypted.ciphertext);
  const result = new Uint8Array(ivUint8.length + cipherUint8.length);
  result.set(ivUint8, 0);
  result.set(cipherUint8, ivUint8.length);

  return result;
}

// Helper: convert CryptoJS WordArray to Uint8Array
function wordArrayToUint8Array(wordArray) {
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;

  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return u8;
}

function u8ToWordArray(u8Array: Uint8Array) {
  const words: number[] = [];
  for (let i = 0; i < u8Array.length; i += 4) {
    words.push(
      (u8Array[i] << 24) |
      (u8Array[i + 1] << 16) |
      (u8Array[i + 2] << 8) |
      (u8Array[i + 3])
    );
  }
  return CryptoJS.lib.WordArray.create(words, u8Array.length);
}