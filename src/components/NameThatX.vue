<template>
<div class="guess-that-module">
  <div v-if="!begun">
    <label for="testLengthInput">How many {{ unit }} would you like to guess?</label>
    <vue-slider v-model="testLength" :min="1" :max="subject.length"></vue-slider>
    <h2 class="fancy">{{ testLength }}</h2>
    <div class="ntx-button" @click="doBegin">Begin</div>
  </div>
  <div v-if="begun">
    <div class="ntx-left">
      <div class="ntx-heading-wrapper">
        <span class="ntx-heading">{{ title }}</span>
        <div class="audio-toggle" @click="isMuted = !isMuted">
          <i v-if="!isMuted" class="material-icons">headset</i>
          <i v-if="isMuted" class="material-icons">headset_off</i>
        </div>
      </div>
      <div v-if="!isGameOver" class="ntx-image-wrapper">
        <img class="ntx-image" :src="moduleImage">
        <img class="ntx-image hidden" :src="moduleImageOnDeck">
      </div>
      <div v-if="isGameOver" class="">
        <div v-if="isGameOver" class="ntx-image">
          <p class="kanji">{{ finalGrade.kanji }}</p>
          <p class="kanji">{{ finalGrade.letter }}</p>
          <p class="percentage">{{ finalGrade.percentage }}</p>
          <p class="message">{{ finalGrade.message }}</p>
        </div>
      </div>
    </div>
    <div class="ntx-right">
      <div class="ntx-statistics">
        <span class="progress">{{ progress }}</span>

        <h2>Score</h2>
        <p v-if="!isLastAnswerCorrect" class="correction">Incorrect! The correct answer was, "{{ lastModuleName }}"</p>
        <p>Correct: {{ numberOfCorrectAnswers }} Incorrect: {{ numberOfIncorrectAnswers }}</p>
        <p v-if="isGameOver">Percentage: {{ calculatePercentage(numberOfCorrectAnswers, totalQuestions) }}%</p>
      </div>
      <div class="ntx-input-wrapper">
        <div v-if="!isGameOver" class="ntx-choices-wrapper">
          <button v-for="choice in choiceButtons" :key="choice" @click="submitChoice(choice)" class="ntx-button">{{ choice }}</button>
        </div>
        <div v-if="isGameOver" class="ntx-restart-wrapper">
          <button class="ntx-button" @click="restartGame()">Restart</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  name: 'NameThatX',
  props: {
    x: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  components: {
    VueSlider
  },
  computed: {
    finalGrade: function() {
      // {{ currentQuestionIndex }}/{{ totalQuestions }}
      let percentage = this.calculatePercentage(this.numberOfCorrectAnswers, this.totalQuestions)
      if (percentage < 50) {
        return {
          percentage: `${percentage}%`,
          kanji: '不可',
          letter: 'F',
          message: 'Unacceptable.'
        }
      } else if (percentage < 60) {
        return {
          percentage: `${percentage}%`,
          kanji: '認',
          letter: 'D',
          message: 'Acceptable.'
        }
      } else if (percentage < 70) {
        return {
          percentage: `${percentage}%`,
          kanji: '可',
          letter: 'C',
          message: 'Average.'
        }
      } else if (percentage < 80) {
        return {
          percentage: `${percentage}%`,
          kanji: '良',
          letter: 'B',
          message: 'Good'
        }
      } else if (percentage < 90) {
        return {
          percentage: `${percentage}%`,
          kanji: '優',
          letter: 'A',
          message: 'Very good'
        }
      } else {
        return {
          percentage: `${percentage}%`,
          kanji: '秀',
          letter: 'S',
          message: 'Exemplary'
        }
      }
    },
    progress: function() {
      return `${this.currentQuestionIndex}/${this.totalQuestions}`;
    },
    lastModuleName: function() {
      if (this.moduleCounter === 0) return '';
      else return this.subject[this.moduleCounter - 1].name;
    },
    moduleImage: function() {
      return this.subject[this.moduleCounter].image;
    },
    moduleImageOnDeck: function () {
      if (this.moduleCounter === this.testLength-1) return null;
      else return this.subject[this.moduleCounter+1].image;
    },
    totalQuestions: function() {
      return this.subject.length;
    },
    choiceButtons: function() {
      let correctChoice = this.subject[this.moduleCounter].name;
      let choices = [];
      choices.push(correctChoice);
      for (var i = 0; i < 3; i++) {
        choices.push(this.getValidIncorrectChoice(correctChoice, choices))
      }
      // scramble teh array
      return this.shuffle(choices);
    },
    isGameOver: function() {
      return ((this.numberOfCorrectAnswers + this.numberOfIncorrectAnswers) === (this.subject.length)) ? true : false;
    },
    currentQuestionIndex: function() {
      return (this.moduleCounter + 1);
    }
  },
  watch: {
    '$route' () {
      this.restartGame();
    }
  },
  methods: {
    playAudio: function (clip) {
      if (this.isMuted) return false;
      else this.$root.$emit('play-audio', clip);
    },
    doBegin: function () {
      this.subject = this.subject.slice(0, this.testLength);
      this.begun = true;
    },
    calculatePercentage: function(num, totalNum) {
      return Math.floor(num / totalNum * 100);
    },
    getIncorrectChoice: function getIncorrectChoice() {
      let incorrectIndex = Math.floor(Math.random() * ((this.subject.length - 1) + 1));
      let incorrectChoice = this.subject[(incorrectIndex)].name;
      return incorrectChoice;
    },
    getValidIncorrectChoice: function getValidIncorrectChoice(correctChoice, choicesSoFar) {
      let isValid = false;
      let choice;
      do {
        choice = this.getIncorrectChoice();
        if (
          choice !== correctChoice &&
          !choicesSoFar.includes(choice)
        ) isValid = true;
      } while (isValid === false);
      return choice;
    },
    shuffle: function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    nextQuestion: function() {
      if (this.moduleCounter === (this.subject.length - 1)) return this.moduleCounter;
      return this.moduleCounter++;
    },
    submitChoice: function(choice) {
      if (choice === this.subject[this.moduleCounter].name) {
        this.isLastAnswerCorrect = true;
        this.numberOfCorrectAnswers++;
        this.playAudio('affirmative');
      } else {
        this.isLastAnswerCorrect = false;
        this.numberOfIncorrectAnswers++;
        this.playAudio('negative');
      }
      this.nextQuestion();
    },
    restartGame: function() {
      this.moduleCounter = 0;
      this.numberOfCorrectAnswers = 0;
      this.numberOfIncorrectAnswers = 0;
      this.subject = this.shuffle(this.x.data);
      this.testLength = (() => (this.x.data.length>39) ? 39 : (this.x.data.length/2))(this);
      this.begun = false;
    }
  },
  created: function () {
  },
  data: function() {
    return {
      numberOfCorrectAnswers: 0,
      numberOfIncorrectAnswers: 0,
      moduleCounter: 0,
      testLength: (() => (this.x.data.length>39) ? 39 : (this.x.data.length/2))(),
      subject: this.shuffle(this.x.data),
      isLastAnswerCorrect: true,
      begun: false,
      isMuted: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audio-toggle {
  cursor: pointer;
  user-select: none;
}
.hidden {
  outline: 2px solid red;
  box-shadow: 3px 3px 3px red;
  position: absolute;
  visibility: hidden;
  z-index: -39;
}
@font-face {
  font-family: 'BubblegumSans';
  src: url('~@/assets/BubblegumSans-Regular.otf');
}
@font-face {
  font-family: 'Pecita';
  src: url('~@/assets/Pecita.otf');
}
.fancy {
  font-family: 'BubblegumSans';
}
.kanji {
  font-size: 4em;
  font-weight: bold;
  margin: 0;
}

.percentage {
  font-size: 2em;
  margin: 0;
}

.message {}

.correction {
  color: maroon;
}

.progress {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.guess-that-module {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.ntx-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 55vh;
}

.ntx-right {
  display: block;
  width: auto;
  height: 45vh;
}

.ntx-heading-wrapper {
  display: flex;
  flex-direction: row;
  font-size: 24px;
}

.ntx-input-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}

.ntx-image-wrapper {
  height: 45vh;
  width: 50vw;
}

.ntx-image-wrapper img {
  max-height: 100%;
  max-width: 100%;
}

.ntx-button {
  background-color: #137a7f;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0.2em;
  user-select: none;
  cursor: pointer;
}

.ntx-statistics p {
  font-size: 18px;
  font-weight: bold;
  width: 100vw;
}

.ntx-statistics {
  background-color: #bec8d1;
  margin: 1vh 0 1vh 0;
  padding: 1vh 0 1vh 0;
}

/*
  #373b3e grey
  #bec8d1 silver
  #86cecb light blue
  #137a7f dark blue
  #e12885 pink
   */
</style>
