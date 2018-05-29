export const convertStringToArrayBuffer = (str) => {
    const encoder = new TextEncoder('utf-8');
    return encoder.encode(str);
}

export const convertArrayBufferString = (arr) => {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(arr);
}