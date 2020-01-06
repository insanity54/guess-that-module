<template>
  <div class="name-that-vocaloid">
    <div class="gtm-left">
      <div class="gtm-heading-wrapper">
        <h1 class="gtm-heading">Name That Vocaloid*!</h1>
      </div>
      <div class="gtm-image-wrapper">
        <img v-if="!isGameOver" class="gtm-image" :src="vocaloidImage">
      </div>
    </div>
    <div class="gtm-right">
      <div class="gtm-statistics">
        <span class="progress">{{ currentQuestionIndex }}/{{ totalQuestions }}</span>

        <h2>Score</h2>
        <p>Correct: {{ numberOfCorrectAnswers }} Incorrect: {{ numberOfIncorrectAnswers }}</p>
        <p v-if="isGameOver">Percentage: {{ calculatePercentage(numberOfCorrectAnswers, totalQuestions) }}%</p>
      </div>
      <div class="gtm-input-wrapper">
        <div v-if="!isGameOver" class="gtm-choices-wrapper">
          <button v-for="choice in choiceButtons" :key="choice" @click="submitChoice(choice)" class="gtm-button">{{ choice }}</button>
        </div>
        <div v-if="isGameOver" class="gtm-restart-wrapper">
          <button class="gtm-button" @click="restartGame()">Restart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vocaloids from '../assets/vocaloids.json';
  export default {
    name: 'NameThatVocaloid',
    computed: {
      vocaloidImage: function() {
        return this.vocaloids[this.vocaloidCounter].image;
      },
      totalQuestions: function() {
        return this.vocaloids.length;
      },
      choiceButtons: function() {
        let correctChoice = this.vocaloids[this.vocaloidCounter].name;
        let choices = [];
        choices.push(correctChoice);
        for (var i=0; i<3; i++) {
          choices.push(this.getValidIncorrectChoice(correctChoice, choices))
        }
        // scramble teh array
        return this.shuffle(choices);
      },
      isGameOver: function() {
        return ((this.numberOfCorrectAnswers + this.numberOfIncorrectAnswers) === (this.vocaloids.length)) ? true : false;
      },
      currentQuestionIndex: function() {
        return (this.vocaloidCounter+1)
      }
    },
    methods: {
      calculatePercentage: function (num, totalNum) {
        return Math.floor(num / totalNum * 100);
      },
      getIncorrectChoice: function getIncorrectChoice () {
        let incorrectIndex = Math.floor(Math.random() * ((this.vocaloids.length-1) + 1));
        let incorrectChoice = this.vocaloids[(incorrectIndex)].name;
        return incorrectChoice;
      },
      getValidIncorrectChoice: function getValidIncorrectChoice (correctChoice, choicesSoFar) {
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
      shuffle: function shuffle (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
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
        if (this.vocaloidCounter === (this.vocaloids.length-1)) return this.vocaloidCounter;
        return this.vocaloidCounter++;
      },
      submitChoice: function(choice) {
        if (choice === this.vocaloids[this.vocaloidCounter].name) this.numberOfCorrectAnswers++;
        else this.numberOfIncorrectAnswers++;
        this.nextQuestion();
      },
      restartGame: function() {
        this.vocaloidCounter = 0;
        this.numberOfCorrectAnswers = 0;
        this.numberOfIncorrectAnswers = 0;
      }
    },
    data: function () {
      return {
        numberOfCorrectAnswers: 0,
        numberOfIncorrectAnswers: 0,
        vocaloidCounter: 0,
        vocaloids: vocaloids.vocaloids,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .progress {
    font-size: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .name-that-vocaloid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .gtm-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 55vh;
  }
  .gtm-right {
    display: block;
    width: auto;
    height: 45vh;
  }
  .gtm-heading-wrapper {
    height: 10vh;
  }
  .gtm-input-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
  }
  .gtm-image-wrapper {
    height: 45vh;
    width: 50vw;
  }
  .gtm-image-wrapper img {
    max-height: 100%;
    max-width: 100%;
  }
  .gtm-button {
    background-color: #137a7f;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0.2em;
  }
  .gtm-statistics p {
    font-size: 18px;
    font-weight: bold;
    width: 100vw;
  }
  .gtm-statistics {
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
