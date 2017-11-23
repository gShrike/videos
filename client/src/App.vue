<template>
  <div>
    <main-header />
    <router-view/>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader';

export default {
  name: 'app',
  components: {
    MainHeader,
  },
};
</script>

<style lang="sass">
@import './sass/style.scss'
</style>
