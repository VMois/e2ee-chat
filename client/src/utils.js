export const convertStringToArrayBuffer = (str) => {
    const encoder = new TextEncoder('utf-8');
    return encoder.encode(str);
}

export const convertArrayBufferString = (arr) => {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(arr);
}

// https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
export const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
export const base64ToArrayBuffer = (base64) => {
    const binary_string =  window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const splitLines = (str) => {
    let finalString = '';
    for (let i = 0; i < str.length; i++) {
        finalString += `${str.substring(0, 64)}\n`;
        str = str.substring(64);
    }
    finalString += str;
    return finalString;
}