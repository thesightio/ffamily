<template>
  <!-- eslint-disable -->
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
            <p>
              Ваши любимые шрифты — в одном месте. Сохраняйте необходимые шрифты
              и используйте их в дальнейшем.
            </p>
            <div class="font-list">
              <div class="font-grid flex flex-wrap">
                <div
                  v-for="font in fonts"
                  v-if="font.fav"
                  :key="font.id"
                  class="font-item col-6"
                >
                  <div class="font-inner">
                    <router-link
                      :to="'/fonts/' + font.id"
                      class="font-preview"
                      :class="font.preview != '' ? 'loaded' : ''"
                    >
                      <img
                        :src="'data:image/png;base64,' + font.preview"
                        :srcset="
                          'data:image/png;base64,' + font.preview2x + ' 2x'
                        "
                        alt=""
                      />
                    </router-link>
                    <div class="font-control flex flex-just-b">
                      <div class="font-info" @click="goToFont(font)">
                        <div class="name">
                          {{ font.name }} от {{ font.author.name }}
                        </div>
                        <small>{{ font.styles.length }} стиля</small>
                      </div>
                      <div class="font-favorite">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          :class="font.fav ? 'active' : ''"
                          viewBox="0 0 19.58 17.96"
                          @click="addToFavs(font, $event)"
                        >
                          <path
                            d="M8.94,2.33a4.42,4.42,0,0,0-6.26-.06l-.06.06-.14.14a5.17,5.17,0,0,0,0,7.24l7,7.13a.37.37,0,0,0,.54,0h0l7-7.13a5.17,5.17,0,0,0,0-7.24L17,2.33a4.41,4.41,0,0,0-6.25-.07.46.46,0,0,0-.07.07l-.71.72a.18.18,0,0,1-.27,0h0Z"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
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
import { throttle } from 'lodash'

let that

export default {
  middleware: 'auth',
  data() {
    return {
      fonts: [],
      fontIds: [],
    }
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
  mounted() {
    let favList = this.$cookies.get('favs')

    if (favList != null) {
      favList = favList.split(',')
    } else {
      favList = []
    }

    this.$axios
      .get('/api/fonts', {
        params: {
          current: 0,
          limit: 999,
          sort: 'popular',
          ids: favList,
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.items.length; i++) {
          response.data.items[i].preview = ''
          response.data.items[i].fav = false
          for (let o = 0; o < favList.length; o++) {
            if (parseInt(favList[o]) === parseInt(response.data.items[i].id)) {
              response.data.items[i].fav = true
            }
          }
        }
        that.fonts = response.data.items

        that.fontIds = []
        for (let i = 0; i < that.fonts.length; i++) {
          that.fontIds.push(that.fonts[i].id)
        }
        that.genPreview()
      })
      .catch((error) => {
        if (error.response != null) {
          console.warn(error.response)
        }
      })
  },
  methods: {
    goToFont(font) {
      this.$router.push('/fonts/' + font.id)
    },
    genPreview: throttle(function (e) {
      this.$axios
        .get('/api/get-previews', {
          params: {
            fonts: that.fontIds,
            text: that.previewText,
            size: 30,
            black: that.isBlack,
          },
        })
        .then((response) => {
          console.log(response.data.previews)
          for (let i = 0; i < that.fonts.length; i++) {
            for (let o = 0; o < response.data.previews.length; o++) {
              if (that.fonts[i].id === response.data.previews[o].id) {
                that.fonts[i].preview = response.data.previews[o].base64
                that.fonts[i].preview2x = response.data.previews[o].base642
              }
            }
          }
        })
    }, 1000),

    addToFavs(font, e) {
      let favList = this.$cookies.get('favs')

      if (favList !== null) {
        favList = favList.split(',')
      } else {
        favList = []
      }

      let skip = false
      for (let i = 0; i < favList.length; i++) {
        if (favList[i] === font.id) {
          skip = true
          favList.splice(i, 1)
          console.log('font alredy in list')
        }
      }

      if (!skip) {
        font.fav = true
        favList.push(font.id)
        that.$cookies.set('favs', favList, {
          path: '/',
        })
      } else {
        font.fav = false
        that.$cookies.set('favs', favList, {
          path: '/',
        })
      }
      console.log(favList)
    },

    tryLogout(e) {
      e.preventDefault()
      // that.$cookies.remove('token')
      // this.$store.commit('setuser', null)
      // this.$store.commit('settoken', '')
      // this.$router.push('/auth/')
      this.$auth.logout(/* .... */)
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
