<template>
  <div class="page-content">
    <div class="center-screen full-screen">
      <div class="center-relation">
        <form class="auth-form" action="index.html" method="post">
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/"> </router-link>
          </div>

          <p>
            Введите адрес почты и пароль, указанный при регистрации. Если вы
            забыли пароль — восстановите его используя адрес почты.
          </p>

          <div class="form-row">
            <input
              v-model="email"
              type="email"
              placeholder="E-Mail"
              name=""
              value=""
              required
              data-pristine-required-message="Введите e-mail"
              data-pristine-email-message="Некорректный e-mail адрес"
            />
          </div>
          <div class="form-row">
            <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              name=""
              value=""
              required
              data-pristine-required-message="Введите пароль"
            />
          </div>

          <div class="actions flex flex-wrap">
            <input type="submit" class="btn" name="" value="Войти" />
            <div v-if="loginerror" class="pristine-error text-help col-12">
              Неверный пароль или такого аккаунта не существует
            </div>
          </div>

          <div class="action-links">
            <router-link to="/auth/register/"
              >Зарегистрировать аккаунт</router-link
            >
            <router-link to="/auth/forgot/">Забыли пароль?</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Pristine from 'pristinejs'
let that
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      loginerror: false,
    }
  },
  created() {
    that = this
    console.log(that.$root)
  },
  mounted() {
    this.form = this.$el.querySelector('.auth-form')
    this.valid = new Pristine(this.form, {
      classTo: 'form-row',
      errorClass: 'has-error',
      successClass: 'has-success',
      errorTextParent: 'form-row',
      errorTextTag: 'div',
      errorTextClass: 'text-help',
    })

    this.form.addEventListener('validate', (e) => {
      const input = e.detail
      if (input) {
        that.valid.validate(input)
      } else {
        that.valid.validate()
      }
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      const isValid = that.valid.validate()
      if (isValid) {
        // that.form.submit();
        that.tryLogin()
      } else {
        e.stopImmediatePropagation()
      }
    })
  },
  methods: {
    tryLogin(e) {
      // e.preventDefault()

      this.$auth
        .loginWith('local', {
          data: {
            email: that.email,
            password: that.password,
          },
        })
        .then((response) => {
          console.log(response)
          // this.$auth.setUser(response.data.user)
          this.$auth
            .setUserToken(response.data.token, response.data.expires_at)
            .then(() => {
              console.log('user set')
            })
        })

      // that.$axios
      //   .post('/api/login', {
      //     email: that.email,
      //     password: that.password,
      //   })
      //   .then((response) => {
      //     console.log(response, response.status)
      //     if (response.status === 200) {
      //       that.loginerror = false
      //       that.$store.commit('setuser', response.data.user) // Сохраняем информацию о пользователе в хранилище
      //       that.$store.commit('settoken', response.data.token) // Сохраняем токен в хранилище
      //       console.log('getter', that.$store.getters.getuser)

      //       that.$cookies.set('token', response.data.token, {
      //         path: '/',
      //         // secure: true,
      //         expires: new Date(response.data.expires_at),
      //       })

      //       console.log('ok go push')
      //       that.$router.push('/account/settings/')
      //     }
      //   })
      //   .catch((response) => {
      //     console.log('error fix', response)
      //     that.loginerror = true
      //     that.password = ''
      //   })
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
