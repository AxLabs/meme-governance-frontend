const reverseHexString = (hexString: string) => hexString
  .match(/[a-fA-F0-9]{2}/g)
  ?.reverse()
  .join('');

// You almost certainly want UTF-8, which is
// now natively supported:
const stringToUTF8Bytes = (s: string) => {
    return new TextEncoder().encode(s);
}

const bytesToHex = (b: Uint8Array) => {
    return Array.from(
        b,
        byte => byte.toString(16).padStart(2, "0")
    ).join("");
}

const hexToBytes= (s: string) => {
    const bytes = new Uint8Array(s.length / 2);
    for (let i = 0; i !== bytes.length; i++) {
        bytes[i] = parseInt(s.substr(i * 2, 2), 16);
    }
    return bytes;
}

export { reverseHexString, stringToUTF8Bytes, bytesToHex, hexToBytes };
