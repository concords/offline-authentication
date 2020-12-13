<template>
  <slot/>

  <slot name="logged-in" v-if="isAuthenticated"/>

  <div v-else>
    <slot name="not-logged-in"/>

    <p>
      <input type="password" v-model="jwk"> <button @click="login">Login</button>
    </p>
  </div>
</template>

<script>
import { defineComponent, ref, unref, watch } from 'vue';
import useAuthentication from '../composables/useAuthentication';

export default defineComponent({
  name: 'Authenticated',
  setup() {
    const {
      isAuthenticated,
      sessionLogin,
      login,
      storageCredentials,
      signingKey
    } = useAuthentication();

    const jwk = ref(null);

    function userLogin() {
      const { key } = storageCredentials;
      login(key, unref(jwk))
    }

    sessionLogin();
    return {
      isAuthenticated,
      login: userLogin,
      jwk,
    }
  },
});
</script>
