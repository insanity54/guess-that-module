<template>
<div id="app">
  <Nav />
  <router-view />
  <GithubCorner />
  <AudioPlayer />
</div>
</template>

<script>
import Nav from '@/components/Nav/Nav';
import GithubCorner from '@/components/GithubCorner.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
export default {
  name: 'app',
  components: {
    Nav,
    GithubCorner,
    AudioPlayer
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
