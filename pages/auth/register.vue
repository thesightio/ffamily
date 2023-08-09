<template>
  <div class="page-content">
    <div class="center-screen full-screen">
      <div class="center-relation">
        <form v-if="!registered" class="auth-form" method="post">
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/"> </router-link>
          </div>

          <p>
            Создайте аккаунт для удобного управления сайтом, покупки и загрузки
            ранее добавленных шрифтов в любое время.
          </p>

          <div class="form-row">
            <input
              v-model="name"
              type="text"
              placeholder="Ваше имя"
              name="name"
              value=""
              required
              data-pristine-required-message="Введите ваше имя"
            />
          </div>
          <div class="form-row">
            <input
              v-model="email"
              type="email"
              placeholder="E-Mail адрес"
              name="email"
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
              name="password"
              value=""
              required
              data-pristine-required-message="Введите пароль"
            />
          </div>
          <div class="form-row">
            <input
              v-model="repeatpassword"
              type="password"
              placeholder="Повторите пароль"
              name="repeat_password"
              value=""
              required
              data-pristine-required-message="Повторите пароль"
            />
          </div>

          <div class="actions flex flex-wrap">
            <input
              type="submit"
              class="btn"
              name=""
              value="Зарегистрироваться"
            />
            <div v-if="registererror" class="pristine-error text-help col-12">
              Такой аккаунт уже зарегистрирован. Измените e-mail адрес
            </div>
          </div>

          <div class="action-links">
            <router-link to="/auth/">Войти в существующий аккаунт</router-link>
            <router-link to="/auth/forgot/">Забыли пароль?</router-link>
          </div>
        </form>
        <form v-else class="auth-form" method="post">
          <div class="form-title flex flex-just-b flex-center-v">
            <router-link to="/"
              ><img src="~assets/img/logo.svg" alt="Главная страница"
            /></router-link>
            <router-link class="to-back" to="/"> </router-link>
          </div>

          <p>
            Ваш аккаунт успешно создан! На указанный адрес электронной почты ({{
              email
            }}) отправлено информационное письмо. Если вы хотите получать
            полезную информацию сервиса (подробки шрифтов, полезные статьи и
            т.д), подтвердите ваше согласие на рассылку.
          </p>

          <div class="action-links">
            <router-link to="/auth/">Войти в личный кабинет</router-link>
            <!-- <a href="/auth/subscribe/">Подписаться на рассылку</a> -->
            <router-link
              :to="{ name: 'auth-subscribe', params: { email: email } }"
              >Подписаться на рассылку</router-link
            >
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
      name: '',
      email: '',
      password: '',
      repeatpassword: '',
      registered: false,
      form: null,
      valid: null,
      registererror: false,
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
        that.tryRegister(e)
      } else {
        e.stopImmediatePropagation()
      }
    })
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
            that.registererror = false
            this.registered = true
            // that.$router.push('/auth/')
          }
        })
        .catch((response) => {
          that.registererror = true
          that.password = ''
          that.repeatpassword = ''
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
