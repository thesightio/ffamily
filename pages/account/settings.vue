<template>
  <div class="page-content">
    <section class="cabinet" data-type="inner">
      <div class="center">
        <h1>Личный кабинет</h1>
        <div class="cabinet-info flex flex-just-b flex-wrap">
          <aside class="col-4">
            <nav class="side-menu">
              <!-- <router-link to="/account/history/">История загрузок</router-link> -->
              <router-link to="/account/favorites/"
                >Избранные шрифты</router-link
              >
              <router-link to="/account/settings/"
                >Настройки аккаунта</router-link
              >
              <!-- <hr v-if="$store.getters.getuser.rights"/>
              <router-link to="/account/addperson/" v-if="$store.getters.getuser.rights">Добавить дизайнера</router-link>
              <router-link to="/account/addfont/" v-if="$store.getters.getuser.rights">Добавить шрифт</router-link>
              <router-link to="/account/addarticle/" v-if="$store.getters.getuser.rights">Добавить статью</router-link>
              <router-link to="/account/addquestion/" v-if="$store.getters.getuser.rights">Добавить вопрос</router-link> -->
              <div class="logout" @click="tryLogout">Выйти из кабинета</div>
            </nav>
          </aside>
          <div class="cabinet-content col-8">
            <p>Вы можете изменить настройки аккаунта в любой момент времени.</p>
            <form
              class="account-form auth-form"
              method="post"
              @submit="updateAccount"
            >
              <div class="form-grid flex flex-just-b flex-wrap">
                <div class="form-row col-6">
                  <div class="form-inner">
                    <small>Отображаемое имя</small>
                    <input
                      v-model="user.name"
                      type="text"
                      name=""
                      value=""
                      placeholder="Имя"
                    />
                  </div>
                </div>
                <div class="form-row col-6">
                  <div class="form-inner">
                    <small>E-Mail адрес</small>
                    <input
                      v-model="user.email"
                      type="text"
                      name=""
                      value=""
                      placeholder="E-Mail"
                    />
                  </div>
                </div>
                <div class="form-row col-6">
                  <div class="form-inner">
                    <small>Новый пароль</small>
                    <input
                      v-model="password"
                      type="password"
                      name=""
                      value=""
                      placeholder="Пароль"
                    />
                  </div>
                </div>
                <div class="form-row col-6">
                  <div class="form-inner">
                    <small>Повторите новый пароль</small>
                    <input
                      v-model="rpassword"
                      type="password"
                      name=""
                      value=""
                      placeholder="Повторите пароль"
                    />
                  </div>
                </div>
              </div>

              <div class="actions flex flex-just-b flex-center-v">
                <input type="submit" class="btn" name="" value="Сохранить" />
                <small
                  >Оставьте поля «Новый пароль» и «Повторите новый пароль»
                  пустыми если не хотите изменять текущий пароль</small
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
let that
export default {
  middleware: 'auth',
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
      password: '',
      rpassword: '',
    }
  },
  created() {
    that = this
    this.user = this.$auth.user
  },
  mounted() {},
  methods: {
    updateAccount(e) {
      e.preventDefault()

      this.$axios
        .post(
          '/api/user',
          {
            name: this.user.name,
            email: this.user.email,
            password: this.password,
            repeat_password: this.rpassword,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + this.$auth.strategy.token.get(),
            },
          }
        )
        .then((response) => {
          // that.$root.user = response.data;
          this.$store.commit('setuser', response.data)
        })
        .catch((response) => {
          console.log(response)
        })
    },
    tryLogout(e) {
      e.preventDefault()
      that.$cookies.remove('token')
      this.$store.commit('setuser', null)
      this.$store.commit('settoken', '')
      this.$router.push('/auth/')
    },
  },
}
</script>

<style lang="scss" scoped>
section.cabinet {
  .center {
    position: relative;

    h1 {
      position: absolute;
      top: 222px;
      left: 120px;
    }
  }
}

.account-form {
  margin-top: 70px;

  .actions {
    // margin: 0 -20px;

    small {
      max-width: 40%;
      font-size: 13px;
      line-height: 1.53;
    }
  }
}

.cabinet-info {
  aside,
  .cabinet-content {
    padding: 222px 0 100px;
  }

  .cabinet-content {
    border-left: 1px solid rgba(#707070, 0.1);
    padding-top: 322px;
    padding-left: 70px;

    .font-list {
      // border-top: 1px solid rgba(#707070, 0.1);
      margin-top: 70px;
      // margin-left: -70px;

      // .font-style {
      //   border-left: 0;
      //   border-right: 1px solid rgba(#707070, 0.1);
      // }
    }
  }

  p {
    font-size: em(16);
    line-height: 2.125;
  }
}
</style>
