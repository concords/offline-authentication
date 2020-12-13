export const create = async () => {
  const { publicKey, privateKey } = await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-384" },
    true,
    ["sign", "verify"]
  );

  const encodedPublicKey = await crypto.subtle.exportKey('jwk', publicKey);
  const encodedPrivateKey = await crypto.subtle.exportKey('jwk', privateKey);

  const jwk = encodedPrivateKey.d;

  return {
    jwk,
    key: encodedPublicKey,
  };
}

export const login = (jwk, key) => {
  if (!jwk) {
      return;
  }
  delete key.key_ops;

  return crypto.subtle.importKey(
    'jwk',
    { ...key, d: jwk },
    {
        name: 'ECDSA',
        namedCurve: "P-384",
    },
    true,
    ["sign"],
  );
}
