<template>
<div id="app">
  <GuessThatModule />
  <GithubCorner />
</div>
</template>

<script>
import GuessThatModule from './components/GuessThatModule.vue'
import GithubCorner from './components/GithubCorner.vue'

export default {
  name: 'app',
  components: {
    GuessThatModule,
    GithubCorner
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
