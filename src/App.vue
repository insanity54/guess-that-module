<template>
<div id="app">
  <Nav />
  <router-view />
  <GithubCorner />
</div>
</template>

<script>
import Nav from './components/Nav/Nav';
import GithubCorner from './components/GithubCorner.vue'
export default {
  name: 'app',
  components: {
    Nav,
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
