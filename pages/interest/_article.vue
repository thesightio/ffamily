<template>
  <div class="page-content">
    <section
      data-type="post"
      itemscope
      itemtype="http://schema.org/NewsArticle"
    >
      <meta itemprop="genre" content="Полезные статьи" />
      <div class="center">
        <h1 class="text-center" itemprop="headline">{{ article.name }}</h1>
        <div class="post-info text-center flex flex-center-h">
          <div class="info-item" itemprop="author">От {{ article.author }}</div>
          <div class="info-item">
            {{ $moment(article.created_at).format('LL') }}
          </div>
        </div>

        <div v-if="article.preview != ''" class="post-image">
          <div class="image-wrapper">
            <img
              :src="$axios.defaults.baseURL + article.preview"
              :alt="article.name"
            />
          </div>
        </div>

        <div class="post-typo flex flex-center-h">
          <div class="social-col">
            <div class="static social-list">
              <a
                :href="
                  'https://vk.com/share.php?url=' +
                  curRoute +
                  '&title=' +
                  article.name +
                  '&image=' +
                  baseUrl +
                  article.preview +
                  '&description=' +
                  shareText
                "
                target="_blank"
                rel="nofollow"
                class="vk"
              ></a>
              <a
                :href="'http://www.facebook.com/plugins/like.php?u=' + curRoute"
                target="_blank"
                rel="nofollow"
                class="fb"
              ></a>
              <a
                :href="
                  'http://twitter.com/share?url=' +
                  curRoute +
                  '&title=' +
                  article.name +
                  '&text=' +
                  shareText
                "
                target="_blank"
                rel="nofollow"
                class="tw"
              ></a>
              <!-- <a href="#"></a> -->
            </div>
          </div>
          <div
            class="post-content"
            itemprop="description"
            v-html="article.body"
          ></div>
          <div class="post-control">
            <div class="return-button" @click="returnTop">
              <div class="return-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
// import ScrollToPlugin from 'gsap/ScrollToPlugin'

let that
export default {
  async asyncData(context) {
    const response = await context.app.$axios.get(
      `/api/article/${context.route.params.article}`
    )
    const article = response.data

    return { article }
  },
  data() {
    return {
      article: [],
      curRoute: '',
      baseUrl: '',
      shareText: '',
      tlReturn: new TimelineMax({ paused: true }),
    }
  },
  created() {
    that = this
    console.log('id', this.$route.params.article)
    this.$axios
      .get(`/api/article/${that.$route.params.article}`)
      .then((response) => {
        if (!response.data.status) {
          this.article = response.data
          that.shareText =
            this.article.name +
            ' — ' +
            that.stripHtml(this.article.body).slice(0, 50) +
            '...'
          console.log(this.article)
        } else {
          this.$router.push('/404/')
        }
      })
      .catch((error) => {
        this.$router.push('/404/')
      })
  },
  mounted() {
    console.log('current', window.location)
    this.curRoute = window.location.href
    this.baseUrl = window.location.origin

    window.addEventListener('scroll', this.scrollHandle)
    this.tlReturn
      .to('.return-button', 1, { opacity: 0 })
      .to('.return-button', 1, { opacity: 1 }, 3)
  },
  methods: {
    scrollHandle(e) {
      const top = window.pageYOffset
      const height = document.body.clientHeight - window.innerHeight
      const percent = top / height
      const progress = percent * 1.5

      that.tlReturn.progress(progress > 1 ? 1 : progress)
      // TweenMax.set('.return-button', {scale: (percent*2) > 1 ? 1 : percent*2})
      // // if(percent > 0.3) {
      // //   TweenMax.to('.return-button', 1, {scale: 1, ease: Expo.easeInOut, overwrite: 1, force3D: true});
      // // } else {
      // //   TweenMax.to('.return-button', 1, {scale: 0, ease: Expo.easeInOut, force3D: true});
      // // }
    },
    stripHtml(html) {
      const tmp = document.createElement('div')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    },
    returnTop(e) {
      TweenLite.to(window, 1, { scrollTo: 0, ease: Expo.easeInOut })
    },
  },
}
</script>

<style lang="scss" scoped>
section[data-type='post'] {
  padding: 222px 0 100px;

  .post-info {
    font-size: em(13);
    color: $gray;
    margin-top: 35px;

    .info-item {
      display: flex;
      align-items: center;
      line-height: 1;

      &:after {
        content: '';
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: $gray;
        margin: 0 20px;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  .post-image {
    .image-wrapper {
      // max-width: 1100px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      margin: 50px auto 70px;
      height: 680px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .post-typo {
    position: flex;
    justify-content: space-between;

    .post-content {
      flex: 0 0 100%;
      max-width: 800px;
    }

    .social-col {
      // position: absolute;
      // top: 0;
      // left: 0;

      .static {
        position: sticky;
        top: 200px;
        left: 0;
      }
    }

    .post-control {
      // position: absolute;
      // top: 0;
      // right: 0;

      .return-button {
        display: flex;
        align-items: center;
        position: sticky;
        top: 200px;
        // transform: scale(0);
        opacity: 0;
        will-change: opacity;
        // transform: rotate(-90deg);

        .return-icon {
          width: 40px;
          height: 40px;
          background-color: $darkgray;
          background-image: url('~assets/img/social/back.svg');
          border-radius: 50%;
          transition: background-color 0.3s $cubic;
          cursor: pointer;

          &:hover {
            background-color: $red;
          }
          // margin-right: 15px;
        }
      }
    }

    p {
      font-size: em(16);
      line-height: 2.125;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      color: #000;
    }

    h2 {
      margin-bottom: 10px;
      font-size: em(36);
    }
    h3 {
      margin-bottom: 10px;
      font-size: em(30);
    }
    h4 {
      margin-bottom: 10px;
      font-size: em(24);
    }

    // Typo
    p + h3 {
      margin-top: 40px;
    }
    p + h4 {
      margin-top: 40px;
    }
  }
}
</style>
