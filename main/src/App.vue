<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { UserModule } from "user_module";
const { CLOUDBASE_ENVID, CLOUDBASE_SECRETID, CLOUDBASE_SECRETKEY } = import.meta
  .env;
const loginAccount = "q1095568627@163.com";
// const loginPassword = "uiophjkl123456789";
const loginPassword = "uiophjkl12345678";
// const userModule = new UserModule(CLOUDBASE_ENVID, {
//   loginAccount: loginAccount,
//   loginPassword: loginPassword,
// });
const userModule1 = new UserModule(CLOUDBASE_ENVID);
userModule1.authModule
  .signUpWithEmail("q1095568627@163.com", "uiophjkl123456789")
  // .then((res) => console.log(res))
  .catch((reason: { stack: string; code: string; message: string }) => {
    // console.log(
    //   reason.message.includes("102002") &&
    //     reason.message.includes("mail user exist")
    // );
    console.log(reason);
  });
// userModule1.authModule.signInWithEmail(loginAccount, loginPassword).then();
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
