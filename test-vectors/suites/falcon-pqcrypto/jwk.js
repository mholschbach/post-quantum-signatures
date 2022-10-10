const base64url = require('base64url');
const falcon = require('falcon-crypto');

const generate  = async ()=>{
  const { publicKey, privateKey } = await falcon.keyPair()
  return { publicKey, privateKey }
}

const importJwk = (jwk)=>{
  if (jwk.d){
    return Uint8Array.from(Buffer.from(jwk.d, 'base64')) 
  } else {
    return Uint8Array.from(Buffer.from(jwk.x, 'base64'))
  }
}

const exportPublicKeyJwk = ({ publicKey })=>{
  const publicKeyJwk = {
    kty: 'NTRU', 
    alg: 'FALCON512', 
    x: base64url.encode(publicKey) 
  }
  return publicKeyJwk;
}

const exportPrivateKeyJwk = ({ publicKey, privateKey })=>{
  const publicKeyJwk = exportPublicKeyJwk({publicKey});
  const privateKeyJwk = {
    ...publicKeyJwk,
    d: base64url.encode(privateKey) 
  }
  return privateKeyJwk;
}

const exportKeyPairJwk = ({ publicKey, privateKey })=>{
  const publicKeyJwk = exportPublicKeyJwk({ publicKey })
  const privateKeyJwk = exportPrivateKeyJwk({ publicKey, privateKey })
  return {
    publicKeyJwk,
    privateKeyJwk
  }
}


module.exports = { generate, importJwk, exportPublicKeyJwk, exportPrivateKeyJwk, exportKeyPairJwk }