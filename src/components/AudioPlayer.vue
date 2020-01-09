<template>
  <div class="audio-player">
    <!-- greets https://codepen.io/getreworked/pen/QrgEOG -->
  </div>
</template>

<script>
import affirmative from '@/assets/affirmative.ogg';
import negative from '@/assets/negative.ogg';
export default {
  name: 'AudioPlayer',
  props: {
  },
  data: function () {
    return {
      audios: [
        {
          id: 'affirmative',
          name: 'affirmative',
          file: new Audio(affirmative),
          isPlaying: false
        },
        {
          id: 'negative',
          name: 'negative',
          file: new Audio(negative),
          isPlaying: false
        },
      ]
    }
  },
  computed: {
  },
  methods: {
    play (audio) {
      audio.isPlaying = true;
      audio.file.load();
      audio.file.play();
      audio.file.addEventListener('ended', () => {
        audio.isPlaying = false;
      })
    }
  },
  created: function () {
    this.$root.$on('play-audio', (arg) => {
      this.play(this.audios.find((a) => a.id === arg));
    })
  },
  destroyed: function () {
    this.$root.$off('play-audio');
  }
}
</script>

<style scoped>
</style>
