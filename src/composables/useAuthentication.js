import { watch, ref } from 'vue';
import useStorageCredentials from './useStorageCredentials';
import useSigningKey from './useSigningKey';
import { create } from '../platform/authentication';

const { storageCredentials, setStorageCredentials, getStorageCredentials } = useStorageCredentials();
const { signingKey, getSigningKey } = useSigningKey();

const isAuthenticated = ref(false);

watch(storageCredentials, ({ key, jwk }) => getSigningKey(key, jwk));
watch(signingKey, (newSigningKey = {}) => {
  isAuthenticated.value = newSigningKey.type === 'private';
});

const login = async (key, jwk) => setStorageCredentials(key, jwk);
const logout = async () => setStorageCredentials(storageCredentials.key, null);

const createUser = async () => {
  const { key, jwk } = await create();
  setStorageCredentials(key, jwk);
}

export default () => {
  return {
    login,
    logout,
    create: createUser,
    sessionLogin: getStorageCredentials,

    storageCredentials,
    isAuthenticated,
    signingKey
  }
}
