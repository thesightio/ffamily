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
            <p>Здесь находятся все шрифты, которые вы когда-либо скачивали.</p>
            <div class="font-styles-list">
              <div class="font-style flex flex-just-b flex-center-v">
                <div class="font-style-left">
                  <div class="font-name">Gilroy Thin</div>
                  <div class="font-preview">Bounds Agency</div>
                </div>
                <div class="font-style-right flex flex-just-e flex-center-v">
                  <div class="font-price text-right">
                    <small>Цена</small>
                    <h4>от 2.500 ₽</h4>
                  </div>
                  <div class="font-add"></div>
                </div>
              </div>

              <div class="font-style flex flex-just-b flex-center-v">
                <div class="font-style-left">
                  <div class="font-name">Gilroy Thin</div>
                  <div class="font-preview">Bounds Agency</div>
                </div>
                <div class="font-style-right flex flex-just-e flex-center-v">
                  <div class="font-price text-right">
                    <small>Цена</small>
                    <h4>от 2.500 ₽</h4>
                  </div>
                  <div class="font-add added"></div>
                </div>
              </div>

              <div class="font-style flex flex-just-b flex-center-v">
                <div class="font-style-left">
                  <div class="font-name">Gilroy Thin</div>
                  <div class="font-preview">Bounds Agency</div>
                </div>
                <div class="font-style-right flex flex-just-e flex-center-v">
                  <div class="font-price text-right">
                    <small>Цена</small>
                    <h4>от 2.500 ₽</h4>
                  </div>
                  <div class="font-add added"></div>
                </div>
              </div>

              <div class="font-style flex flex-just-b flex-center-v">
                <div class="font-style-left">
                  <div class="font-name">Gilroy Thin</div>
                  <div class="font-preview">Bounds Agency</div>
                </div>
                <div class="font-style-right flex flex-just-e flex-center-v">
                  <div class="font-price text-right">
                    <small>Цена</small>
                    <h4>от 2.500 ₽</h4>
                  </div>
                  <div class="font-add added"></div>
                </div>
              </div>

              <div class="font-style flex flex-just-b flex-center-v">
                <div class="font-style-left">
                  <div class="font-name">Gilroy Thin</div>
                  <div class="font-preview">Bounds Agency</div>
                </div>
                <div class="font-style-right flex flex-just-e flex-center-v">
                  <div class="font-price text-right">
                    <small>Цена</small>
                    <h4>от 2.500 ₽</h4>
                  </div>
                  <div class="font-add added"></div>
                </div>
              </div>
            </div>
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
    return {}
  },
  created() {
    that = this
    // const token = this.$cookies.get('token')

    // if (token == null || token == '') {
    //   this.$store.commit('setuser', null)
    //   this.$router.push('/auth/')
    // }

    // this.$axios
    //   .get('/api/user', {
    //     headers: {
    //       Accept: 'application/json',
    //       Authorization: 'Bearer ' + token,
    //     },
    //   })
    //   .then((response) => {
    //     if (response != null) {
    //       this.user = response.data
    //       this.$store.commit('setuser', response.data)
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response != null) {
    //       this.$router.push('/auth/')
    //     }
    //   })
  },
  methods: {
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

.cabinet-info {
  aside,
  .cabinet-content {
    padding: 222px 0 100px;
  }

  .cabinet-content {
    border-left: 1px solid rgba(#707070, 0.1);
    padding-top: 322px;
    padding-left: 70px;

    .font-styles-list {
      border-top: 1px solid rgba(#707070, 0.1);
      margin-top: 70px;
      margin-left: -70px;

      .font-style {
        border-left: 0;
        border-right: 1px solid rgba(#707070, 0.1);
      }
    }
  }

  p {
    font-size: em(16);
    line-height: 2.125;
  }
}
</style>
