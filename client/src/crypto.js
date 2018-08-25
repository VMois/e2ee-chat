import { 
    convertStringToArrayBuffer, 
    arrayBufferToBase64,
    splitLines,
} from './utils';

const crypto = window.crypto;

export const generateRSAKeys = crypto.subtle.generateKey(
    {
        name: 'RSA-OAEP',
        modulusLength: 2048, // key length 1024 (not secure), 2048 (optimal) or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: 'SHA-512'},
    },
    true, // the key can be extracted from the CryptoKey object at a later stage
    ['encrypt', 'decrypt'] // purpose of key
);

export const deriveKeyFromPassword = async (password, salt) => {
    const importedPassword = await crypto.subtle.importKey(
        'raw',
        convertStringToArrayBuffer(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: convertStringToArrayBuffer(salt),
            iterations: 200000,
            hash: 'SHA-512',
        },
        importedPassword,
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['unwrapKey', 'wrapKey']
    )
}

export const exportPublicKey = (key) =>
    crypto.subtle.exportKey(
        'spki',
        key,
);

export const wrapPrivateKey = (keyToWrap, wrapKey, iv) =>
    crypto.subtle.wrapKey(
        'pkcs8',
        keyToWrap, //the key you want to wrap, must be able to fit in RSA-OAEP padding
        wrapKey, //the public key with "wrapKey" usage flag
        {   //these are the wrapping key's algorithm options
            name: 'AES-GCM',
            iv,
        }
    )

export const exportPrivateKeyInPEMFormat = (key) => {
    const keyBase64 = arrayBufferToBase64(key);
    const formatedKey = splitLines(keyBase64);
    return `-----BEGIN ENCRYPTED PRIVATE KEY-----\n${formatedKey}-----END ENCRYPTED PRIVATE KEY-----`;
}

export const exportPublicKeyInPEMFormat = (key) => {
    const keyBase64 = arrayBufferToBase64(key);
    const formatedKey = splitLines(keyBase64); 
    return `-----BEGIN PUBLIC KEY-----\n${formatedKey}-----END PUBLIC KEY-----`;
}

// from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export const sha512 = async (message) => {
    // encode as UTF-8
    const msgBuffer = convertStringToArrayBuffer(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}