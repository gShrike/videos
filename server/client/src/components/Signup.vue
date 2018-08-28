<template>
  <main>
    <div class="container">
      <h2>Signup</h2>
      <div class="signup">
        <div class="errors">
        </div>
        <form id="submit" action="/signup" method="post">
          <label for="name">Name: </label>
          <input type="text" name="name" id="name"/>
          <label for="password">Password: </label>
          <input type="password" name="password" id="password"/>
          <label for="confirmation">Confirm Password: </label>
          <input type="password" name="confirmation" id="confirmation"/>
          <input class="show" type="submit" value="signup"/>
          <div class="match"></div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Signup',
};
</script>

<style>
</style>
