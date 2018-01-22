<template>
  <div>
    <h4> A Platform for Links </h4>
    <p> Tag, rate, and share links to videos, blogs, documents, and more </p>
    <links />
  </div>
</template>

<script>
import Links from '@/components/Links';

export default {
  name: 'Home',
  components: {
    Links,
  },
};
</script>

<style>
</style>
