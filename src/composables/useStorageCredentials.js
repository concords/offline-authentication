import { reactive, watch } from 'vue';

const storageCredentials = reactive({
  key: null,
  jwk: null,
});

watch(storageCredentials, ({ key, jwk }) => {
  localStorage.setItem('key', JSON.stringify(key));
  localStorage.setItem('jwk', JSON.stringify(jwk));
})

function setStorageCredentials(key, jwk) {
  storageCredentials.key = key;
  storageCredentials.jwk = jwk;
}

function getStorageCredentials() {
  storageCredentials.key = JSON.parse(localStorage.getItem('key'));
  storageCredentials.jwk = JSON.parse(localStorage.getItem('jwk'));
}

export default () => {
  return {
    getStorageCredentials,
    setStorageCredentials,
    storageCredentials
  };
}
