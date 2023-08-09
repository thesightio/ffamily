<template>
  <div>
    <heading></heading>
    <main role="main">
      <nuxt />
    </main>
    <footering></footering>
  </div>
</template>

<script>
// import gsap from 'gsap'
const heading = require('~/components/header').default
const footering = require('~/components/footer').default

// let that
export default {
  components: {
    heading,
    footering,
  },
  data() {
    return {}
  },
  created() {
    // that = this
    // const token = this.$cookies.get('token')
    // console.log('test token', token)
    // if (token !== null || token !== '') {
    //   this.$axios
    //     .get('/api/user', {
    //       headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //       },
    //     })
    //     .then((response) => {
    //       console.log('test response', response)
    //       if (response !== null) {
    //         this.$store.commit('setuser', response.data)
    //       }
    //     })
    // }
  },
  mounted() {},
}
</script>

<style></style>
