<template>
  <div id="app">
    <!-- <img alt="Vue logo" :src='require("./assets/logo.png")' > -->
    <img alt="Vue logo" src='./assets/logo.png' >
    <HelloWorld msg="Welcome to Your Vue.js App！！！！ji"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import logo from './assets/logo.png'

export default {
  name: 'App',
    components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
