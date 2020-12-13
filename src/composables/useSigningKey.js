import { ref } from 'vue';
import { login } from '../platform/authentication';

const signingKey = ref(null);

async function getSigningKey(key, jwk) {
  if (key && jwk) {
    signingKey.value = await login(jwk, key);
  } else {
    signingKey.value = false;
  }
}

export default () => ({
  signingKey,
  getSigningKey
});
