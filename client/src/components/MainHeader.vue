<template>
  <header>
    <div class="head container">
      <h3><router-link to="/">Shrike Videos</router-link></h3>
      <nav>
        <div class="col"><router-link to="links">links</router-link></div>
        <div class="col"><router-link to="login">login</router-link></div>
        <!-- <div class="col"><router-link to="teams">teams</router-link></div> 
        <div class="col"><router-link to="signup">signup</router-link></div> -->
      </nav>
    </div>
    <div class="subbanner"></div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style>
</style>

