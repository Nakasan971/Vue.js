<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Head/>
    <Body/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Head from './components/Head.vue'
import Body from './components/Body.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
    Head,
    Body
  }
}
</script>

<style>
*{
    box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 640px;
  margin-top: 60px;
}
</style>
