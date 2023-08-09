<template>
  <div class="page-content">
    <section data-type="main">
      <div v-swiper:mySwiper="swiperOption" class="item-content">
        <div class="swiper-wrapper">
          <div
            v-for="slide in slides"
            :key="slide.id"
            class="swiper-slide full-screen"
          >
            <div class="center flex flex-center-v full-screen">
              <div class="slide-info">
                <div class="slide-info-type">
                  {{ slide.subtitle }}
                </div>
                <img
                  v-if="slide.font != '' && slide.font != null"
                  class="font-title"
                  :src="$axios.defaults.baseURL + slide.font"
                  alt=""
                />
                <h1 v-else>{{ slide.name }}</h1>

                <div class="slide-desc" v-html="slide.body"></div>
                <!-- Gilroy был разработан Радомиров Тиньковым. Содержит 20 стилей и вариантов. Номер #1 в бестселлерах на данный момент. -->
              </div>
              <div class="slide-link">
                <router-link :to="slide.link">{{ slide.button }}</router-link>
              </div>
              <img
                class="slide-image"
                :src="$axios.defaults.baseURL + slide.preview"
                alt=""
              />
            </div>
          </div>

          <!-- <div class="swiper-slide full-screen">
            <div class="center flex flex-center-v full-screen">
              <div class="slide-info">
                <div class="slide-info-type">
                  Лучший за неделю
                </div>
                <img class="font-title" src="/img/gilroy.png" alt="">

                <p>Gilroy был разработан Радомиров Тиньковым. Содержит 20 стилей и вариантов. Номер #1 в бестселлерах на данный момент.</p>
              </div>
              <div class="slide-link">
                <router-link to="/fonts/giroy">Подробнее о семействе</router-link>
              </div>
              <img class="slide-image" src="/img/tinkov.png" alt="">
            </div>
          </div>
          <div class="swiper-slide full-screen">
            <div class="center flex flex-center-v full-screen">
              <div class="slide-info">
                <div class="slide-info-type">
                  Лучший за неделю
                </div>
                <img class="font-title" src="/img/gilroy.png" alt="">

                <p>Gilroy был разработан Радомиров Тиньковым. Содержит 20 стилей и вариантов. Номер #1 в бестселлерах на данный момент.</p>
              </div>
              <div class="slide-link">
                <router-link to="/fonts/giroy">Подробнее о семействе</router-link>
              </div>
              <img class="slide-image" src="/img/tinkov.png" alt="">
            </div>
          </div> -->
        </div>
      </div>

      <div class="slider-navigation"></div>
    </section>

    <section data-type="new">
      <div class="center flex">
        <aside class="col-2">
          <h4 class="subst">Новое</h4>
        </aside>
        <div class="section-content col-10">
          <div class="font-grid flex flex-wrap">
            <router-link
              v-for="font in fonts"
              :key="font.id"
              :to="'/fonts/' + font.id"
              class="font-item col-4"
            >
              <div class="font-inner">
                <div
                  class="font-preview"
                  :class="font.preview != '' ? 'loaded' : ''"
                >
                  <img
                    :src="'data:image/png;base64,' + font.preview"
                    :srcset="'data:image/png;base64,' + font.preview2x + ' 2x'"
                    alt=""
                  />
                </div>
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
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section data-type="articles">
      <div class="center flex">
        <aside class="col-2">
          <h4 class="subst">Интересное</h4>
        </aside>
        <div class="section-content col-10">
          <div class="article-list flex flex-wrap">
            <div
              v-for="article in articles"
              :key="article.id"
              class="article-item col-4"
            >
              <router-link
                :to="'/interest/' + article.code"
                class="article-inner"
              >
                <div class="article-photo">
                  <img
                    :src="$axios.defaults.baseURL + article.preview"
                    alt=""
                  />
                </div>
                <div class="article-info">
                  <h4 class="subst">{{ article.name }}</h4>
                  <div class="article-info-list flex">
                    <div class="article-author">От {{ article.author }}</div>
                    <div class="article-date">
                      {{ $moment(article.created_at).format('LL') }}
                    </div>
                  </div>
                </div>
              </router-link>
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
  async asyncData(context) {
    const response = await context.app.$axios.get(`/api/fonts`, {
      params: {
        current: 0,
        limit: 9,
        sort: 'popular',
      },
    })
    const responseArticles = await context.app.$axios.get(`/api/articles`, {
      params: {
        limit: 10,
        current: 0,
      },
    })
    const responseSlides = await context.app.$axios.get(`/api/slides`, {
      params: {
        limit: 10,
        current: 0,
      },
    })

    const fonts = response.data.items
    const fontIds = []

    for (let i = 0; i < fonts.length; i++) {
      fontIds.push(fonts[i].id)
    }

    return {
      fonts: response.data.items,
      fontIds,
      articles: responseArticles.data.items,
      slides: responseSlides.data,
    }
  },
  data() {
    return {
      fontIds: [],
      fonts: [],
      articles: [],
      slides: [],
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 600,
        grabCursor: true,
        on: {
          slideChange() {
            console.log('change')
          },
        },
      },
    }
  },
  created() {
    that = this

    this.$axios
      .get('/api/articles', {
        params: {
          limit: 10,
          current: 0,
        },
      })
      .then((response) => {
        console.log(response)
        this.articles = response.data.items
        console.log(this.articles)
      })
      .catch((error) => {
        console.warn('error', error)
        if (error.response != null) {
          console.warn(error.response)
        }
      })

    this.$axios
      .get('/api/slides', {
        params: {
          limit: 10,
          current: 0,
        },
      })
      .then((response) => {
        console.log('SLIDES', response.data)
        that.slides = response.data
        // this.articles = response.data.items;
        // console.log(this.articles);
      })
      .catch((error) => {
        console.warn('error', error)
        if (error.response != null) {
          console.warn(error.response)
        }
      })
  },
  mounted() {
    const favList = this.$cookies.get('favs')
    console.log('favlist', favList)

    for (let i = 0; i < this.fonts.length; i++) {
      this.fonts[i].fav = false
      if (favList != null) {
        for (let o = 0; o < favList.length; o++) {
          if (parseInt(favList[o]) === parseInt(this.fonts[i].id)) {
            this.fonts[i].fav = true
          }
        }
      }
    }
    that.fontIds = []
    for (let i = 0; i < that.fonts.length; i++) {
      that.fontIds.push(that.fonts[i].id)
    }

    console.log('renew fonts', that.fontIds)
    that.genPreview()
  },
  methods: {
    genPreview: throttle(function (e) {
      console.log('get previews')
      this.$axios
        .get('/api/get-previews', {
          params: {
            fonts: that.fontIds,
            size: 30,
          },
        })
        .then((response) => {
          console.log('preview response', response.data.previews)
          for (let i = 0; i < that.fonts.length; i++) {
            console.log('check font', that.fonts[i].id)
            for (let o = 0; o < response.data.previews.length; o++) {
              console.log('check preview font', response.data.previews[o].id)
              if (that.fonts[i].id === parseInt(response.data.previews[o].id)) {
                // that.fonts[i].preview = response.data.previews[o].base64
                // that.fonts[i].preview2x = response.data.previews[o].base642
                this.$set(
                  that.fonts[i],
                  'preview',
                  response.data.previews[o].base64
                )
                this.$set(
                  that.fonts[i],
                  'preview2x',
                  response.data.previews[o].base642
                )
                console.log('setted preview', that.fonts[i])
              }
            }
          }
        })
        .catch((error) => {
          console.warn('error', error)
        })
      // }
    }, 1000),
    goToFont(font) {
      this.$router.push('/fonts/' + font.id)
    },

    addToFavs(font, e) {
      let favList = this.$cookies.get('favs')

      if (favList != null) {
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
  },
}
</script>

<style lang="scss" scoped>
section[data-type='main'] {
  min-height: 100vh;
  background: $lightgray;

  .swiper-slide {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 112px;
    padding: 0 110px;

    .center {
      position: relative;
      height: 100%;
    }

    .slide-image {
      position: absolute;
      bottom: 0;
      right: 160px;
      // width: 100%;
      max-width: 50%;
    }

    .slide-info {
      .slide-info-type {
        font-size: em(16);
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: em(20);
      }

      .title {
        font-size: em(104);
        line-height: 0.913;
        color: #000;
      }

      .font-title {
        height: 104px;
      }

      .slide-desc {
        margin-top: em(50);
        max-width: 480px;
      }

      p {
        font-size: em(16);
        line-height: 1.5;
      }
    }

    .slide-link {
      position: absolute;
      bottom: 110px;
      font-size: em(16);
      font-weight: 500;
    }
  }

  .slider-navigation {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 225px;
    border-left: 1px solid rgba(#707070, 0.1);
  }
}

section[data-type='new'] {
  padding: 120px 0 90px;
}

section[data-type='articles'] {
  padding: 120px 0 90px;
  border-top: 1px solid rgba(#707070, 0.1);
}
</style>
