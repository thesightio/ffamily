<template>
  <div class="page-content">
    <div class="fonts-filter flex">
      <div class="filter-col select" data-type="types">
        <div
          v-click-outside="hideSelect"
          class="select-current"
          @click="showSelect"
        >
          {{ curType }}
        </div>
        <div class="select-list">
          <div
            class="select-option"
            data-id="all"
            @click="activeOption('all', types, $event)"
          >
            Любая
          </div>
          <div
            v-for="type in types"
            :key="type.id"
            class="select-option"
            :class="type.active ? 'active' : ''"
            :data-id="type.id"
            @click="activeOption(type, types, $event)"
          >
            {{ type.name }}
          </div>
        </div>
      </div>
      <div class="filter-col select" data-type="languages">
        <div
          v-click-outside="hideSelect"
          class="select-current"
          @click="showSelect"
        >
          {{ curLang }}
        </div>
        <div class="select-list">
          <div
            class="select-option"
            data-id="all"
            @click="activeOption('all', types, $event)"
          >
            Любой
          </div>
          <div
            v-for="lang in languages"
            :key="lang.id"
            class="select-option"
            :class="lang.active ? 'active' : ''"
            :data-id="lang.id"
            @click="activeOption(lang, languages, $event)"
          >
            {{ lang.name }}
          </div>
        </div>
      </div>
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
      <div
        class="filter-col fill button"
        :class="isBlack ? 'reverse' : ''"
        @click="toggleColor"
      ></div>
      <div
        class="filter-col view button"
        :class="isList ? 'list' : ''"
        @click="toggleView"
      ></div>
    </div>

    <section data-type="catalogue">
      <div class="center">
        <h1>Поиск по запросу: {{ $route.query.q }}</h1>
        <div class="font-list">
          <div class="font-grid flex flex-wrap">
            <router-link
              v-for="font in fonts"
              :key="font.id"
              :to="'/fonts/' + font.id"
              class="font-item"
              :class="[isBlack ? 'reverse' : '', isList ? 'col-12' : 'col-3']"
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

        <div class="pagination flex flex-center-h">
          <div class="pagination-inner flex flex-center-v">
            <!-- <div class="page-prev">

            </div> -->
            <div class="page-status">
              <strong>{{ pCurrent + 1 }}</strong> из {{ pTotal }}
            </div>
            <!-- <div class="page-next">

            </div> -->
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
  props: {
    q: String,
  },
  async asyncData(context) {
    // Категории и языки
    const respLang = await context.app.$axios.get(`/api/languages`)
    for (let i = 0; i < respLang.data.length; i++) {
      respLang.data[i].active = false
    }
    const languages = respLang.data

    const respTypes = await context.app.$axios.get(`/api/types`)
    for (let i = 0; i < respTypes.data.length; i++) {
      respTypes.data[i].active = false
    }
    const types = respTypes.data

    return { languages, types }
  },
  data() {
    return {
      previewText: '',
      fontIds: [],

      curType: 'Категория',
      curLang: 'Язык',

      // Filters:
      isBlack: 0,
      isList: false,
      searchName: '',

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
      fonts: [],
      // Paginator:
      pCurrent: 0,
      pLimit: 4,
      pTotal: 0,
    }
  },
  created() {
    that = this

    that.updateList()

    this.$axios
      .get('/api/fonts', {
        params: {
          current: this.pCurrent,
          limit: this.pLimit,
          sort: 'popular',
          q: this.$route.query.q,
        },
      })
      .then((response) => {
        that.pTotal = response.data.pages
        let favList = this.$cookies.get('favs')
        if (favList != null) {
          favList = favList.split(',')
        }

        for (let i = 0; i < response.data.items.length; i++) {
          response.data.items[i].preview = ''
          response.data.items[i].fav = false
          if (favList != null) {
            for (let o = 0; o < favList.length; o++) {
              if (
                parseInt(favList[o]) === parseInt(response.data.items[i].id)
              ) {
                response.data.items[i].fav = true
              }
            }
          }
        }
        console.log('created', response.data.items)
        that.fonts = response.data.items
        console.log(that.fonts)

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
  mounted() {
    console.log('route', this.$route)
    window.addEventListener('scroll', this.scrollHandle)
  },
  methods: {
    updateList: throttle(function (e) {
      let lang = 0
      let type = 0
      for (let i = 0; i < that.languages.length; i++) {
        if (that.languages[i].active) {
          console.log(that.languages[i])
          lang = that.languages[i].id
        }
      }
      for (let i = 0; i < that.types.length; i++) {
        if (that.types[i].active) {
          type = that.types[i].id
        }
      }

      this.$axios
        .get('/api/fonts', {
          params: {
            current: this.pCurrent,
            limit: this.pLimit,
            sort: 'popular',
            q: that.searchName,
            lang,
            type,
            page: that.pCurrent,
          },
        })
        .then((response) => {
          that.pCurrent = 0
          that.pTotal = response.data.pages
          let favList = this.$cookies.get('favs')
          if (favList != null) {
            favList = favList.split(',')
          }

          for (let i = 0; i < response.data.items.length; i++) {
            response.data.items[i].preview = ''
            response.data.items[i].fav = false
            if (favList != null) {
              for (let o = 0; o < favList.length; o++) {
                if (
                  parseInt(favList[o]) === parseInt(response.data.items[i].id)
                ) {
                  response.data.items[i].fav = true
                }
              }
            }
          }
          console.log('created', response.data.items)
          that.fonts = response.data.items
          console.log(that.fonts)

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
    }, 1000),
    showSelect(e) {
      let elem = e.target || e.srcElement

      if (!elem.classList.contains('select')) {
        elem = elem.closest('.select')
      }
      elem.classList.add('active')
      elem.querySelector('.select-list').style.display = 'block'
    },
    hideSelect(e) {
      let elem = e.target || e.srcElement
      if (!elem.classList.contains('select')) {
        elem = elem.closest('.select')
      }

      const selects = document.querySelectorAll('.filter-col.select')
      for (let i = 0; i < selects.length; i++) {
        if (selects[i] !== elem) {
          selects[i].classList.remove('active')
          selects[i].querySelector('.select-list').style.display = 'none'
        }
      }
      // console.log('outside click')
      //
      //
    },
    scrollHandle: throttle(function (e) {
      const top = window.pageYOffset
      const height = document.body.clientHeight - window.innerHeight
      const percent = top / height

      if (percent > 0.7 && this.pCurrent < this.pTotal - 1) {
        this.pCurrent += 1

        this.$axios
          .get('/api/fonts', {
            params: {
              current: this.pCurrent,
              limit: this.pLimit,
              sort: 'popular',
            },
          })
          .then((response) => {
            that.pTotal = response.data.pages
            let favList = this.$cookies.get('favs')
            if (favList != null) {
              favList = favList.split(',')
            }

            for (let i = 0; i < response.data.items.length; i++) {
              response.data.items[i].preview = ''
              response.data.items[i].fav = false
              if (favList != null) {
                for (let o = 0; o < favList.length; o++) {
                  if (
                    parseInt(favList[o]) === parseInt(response.data.items[i].id)
                  ) {
                    response.data.items[i].fav = true
                  }
                }
              }
            }

            console.log('concat', that.fonts, response.data.items)
            that.fonts = that.fonts.concat(response.data.items)

            that.fontIds = []
            for (let i = 0; i < that.fonts.length; i++) {
              that.fontIds.push(that.fonts[i].id)
            }
            that.genPreview()
          })
      }
    }, 1000),
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
      // }
    }, 1000),

    searchFont: throttle(function (e) {
      that.filterFonts()
    }, 1000),

    filterFonts: throttle(function (e) {
      const params = {
        q: that.searchName,
        lang: 0,
        type: 0,
        page: that.pCurrent,
      }

      let lang = 0
      let type = 0
      for (let i = 0; i < that.languages.length; i++) {
        if (that.languages[i].active) {
          console.log(that.languages[i])
          lang = that.languages[i].id
        }
      }
      for (let i = 0; i < that.types.length; i++) {
        if (that.types[i].active) {
          type = that.types[i].id
        }
      }

      params.lang = lang
      params.type = type

      console.log('PARAMS', params)

      that.updateList()
    }, 1000),

    toggleColor(e) {
      for (let i = 0; i < that.fonts.length; i++) {
        that.fonts[i].preview = ''
      }

      if (that.isBlack) {
        that.isBlack = 0
      } else {
        that.isBlack = 1
      }
      that.genPreview()
    },

    toggleView(e) {
      if (that.isList) {
        that.isList = false
      } else {
        that.isList = true
      }
    },

    activeOption(option, options, e) {
      // that.hideSelect(event)
      for (let i = 0; i < options.length; i++) {
        if (option === options[i]) {
          options[i].active = true
          // that.curType
        } else {
          options[i].active = false
        }
      }

      let elem = e.target || e.srcElement
      if (!elem.classList.contains('select')) {
        elem = elem.closest('.select')
      }

      const type = elem.dataset.type

      if (type === 'languages') {
        that.curLang = option === 'all' ? 'Язык' : option.name
      } else {
        that.curType = option === 'all' ? 'Категория' : option.name
      }

      if (option === 'all') {
        elem.classList.remove('has-filter')
      } else {
        elem.classList.add('has-filter')
      }

      elem.querySelector('.select-list').style.display = 'none'

      that.filterFonts()

      // let selects = document.querySelectorAll('.filter-col.select')
      // for (let i = 0; i < selects.length; i++) {
      //   if (selects[i] != elem) {
      //     selects[i].classList.remove('active')
      //     selects[i].querySelector('.select-list').style.display = 'none'
      //   }
      // }
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
.fonts-filter {
  top: 112px;
  left: 0;
  width: 100%;
  height: 85px;
  border-bottom: 1px solid rgba(#707070, 0.1);
  position: fixed;
  z-index: 10;

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

.font-list {
  width: 100%;
  margin-top: 40px;
}

section[data-type='catalogue'] {
  padding: 318px 0 100px;
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
    cursor: pointer;

    &.reverse {
      background: $gray;
      &.fill {
        &:before {
          background: url('~assets/img/filter/fill-reverse.svg');
        }
      }
    }

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
        background-image: url('~assets/img/filter/list.svg');
        background-repeat: no-repeat;
        background-position: center;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7.5px;
        margin-left: -7.5px;
      }

      &.list {
        &:before {
          background-image: url('~assets/img/filter/grid.svg');
        }
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

  // <div class="filter-col select">
  //   <div class="select-current">
  //     Категория
  //   </div>
  //   <div class="select-list">
  //     <div class="select-option" v-for="type in types" :data-id="type.id">
  //       {{type.name}}
  //     </div>
  //   </div>
  // </div>

  &.select {
    .select-current {
      height: 85px;
      display: flex;
      align-items: center;
      padding: 0 45px;
      position: relative;
      cursor: pointer;

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 2px;
        background: #e73626;
        border-radius: 50%;
        transition: transform 0.5s $cubic;
        transform: scaleX(0);
        transform-origin: left;
      }

      &:after {
        content: '';
        width: 10px;
        height: 6px;
        display: block;
        background: url('~assets/img/filter/arr.svg');
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 8px;
        transform: rotate(0deg);
        will-change: transform;
        transition: transform 0.3s $cubic;
      }
    }

    &.has-filter {
      .select-current {
        &:before {
          transform: scaleX(1);
        }
      }
    }

    &.active {
      .select-current {
        &:after {
          transform: rotate(180deg);
        }
      }
    }

    .select-list {
      position: absolute;
      top: 100%;
      width: 100%;
      left: 0;
      background: $darkgray;
      color: #fff;
      padding: 8px;
      box-shadow: 0px 20px 40px 0px rgba(darken($darkgray, 30), 0.3);
      border-radius: 6px;
      margin-top: 5px;
      max-height: 200px;
      height: auto;
      overflow: scroll;
      display: none;
      // border: 1px solid #eee;

      &::-webkit-scrollbar {
        width: 2px;
        height: 0;
      }

      &::-webkit-scrollbar-track {
        width: 2px;
        background: rgba(#fff, 0.2);
        margin: 5px 0;
      }

      &::-webkit-scrollbar-thumb {
        width: 2px;
        background: #fff;
      }

      .select-option {
        // height: 50px;
        display: flex;
        align-items: center;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;

        &.active {
          background: lighten($darkgray, 10);
        }

        &:hover {
          background: lighten($darkgray, 5);
        }
      }
    }
  }
}
</style>
