<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <div class="login">
        <div class="errors">
        </div>
        <form id="submit" action="/login" method="post">
          <label for="name">Name: </label>
          <input type="text" name="name" id="name"/>
          <label for="password">Password: </label>
          <input type="password" name="password" id="password"/>
          <input class="show" type="submit" value="login"/>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style>
</style>
