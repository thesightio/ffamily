<template>
  <!-- eslint-disable -->
  <div class="page-content">
    <section
      data-type="font"
      itemscope
      itemtype="http://schema.org/NewsArticle"
    >
      <meta itemprop="genre" content="Шрифт" />
      <h1 itemprop="headline" style="visibility: hidden; opacity: 0">
        {{ font.name }}
      </h1>
      <div class="center">
        <div class="font-detail flex">
          <div class="font-info col-9">
            <div class="font-top flex flex-just-b flex-center-v">
              <img
                class="font-title"
                :src="'data:image/png;base64,' + title"
                :srcset="'data:image/png;base64,' + title2x + ' 2x'"
                alt=""
              />
              <div class="font-control flex">
                <div
                  class="font-favorite"
                  :class="font.fav ? 'active' : ''"
                  @click="addToFavs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19.58 17.96"
                  >
                    <path
                      d="M8.94,2.33a4.42,4.42,0,0,0-6.26-.06l-.06.06-.14.14a5.17,5.17,0,0,0,0,7.24l7,7.13a.37.37,0,0,0,.54,0h0l7-7.13a5.17,5.17,0,0,0,0-7.24L17,2.33a4.41,4.41,0,0,0-6.25-.07.46.46,0,0,0-.07.07l-.71.72a.18.18,0,0,1-.27,0h0Z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="slider-prev" @click="slidePrev"></div>
                <div class="slider-next" @click="slideNext"></div>
              </div>
            </div>

            <div
              ref="mySwiper"
              v-swiper:mySwiper="swiperOption"
              class="font-slider"
            >
              <div class="swiper-wrapper">
                <div v-for="preview in font.previews" class="swiper-slide">
                  <img :src="preview.url" :alt="preview.alt" />
                </div>
              </div>
            </div>

            <div class="font-tabs">
              <div class="font-tabs-list flex">
                <div class="font-tab active" @click="activeTab(0)">
                  Индивидуальные стили
                </div>
                <div class="font-tab" @click="activeTab(1)">Символы</div>
                <div class="font-tab" @click="activeTab(2)">Наборы стилей</div>
                <div class="font-tab" @click="activeTab(3)">Лицензия</div>
              </div>

              <div class="font-tabs-contents">
                <div class="font-tabs-content styles" style="display: block">
                  <div class="fonts-filter flex">
                    <div class="filter-col alphabet">
                      <input
                        v-model="previewText"
                        type="text"
                        name=""
                        value=""
                        placeholder="Введите текст для предосмотра"
                        @input="genPreview"
                      />
                    </div>
                    <div class="filter-col fill button"></div>
                  </div>

                  <div class="font-styles-list">
                    <div
                      v-for="style in font.styles"
                      :key="style.id"
                      class="font-style flex flex-just-b flex-center-v"
                    >
                      <div class="font-style-left">
                        <div class="font-name">
                          {{ style.name }} {{ style.type }}
                        </div>
                        <div class="font-preview">
                          <img
                            v-if="style.preview"
                            :src="'data:image/png;base64,' + style.preview"
                            :srcset="
                              'data:image/png;base64,' + style.preview2x + ' 2x'
                            "
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        class="font-style-right flex flex-just-e flex-center-v"
                      >
                        <!-- <div class="font-price text-right">
                          <small>Цена</small>
                          <h4>от 2.500 ₽</h4>
                        </div> -->
                        <div
                          class="font-add"
                          :class="style.bucked ? 'added' : ''"
                          @click="addToBucked(style)"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="font-tabs-content glyphs" style="display: none">
                  <div class="glyph-cart" style="font-size: 30px">
                    <div v-for="symbol in font.glyphs" class="glyph">
                      <!-- {{symbol}} -->
                      <img
                        :src="'data:image/png;base64,' + symbol.base64"
                        :srcset="
                          'data:image/png;base64,' + symbol.base642 + ' 2x'
                        "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="font-tabs-content package" style="display: none">
                  <div class="font-package flex flex-just-b">
                    <div class="font-package-left">
                      <div class="font-name">{{ font.name }} Family</div>
                      <div class="font-in-package">
                        <div
                          v-for="style in font.styles"
                          :key="style.id"
                          class="font-style"
                        >
                          <img
                            v-if="style.preview"
                            :src="'data:image/png;base64,' + style.preview"
                            :srcset="
                              'data:image/png;base64,' + style.preview2x + ' 2x'
                            "
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="font-package-right">
                      <div class="font-block">
                        <small>Количество</small>
                        <div class="value">
                          <!-- 20 стилей — 15.000 ₽ -->
                          {{ stylesCount }}
                          {{
                            $declOfNum(stylesCount, [
                              'стиль',
                              'стиля',
                              'стилей',
                            ])
                          }}
                        </div>
                      </div>
                      <!-- <div class="font-block">
                        <small>Индивидуальные стили</small>
                        <div class="value">
                          от 2.500 ₽
                        </div>
                      </div> -->

                      <div class="font-package-add" @click="addStyles">
                        <div class="add-icon"></div>
                        Добавить набор для использования
                      </div>
                    </div>
                  </div>
                </div>
                <div class="font-tabs-content text" style="display: none">
                  <div class="tab-text">
                    <!-- <p>Вы можете использовать этот шрифт в любом из следующих мест. Прочитайте полный текст лицензионного соглашения для получения подробной информации о каждой лицензии. Если вы имеете в виду использование, которое не охватывается этими лицензиями, свяжитесь с нами, и мы посмотрим, что мы можем сделать.</p>

                    <h4>Компьютер</h4>
                    <p>Лицензия предназначена для использования на компьютерах. Наиболее распространенный вариант лицензии для личных и профессиональных целей.</p>

                    <h4>Веб-шрифт</h4>
                    <p>Данная лицензия позволяет встроить выбранный шрифт в ваш сайт. Это позволит использовать его в CSS для стилизации. Вы можете использоват CDN FontFamily для легкого внедрения.</p>
                    <p>Веб-шрифты можно использовать на нескольких веб-сайтах/доменах, если они пренадлежат одному владельцу.</p>

                    <h4></h4> -->

                    <p>
                      Вы можете использовать этот шрифт в любом из следующих
                      мест. Прочитайте полный текст лицензионного соглашения для
                      получения подробной информации о каждой лицензии. Если вы
                      имеете в виду использование, которое не охватывается этими
                      лицензиями, свяжитесь с нами, и мы посмотрим, что мы можем
                      сделать.
                    </p>

                    <h4>Лицензия MIT</h4>
                    <p>
                      Лицензия открытого программного обеспечения, разработанная
                      Массачусетским технологическим институтом. Лицензия MIT
                      является одной из самых ранних свободных лицензий, так как
                      она относительно проста и иллюстрирует некоторые из
                      основных принципов свободного лицензирования[1]. Она
                      является разрешительной лицензией, то есть позволяет
                      программистам использовать лицензируемый код в закрытом
                      программном обеспечении при условии, что текст лицензии
                      предоставляется вместе с этим программным обеспечением.
                    </p>

                    <h4>Лицензия GNU</h4>
                    <p>
                      Лицензия на свободное программное обеспечение, созданная в
                      рамках проекта GNU в 1988 г., по которой автор передаёт
                      программное обеспечение в общественную собственность
                    </p>

                    <h4>Лицензия Apache</h4>
                    <p>
                      Данная лицензия работает, по существу, как MIT, BSD и
                      Apache License 1.1, с некоторыми дополнительными
                      преимуществами. Например, лицензирование производных работ
                      в рамках других лицензий разрешается при соблюдении
                      условий Apache License 2.0. Основные изменения: упрощение
                      использования лицензии для не ASF проектов, улучшение
                      совместимости с GPL, возможность использовать ссылку на
                      описание лицензии, вместо того, чтобы описывать её в
                      каждом файле.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside class="col-3">
            <div class="font-price">
              <!-- <h4>Индивидуальные стили от</h4> -->
              <h3>Бесплатный</h3>
              <small>Для некоммерческого использования</small>
            </div>

            <div class="aside-block">
              <div class="block-title">Дизайнер</div>
              <div
                class="font-designer flex flex-center-v flex-wrap"
                itemprop="author"
                itemscope
                itemtype="http://schema.org/Person"
              >
                <div class="photo">
                  <img
                    class="slide-image"
                    :src="font.author.photo"
                    :alt="font.author.name"
                  />
                </div>
                <div class="designer-info">
                  <strong itemprop="name">{{ font.author.name }}</strong>
                  <meta itemprop="jobTitle" content="Шрифтовой дизайнер" />
                  <small
                    >{{ font.author.fonts_count }}
                    {{
                      $declOfNum(font.author.fonts_count, [
                        'шрифт',
                        'шрифта',
                        'шрифтов',
                      ])
                    }}</small
                  >
                </div>
              </div>
            </div>

            <div class="aside-block">
              <div class="block-title">О шрифте</div>
              <p itemprop="description" v-html="font.about">
                Загрузка информации...
              </p>
            </div>
          </aside>
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
    const response = await context.app.$axios.get(
      `/api/fonts/${context.route.params.font}`
    )
    let font
    let stylesCount
    let preview
    let title, title2x
    const fontIds = []

    if (response.status) {
      //   for (let i = 0; i < response.data.styles.length; i++) {
      //     response.data.styles[i].preview = ''
      //     response.data.styles[i].bucked = false
      //   }

      //   // let bList = this.$cookies.get('bucked')
      //   // console.log(context)

      response.data.fav = false

      font = response.data
      font.fav = false
      stylesCount = font.styles.length

      // preview = await context.app.$axios.get(`/api/get-preview`, {
      //   params: {
      //     id: font.id,
      //     text: font.name,
      //     size: 50,
      //     black: true,
      //   },
      // })

      // if (preview != null) {
      //   console.log('PREVIEWS', preview.data)
      //   title = preview.data.previews.base64
      //   title2x = preview.data.previews.base642
      // }

      font.styles.sort(function (a, b) {
        // return a.weight > b.weigh
        if (a.weight > b.weight) {
          return 1
        }
        if (a.weight < b.weight) {
          return -1
        }

        return 0
      })

      for (let i = 0; i < font.styles.length; i++) {
        fontIds.push(font.styles[i].id)
      }
    }

    return {
      font,
      stylesCount,
      preview,
      title,
      title2x,
      fontIds,
    }
  },
  data() {
    return {
      title: '',
      title2x: '',
      fontIds: [],
      font: {
        fav: false,
        styles: [],
        author: {
          photo: '',
          name: '',
          fonts_count: 0,
        },
      },
      previewText: '',
      stylesCount: 0,

      glyphs:
        'ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωάΆέΈέΉίϊΐΊόΌύΰϋΎΫΏĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&<-+÷×=>®©$€£¥¢:;,.*',
      glyphsArray: [],
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 600,
        grabCursor: true,
        on: {
          slideChange() {
            console.log('change')
          },
        },
      },

      tabsList: [],
      tabs: [],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  created() {
    that = this
    console.log('id', this.$route.params.font)
    // this.$axios.get(`/api/fonts/${that.$route.params.font}`).then(response => {
    //   if (!response.data.status) {
    //     for (let i = 0; i < response.data.styles.length; i++) {
    //       response.data.styles[i].preview = ''
    //       response.data.styles[i].bucked = false
    //     }
    //
    // let bList = this.$cookies.get('bucked')
    // console.log(bList)
    // if (bList != null) {
    //   bList = bList.split(',')
    //   for (let i = 0; i < bList.length; i++) {
    //     console.log(bList[i])
    //     for (let o = 0; o < this.font.styles.length; o++) {
    //       // console.log(response.data.id + ':' + response.data.styles[o].id)
    //       if (this.font.id + ':' + this.font.styles[o].id === bList[i]) {
    //         this.font.styles[o].bucked = true
    //       }
    //     }
    //   }
    // }
    //
    //     let favList = this.$cookies.get('favs')
    //     if (favList != null) {
    //       favList = favList.split(',')
    //     }
    //
    // response.data.fav = false
    // if (favList != null) {
    //   for (let o = 0; o < favList.length; o++) {
    //     if (parseInt(favList[o]) == parseInt(response.data.id)) {
    //       response.data.fav = true
    //     }
    //   }
    // }
    //     }
    //
    //     this.font = response.data
    //     this.stylesCount = this.font.styles.length
    //
    that.$axios
      .get('/api/get-preview', {
        params: {
          id: that.font.id,
          text: that.font.name,
          size: 50,
          black: true,
        },
      })
      .then((previewData) => {
        if (previewData != null) {
          // that.title = previewData.data.base64
          that.title = previewData.data.previews.base64
          that.title2x = previewData.data.previews.base642
        }
      })
    //
    //     that.font.styles.sort(function (a, b) {
    //       // return a.weight > b.weigh
    //       if (a.weight > b.weight) {
    //         return 1
    //       }
    //       if (a.weight < b.weight) {
    //         return -1
    //       }
    //
    //       return 0
    //     })
    //
    //     that.fontIds = []
    //     for (let i = 0; i < that.font.styles.length; i++) {
    //       that.fontIds.push(that.font.styles[i].id)
    //     }
    //     that.genPreview()
    //   }
    // }).catch(error => {
    //   // this.$router.push('/404/')
    // })
    that.genPreview()
  },
  mounted() {
    this.tabsList = document.querySelectorAll('.font-tabs-list .font-tab')
    this.tabs = document.querySelectorAll(
      '.font-tabs-contents .font-tabs-content'
    )
  },
  methods: {
    slidePrev(e) {
      this.swiper.slidePrev(1000)
    },
    slideNext(e) {
      this.swiper.slideNext(1000)
    },

    genPreview: throttle(function (e) {
      this.$axios
        .get('/api/get-styles-previews', {
          params: {
            fonts: that.fontIds,
            text: that.previewText,
            size: 30,
            black: 0,
          },
        })
        .then((response) => {
          // console.log(response.data.previews);
          for (let i = 0; i < that.font.styles.length; i++) {
            for (let o = 0; o < response.data.previews.length; o++) {
              if (
                that.font.styles[i].id ===
                parseInt(response.data.previews[o].id)
              ) {
                that.$set(
                  that.font.styles[i],
                  'preview',
                  response.data.previews[o].base64
                )
                that.$set(
                  that.font.styles[i],
                  'preview2x',
                  response.data.previews[o].base642
                )
              }
            }
          }
          // console.log(previewData.data);
        })
      // }
    }, 2000),

    activeTab(index) {
      for (let i = 0; i < this.tabsList.length; i++) {
        if (i === index) {
          this.tabsList[i].classList.add('active')
        } else {
          this.tabsList[i].classList.remove('active')
        }
      }

      for (let i = 0; i < this.tabs.length; i++) {
        if (i === index) {
          this.tabs[i].style.display = 'block'
        } else {
          this.tabs[i].style.display = 'none'
        }
      }
    },

    addToFavs() {
      let favList = this.$cookies.get('favs')

      if (favList != null) {
        favList = favList.split(',')
      } else {
        favList = []
      }

      let skip = false
      for (let i = 0; i < favList.length; i++) {
        if (favList[i] === that.font.id) {
          skip = true
          favList.splice(i, 1)
          console.log('font alredy in list')
        }
      }

      if (!skip) {
        that.font.fav = true
        favList.push(that.font.id)
        that.$cookies.set('favs', favList, {
          path: '/',
        })
      } else {
        that.font.fav = false
        that.$cookies.set('favs', favList, {
          path: '/',
        })
      }
      console.log(favList)
    },

    addStyles() {
      let bList = this.$cookies.get('bucked')

      if (bList != null) {
        bList = bList.split(',')
      } else {
        bList = []
      }

      console.log(bList)

      for (let i = 0; i < this.font.styles.length; i++) {
        if (bList.includes(this.font.id + ':' + this.font.styles[i].id)) {
          console.log('contains', this.font.styles[i].id)
        } else {
          bList.push(this.font.id + ':' + this.font.styles[i].id)
          this.font.styles[i].bucked = true
        }
      }

      that.$cookies.set('bucked', bList, {
        path: '/',
      })
    },

    addToBucked(style) {
      let bList = this.$cookies.get('bucked')

      if (bList != null) {
        bList = bList.split(',')
      } else {
        bList = []
      }

      let skip = false
      for (let i = 0; i < bList.length; i++) {
        if (bList[i] === this.font.id + ':' + style.id) {
          skip = true
          bList.splice(i, 1)
          console.log('font alredy in list')
        }
      }

      if (!skip) {
        style.bucked = true
        bList.push(this.font.id + ':' + style.id)
      } else {
        style.bucked = false
      }

      that.$cookies.set('bucked', bList, {
        path: '/',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
section[data-type='font'] {
  .swiper-slide {
    width: 80%;

    img {
      width: 100%;
    }
  }
}

.aside-block {
  margin-bottom: 50px;

  p {
    font-size: em(13);
    line-height: 1.84;
  }

  .block-title {
    font-size: em(16);
    font-weight: 500;
    color: #000;
    margin-bottom: 15px;
  }
}

.font-designer {
  .designer-info {
    padding-left: 17px;
    line-height: 1.5;

    strong {
      display: block;
    }

    small {
      font-size: em(13);
    }
  }
  .photo {
    flex: 0 0 60px;
    max-width: 60px;
    height: 60px;
    background: #ddd;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.font-price {
  margin-bottom: 50px;

  h4,
  h3 {
    color: #000;
  }

  small {
    display: block;
    margin-top: 5px;
  }
}

.font-control {
  .font-favorite {
    width: 40px;
    height: 40px;
    background-color: $darkgray;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    cursor: pointer;
    transition: background-color 0.25s $cubic;

    &:hover,
    &.active {
      background-color: $red;
    }

    &:hover svg,
    &.active svg {
      transform: scale(1.1) translateZ(0);

      path {
        fill: #fff;
      }
    }

    svg {
      width: 16px;
      transform: scale(1) translateZ(0);
      transition: transform 0.25s $cubic;
    }

    svg path {
      fill: transparent;
      stroke: #ffffff;
      stroke-width: 2px;
      // transform: scale(1);
      transition: fill 0.25s $cubic;
    }
  }

  .slider-prev,
  .slider-next {
    width: 40px;
    height: 40px;
    background-color: $darkgray;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 7px 12px;
    cursor: pointer;
    transition: background-color 0.25s $cubic;

    &:hover {
      background-color: $red;
    }
  }

  .slider-prev {
    background-image: url('~assets/img/prev.svg');
    background-position: 16px center;
    margin-right: 15px;
  }

  .slider-next {
    background-image: url('~assets/img/next.svg');
    background-position: 17px center;
  }
}

.font-slider {
  margin-top: 50px;
}

.font-detail {
  width: 100%;

  .font-info {
    padding: 230px 0 100px 0;

    .font-top {
      padding-right: 50px;
    }
  }
  aside {
    padding: 230px 0 100px 50px;
    border-left: 1px solid rgba(#707070, 0.1);
  }
}

.font-tabs {
  margin-top: 100px;

  .font-tabs-list {
    font-size: em(16);
    font-weight: 500;
    color: #000;
    border-bottom: 1px solid rgba(#707070, 0.1);

    .font-tab {
      margin-right: 50px;
      cursor: pointer;
      color: $gray;
      padding: 0 0 30px;

      &.active {
        cursor: default;
        color: #000;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .font-tabs-content {
    padding: 50px 0;
  }
}

.font-tabs-content {
  &.glyphs {
    padding-top: 0;
    // padding-right: 50px;

    .glyph-cart {
      display: flex;
      flex-wrap: wrap;
      box-shadow: -1px -1px 0px 0px #eee;
      color: #000;

      .glyph {
        flex: 0 0 10%;
        max-width: 10%;
        box-shadow: 1px 1px 0px 0px #eee;
        justify-content: center;
        align-items: center;
        height: 80px;
        display: flex;
      }
    }
  }

  &.styles {
    padding-top: 0;
  }

  &.package {
    padding-top: 0;
  }

  &.text {
    padding-top: 0;
  }
}

.fonts-filter {
  // top: 112px;
  // left: 0;
  width: 100%;
  height: 85px;
  border-bottom: 1px solid rgba(#707070, 0.1);
  position: relative;
  border-left: 1px solid rgba(#707070, 0.1);

  input[type='text'] {
    border: 0;
    background: transparent;
    height: 85px;
    display: flex;
    align-items: center;
    padding: 0 45px;
    width: 100%;
  }
}

.filter-col {
  position: relative;
  border-right: 1px solid rgba(#707070, 0.1);

  &:last-child {
    border-right: 0;
  }

  &.button {
    flex: 0 0 85px;
    max-width: 85px;
    position: relative;

    &.fill {
      &:before {
        content: '';
        width: 15px;
        height: 15px;
        background: url('~assets/img/filter/fill.svg');
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7.5px;
        margin-left: -7.5px;
      }
    }

    &.view {
      &:before {
        content: '';
        width: 15px;
        height: 15px;
        background: url('~assets/img/filter/list.svg');
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7.5px;
        margin-left: -7.5px;
      }
    }
  }

  &.search {
    flex-grow: 0.5;

    input[type='text'] {
      padding-left: 75px;
    }

    &:before {
      content: '';
      width: 14px;
      height: 14px;
      background: url('~assets/img/filter/searchin.svg');
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      position: absolute;
      top: 50%;
      left: 45px;
      margin-top: -7px;
    }
  }

  &.alphabet {
    flex-grow: 5;

    input[type='text'] {
      padding-left: 70px;
    }

    &:before {
      content: '';
      width: 14px;
      height: 16px;
      background: url('~assets/img/filter/glif.svg');
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      position: absolute;
      top: 50%;
      left: 45px;
      margin-top: -7px;
    }
  }

  &.select {
    .select-current {
      height: 85px;
      display: flex;
      align-items: center;
      padding: 0 45px;

      &:after {
        content: '';
        width: 10px;
        height: 6px;
        display: block;
        background: url('~assets/img/filter/arr.svg');
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 8px;
      }
    }
  }
}

.font-package {
  border-left: 1px solid rgba(#707070, 0.1);
  border-bottom: 1px solid rgba(#707070, 0.1);

  .font-package-left {
    padding: 35px 40px;

    .font-name {
      font-size: em(16);
      margin-bottom: 30px;
    }

    .font-in-package {
      font-size: em(30);
      color: #000;

      .font-style {
        margin: 0 0 20px;
        line-height: 1.16;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .font-package-right {
    border-left: 1px solid rgba(#707070, 0.1);
    padding: 35px 40px;
    flex: 0 0 30%;
    max-width: 30%;

    .font-block {
      margin-bottom: 30px;

      small {
        font-size: em(13);
        display: block;
      }
      .value {
        font-size: em(20);
        font-weight: 500;
        color: #000;
      }
    }

    .font-package-add {
      padding: 15px;
      border-radius: 150px;
      display: flex;
      align-items: center;
      background: $darkgray;
      color: #fff;
      font-weight: 500;
      transition: background 0.25s $cubic;
      cursor: pointer;
      line-height: 1.3;

      .add-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #fff;
        margin-right: 15px;
        position: relative;
        flex: 0 0 40px;
      }

      &.added {
        background: $red;

        .add-icon:after {
          display: none;
        }
      }

      &:hover {
        background: $red;

        .add-icon:before,
        .add-icon:after {
          transform: scale(1.2) translateZ(0);
        }
      }

      .add-icon:before,
      .add-icon:after {
        content: '';
        position: absolute;
        background: #000;
        border-radius: 6px;
        top: 50%;
        left: 50%;
        transform: scale(1) translateZ(0);
        transition: transform 0.25s $cubic;
      }

      .add-icon:before {
        width: 12px;
        height: 2px;
        margin: -1px 0 0 -6px;
      }
      .add-icon:after {
        width: 2px;
        height: 12px;
        margin: -6px 0 0 -1px;
      }
    }
  }
}

.tab-text {
  padding: 40px;
  border-left: 1px solid rgba(#707070, 0.1);
  border-bottom: 1px solid rgba(#707070, 0.1);

  h4 {
    color: #000;
  }

  p + h4 {
    margin-top: 40px;
  }
}
</style>
