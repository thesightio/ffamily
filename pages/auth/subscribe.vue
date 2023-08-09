<template>
  <div class="page-content">
    <div class="center-screen full-screen">
      <div class="center-relation">
        <div v-if="hasemail" class="auth-form" method="post">
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/"> </router-link>
          </div>
          <p>
            <b>Спасибо за ваш выбор!</b> Вы успешно подписаны на рассылку по
            указанному электронному адресу ({{ email }}). Вы можете отписаться
            от рассылки в любой момент времени нажав соответствующую кнопку в
            любом из присылаемых нами писем.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that
export default {
  layout: 'login',
  data() {
    return {
      email: 'test',
      hasemail: false,
    }
  },
  created() {
    that = this

    if (that.$route.params.email) {
      this.email = that.$route.params.email
      this.hasemail = true
    } else {
      that.$router.push('/auth/')
    }

    console.log(that.$route)
  },
  methods: {
    tryRegister(e) {
      e.preventDefault()

      that.$axios
        .post('/api/register', {
          name: that.name,
          email: that.email,
          password: that.password,
          repeat_password: that.repeatpassword,
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.status) {
            that.$router.push('/auth/')
          }
        })
        .catch((response) => {
          // List errors on response...
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  padding: 120px 0;

  p {
    margin-bottom: 30px;
    font-size: 13px;
  }

  .form-title {
    margin-bottom: 40px;

    img {
      width: 150px;
    }
    .to-back {
      width: 19px;
      height: 19px;
      background-image: url('~assets/img/back.svg');
      background-position: center;
      background-repeat: no-repeat;
      display: block;
    }
  }
}
</style>
