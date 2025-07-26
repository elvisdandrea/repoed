import CryptoJS from 'crypto-js';
import pako from 'pako';

// encryptedData: Uint8Array or ArrayBuffer of the file content
// password: string

export function decryptEs3(encryptedBytes, password) {
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

function u8ToWordArray(u8Array) {
  const words = [];
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