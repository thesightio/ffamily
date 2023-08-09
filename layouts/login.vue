<template>
  <div>
    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  created() {
    // console.log(this.$store.getters.gettoken)
    // if (
    //   this.$store.getters.getuser != null &&
    //   this.$store.getters.gettoken != ''
    // ) {
    //   this.$router.push('/account/settings/')
    // }
  },
}
</script>

<style></style>
