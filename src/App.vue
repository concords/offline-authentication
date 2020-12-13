<template>
  <authenticated>
    <h1>Offline Authenticaion</h1>

    <template #logged-in>
     <p>
      🎉 You found the Key
     </p>

     <button @click="logout">Logout</button>
    </template>

    <template #not-logged-in>
      Sorry, you must know the key.
    </template>

  </authenticated>
  <p style="color: #e3e3e3;">
    74600UtCzXYIB7uOfxcXWJCENviBdCkcxCmlDTissFreeQx6MBZTnputXkAqn-zM
  </p>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Authenticated from './components/Authenticated.vue';
import useAuthentication from './composables/useAuthentication';

export default defineComponent({
  name: 'App',
  components: {
    Authenticated
  },
  setup() {
    const { logout } = useAuthentication();

    return { logout }
  },
});
</script>
