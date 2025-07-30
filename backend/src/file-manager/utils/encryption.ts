import { createCipheriv, createDecipheriv, pbkdf2Sync, createHmac, randomBytes } from 'crypto';
import { gzipSync, gunzipSync } from 'zlib';

const AES_BLOCK_SIZE = 16;

/**
 * Custom PBKDF2 with HMAC-SHA1 for compatibility
 */
function pbkdf2HmacSha1(password: string, salt: Buffer, iterations: number, keyLen: number): Buffer {
  const prf = (p: Buffer, s: Buffer) => createHmac('sha1', p).update(s).digest();
  let key = Buffer.alloc(0);
  let blockNum = 1;

  while (key.length < keyLen) {
    let u = prf(Buffer.from(password), Buffer.concat([salt, Buffer.from([0, 0, 0, blockNum])]));
    let t = u;

    for (let i = 1; i < iterations; i++) {
      u = prf(Buffer.from(password), u);
      for (let j = 0; j < t.length; j++) {
        t[j] ^= u[j];
      }
    }

    key = Buffer.concat([key, t]);
    blockNum += 1;
  }

  return key.slice(0, keyLen);
}

export function encryptEs3(data: Buffer, password: string, shouldGzip = false): Buffer {
  if (shouldGzip) {
    data = gzipSync(data);
  }

  const iv = randomBytes(16);
  const key = pbkdf2HmacSha1(password, iv, 100, 16);

  const cipher = createCipheriv('aes-128-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(pad(data)), cipher.final()]);

  return Buffer.concat([iv, encrypted]);
}

export function decryptEs3(encryptedData: Buffer, password: string): Buffer {
  const iv = encryptedData.slice(0, 16);
  const encrypted = encryptedData.slice(16);

  const key = pbkdf2HmacSha1(password, iv, 100, 16);
  const decipher = createDecipheriv('aes-128-cbc', key, iv);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  const unpadded = unpadLenient(decrypted);

  if (unpadded[0] === 0x1f && unpadded[1] === 0x8b) {
    return gunzipSync(unpadded);
  }

  return unpadded;
}

/**
 * PKCS#7 Padding (manual because Node doesn't do it when using raw buffers)
 */
function pad(data: Buffer): Buffer {
  const padLen = AES_BLOCK_SIZE - (data.length % AES_BLOCK_SIZE);
  const padding = Buffer.alloc(padLen, padLen);
  return Buffer.concat([data, padding]);
}

function unpad(data: Buffer): Buffer {
  const padLen = data[data.length - 1];
  return data.slice(0, data.length - padLen);
}

function unpadLenient(data: Buffer): Buffer {
  const padLen = data[data.length - 1];
  if (padLen < 1 || padLen > 16) {
    // fallback: return whole buffer, possibly malformed
    return data;
  }
  return data.slice(0, data.length - padLen);
}