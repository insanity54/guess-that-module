<template>
  <div class="nav">
    <div class="logo">
      <span>VOCALOID</span>
      <span>01</span>
    </div>
    <div class="nav-list">
      <router-link to="/name-that-vocaloid">Name That VOCALOID</router-link>
      <router-link to="/name-that-module">Name That Module</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  components: {
  }
}
</script>

<style>
@font-face {
  font-family: 'Little Miku';
  src: url('~@/assets/Little Miku.woff');
}
@font-face {
  font-family: 'Black Ops One';
  src: url('~@/assets/BlackOpsOne-Regular.ttf');
}
@font-face {
  font-family: 'JosefinSans-Thin';
  src: url('~@/assets/JosefinSans-Thin.ttf');
}
@font-face {
  font-family: 'JosefinSans-Regular';
  src: url('~@/assets/JosefinSans-Regular.ttf');
}
.logo {
  margin: 0.5em 1em;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo span:nth-child(1) {
  font-family: 'JosefinSans-Regular';
}
.logo span:nth-child(2) {
  font-family: 'Black Ops One';
  color: red;
  font-size: 18pt;
}
.nav {
  display: flex;
  flex-direction: row;
  background-color: rgb(230, 230, 230);
  user-select: none;
}
.nav-list {
  display: flex;
  font-weight: bold;
  font-family: 'JosefinSans-Thin';
}
.nav-list * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  text-decoration: none;
  color: black;
}
</style>
