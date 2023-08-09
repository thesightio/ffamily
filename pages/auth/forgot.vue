<template>
  <div class="page-content">
    <div class="center-screen full-screen">
      <div class="center-relation">
        <form
          v-if="!resetsend"
          class="auth-form"
          action="index.html"
          method="post"
        >
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/auth/"> </router-link>
          </div>

          <p>
            Введите e-mail адрес указанный при регистрации и мы выше инструкцию
            по восстановлению.
          </p>

          <div class="form-row">
            <input
              v-model="email"
              type="email"
              placeholder="E-Mail адрес"
              name=""
              required
              data-pristine-required-message="Введите e-mail"
              data-pristine-email-message="Некорректный e-mail адрес"
            />
          </div>

          <div class="actions">
            <input type="submit" class="btn" name="" value="Восстановить" />
          </div>

          <div class="action-links">
            <router-link to="/auth/register/"
              >Зарегистрировать аккаунт</router-link
            >
            <router-link to="/auth/">Войти в существующий</router-link>
          </div>
        </form>

        <div v-else class="auth-form" method="post">
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/"> </router-link>
          </div>
          <p>
            На указанный e-mail отправлено информационное письмо с новым
            паролем. Настоятельно советуем изменить пароль после входа в личный
            кабинет.
          </p>
        </div>
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
      loginerror: false,
      form: null,
      valid: null,
      resetsend: false,
    }
  },
  created() {
    that = this
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
        tha.valid.validate()
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
      that.$axios
        .post('/api/reset', {
          email: that.email,
        })
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            that.resetsend = true
            console.log(response)
            // that.$store.commit('setuser', response.data.user) // Сохраняем информацию о пользователе в хранилище
            // that.$store.commit('settoken', response.data.token) // Сохраняем токен в хранилище
            // console.log('getter', that.$store.getters.getuser)
            //
            // that.$cookies.set('token', response.data.token, {
            //   path: '/',
            //   // secure: true,
            //   expires: response.data.expires_at
            // })
            //
            // that.$router.push('/account/settings/')
          }
        })
        .catch((response) => {
          that.resetsend = false
          that.password = ''
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
