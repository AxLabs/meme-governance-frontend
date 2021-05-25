const reverseHexString = (hexString: string) => hexString
  .match(/[a-fA-F0-9]{2}/g)
  ?.reverse()
  .join('');

export { reverseHexString };
