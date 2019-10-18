<template>
  <div id="app">
    <GuessThatModule/>
  </div>
</template>

<script>
import GuessThatModule from './components/GuessThatModule.vue'

export default {
  name: 'app',
  components: {
    GuessThatModule
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
