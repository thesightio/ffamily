<template>
  <div class="page-content">
    <section data-type="using">
      <div class="center">
        <h1>Используемые шрифты</h1>
        <div class="using-desc">
          <div class="code-grid flex flex-just-b">
            <div class="code-item col-6">
              <p>
                Внимание! Вы можете использовать выбранные шрифты согласно
                лицензиям, предоставленным на странице этих шрифтов.
              </p>
              <!-- <p>Для использования выбранных шрифтов на веб-сайте вы можете использовать CDN FontFamily или подключить их вручную используя css-правило @font-face.</p> -->
            </div>
            <div v-if="styles.length > 0" class="code-item col-6 text-right">
              <a
                :href="'/download/fonts?fonts=' + downloadList"
                target="_blank"
                class="btn"
                style="display: inline-flex"
                >Скачать все</a
              >
            </div>
          </div>
        </div>
        <div class="font-list">
          <div class="font-grid flex flex-wrap">
            <div
              v-for="font in styles"
              v-if="styles.length > 0"
              class="font-item col-3"
            >
              <div class="font-inner">
                <router-link
                  :to="'/fonts/' + font.font_id"
                  class="font-preview loaded"
                >
                  <img
                    :src="'data:image/png;base64,' + font.previews.base64"
                    :srcset="
                      'data:image/png;base64,' + font.previews.base642 + ' 2x'
                    "
                    alt=""
                  />
                </router-link>
                <div class="font-control flex flex-just-b">
                  <div class="font-info" @click="goToFont(font)">
                    <div class="name">
                      {{ font.name }}
                    </div>
                    <small>Жирность {{ font.weight }}</small>
                  </div>
                  <div class="font-controls flex">
                    <div class="font-remove" @click="removeFont(font)"></div>
                    <a
                      class="font-download"
                      :href="'/download/font/' + font.id"
                      target="_blank"
                      rel="nofollow"
                    >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section data-type="usageinst">
      <div class="center">
        <h1>Использование на веб-сайтах</h1>
        <div class="using-tabs">
          <div class="font-tabs-list flex">
            <div class="font-tab active" @click="activeTab(2)">
              Кастомизация
            </div>
            <div class="font-tab" @click="activeTab(0)">
              Вставка
            </div>
            <div class="font-tab" @click="activeTab(1)">
              Плагин
            </div>
            <div class="font-tab" @click="activeTab(3)">
              Полезное
            </div>
          </div>
          <div class="font-tabs-contents">
            <div class="font-tabs-content" style="display: block">
              <div class="col-6">
                Что-бы внедрить выбранные шрифты на веб-страницу, воспользуйтесь одним из предложенных ниже способов. Однако мы не рекомендуем использовать данные методы на production-проекте.<br>
                Рекомендуемый способ вставки шрифта описан на вкладке "Плагин".
              </div>

              <div class="code-grid flex flex-just-b">
                <div class="code-item col-6">
                  <div class="code-inner highlight">
                    <h4>В HEAD документа</h4>
                    &lt;link href="https://fonts.googleapis.com/css?family=Chilanka|Manjari|Roboto&display=swap" rel="stylesheet"&gt;
                  </div>
                </div>
                <div class="code-item col-6">
                  <div class="code-inner highlight">
                    <h4>Непосредственно в CSS</h4>
                    &lt;style&gt;<br>@import url('https://fonts.googleapis.com/css?family=Chilanka|Manjari|Roboto&display=swap');<br>&lt;/style&gt;
                  </div>
                </div>
              </div>

              <h4>Определение стиля</h4>
              <p>После того, как вы воспользуетесь одним из методов вставки шрифта — вы можете объявить нужный шрифт в CSS-стилях</p>
              <div class="code-grid flex flex-just-b">
                <div class="code-item col-6">
                  <div class="code-inner highlight">
                    font-family: 'Roboto', sans-serif;<br>
                    font-family: 'Roboto', sans-serif;<br>
                    font-family: 'Roboto', sans-serif;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import { throttle } from 'lodash'
import hljs from 'highlight.js'

let that
export default {
  data() {
    return {
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
      styles: [],
      fonts: [],
      downloadList: '',
    }
  },
  created() {
    that = this
  },
  mounted() {
    let bList = this.$cookies.get('bucked')

    if (bList != null) {
      bList = bList.split(',')
    } else {
      bList = []
    }

    this.downloadList = JSON.stringify(bList)

    const sendList = []
    for (let i = 0; i < bList.length; i++) {
      // sendList.push(JSON.stringify(bList[i].split(':')))
      const style = bList[i].split(':')
      sendList.push({ id: style[0], style: style[1] })
    }
    console.log('Bucket', sendList)

    this.$axios
      .get('/api/get-styles', {
        params: {
          fonts: sendList,
        },
      })
      .then((response) => {
        if (response.data.status) {
          this.styles = response.data.styles
        }
        // console.log(response)
      })

    document.querySelectorAll('.highlight').forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    activeTab(index) {},

    downloadAll(e) {
      e.preventDefault()

      let bList = this.$cookies.get('bucked')

      if (bList != null) {
        bList = bList.split(',')
      } else {
        bList = []
      }

      const prepareSend = []
    },

    removeFont(font) {
      let bList = this.$cookies.get('bucked')

      if (bList != null) {
        bList = bList.split(',')
      } else {
        bList = []
      }

      let skip = false
      for (let i = 0; i < bList.length; i++) {
        if (bList[i] == font.font_id + ':' + font.id) {
          skip = true
          bList.splice(i, 1)
          this.styles.splice(i, 1)
        }
      }

      this.downloadList = JSON.stringify(bList)

      that.$cookies.set('bucked', bList, {
        path: '/',
      })
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
              if (that.fonts[i].id == response.data.previews[o].id) {
                that.fonts[i].preview = response.data.previews[o].base64
                that.fonts[i].preview2x = response.data.previews[o].base642
              }
            }
          }
          console.log(previewData.data)
        })
        .catch((error) => {})
    }, 1000),
  },
}
</script>

<style lang="scss" scoped>
.font-list {
  width: 100%;
}

.using-desc {
  margin-top: 40px;
}

section[data-type='usageinst'] {
  padding: 100px 0;
  border-top: 1px solid rgba(#707070, 0.1);
}

section[data-type='using'] {
  padding: 222px 0 100px;

  .font-list {
    margin-top: 70px;
  }
}

.using-tabs {
  margin-top: 70px;

  .font-tabs-list {
    font-size: em(16);
    font-weight: 500;
    color: #000;

    .font-tab {
      margin-right: 50px;
      cursor: pointer;
      color: $gray;
      padding: 0 0 30px;
      position: relative;

      &:after,
      &:before {
        content: '';
        display: block;
        height: 2px;
        position: absolute;
        bottom: 10px;
      }

      &:after {
        background: $red;
        width: 0%;
        transition: width 0.5s $cubic;
      }

      &:before {
        background: rgba($gray, 0.2);
        width: 100%;
      }

      &.active {
        cursor: default;
        color: #000;

        &:after {
          width: 100%;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .font-tabs-content {
    padding: 50px 0;

    h4 {
      color: #000;
      margin-bottom: 15px;
    }
  }
}

.code-grid {
  margin: 40px -20px 0;

  & + h4,
  & + p {
    margin-top: 70px;
  }

  .code-item {
    padding: 0 20px;

    h4 {
      font-size: em(14);
      color: #000;
    }

    .code-inner {
      background: #f5f5f5;
      color: #000;
      padding: 30px 40px;
      height: 100%;
      border-radius: 10px;
    }
  }
}
</style>
