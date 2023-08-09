// import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - FontFamily.ru',
    title: 'FontFamily.ru',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  store: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  loading: {
    color: '#E73626',
    height: '2px'
  },

  transition: {
    mode: 'in-out',
    css: false,
    leave (el, done) {
      done()
    },
    enter (el, done) {
      done()
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/globals.js',
    { src: '~/plugins/swiper.js', ssr: false },
    // { src: '~/plugins/editor.js', ssr: false },
    { src: '~/plugins/dropzone.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', {
      fix: true
    }],
    '@nuxtjs/moment'
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],

  moment: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'fftoken',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          authFetch: true
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get' }
        }
      }
      // cookie: {
      //   cookie: {
      //     name: 'FF-TOKEN'
      //   },
      // }
      // 'laravelPassport': {
      //   provider: 'laravel/passport',
      //   endpoints: {
      //     userInfo: 'http://127.0.0.1:8000/api/user'
      //   },
      //   url: 'http://127.0.0.1:8000',
      //   clientId: '1',
      //   clientSecret: '87cR8LMyePObi8bttx9Qrax8YBl5p76anlJAe1Wz'
      // },
    },

    cookie: {
      prefix: 'ffauth.',
      options: {
        path: '/'
      }
    },

    redirect: {
      login: '/auth',
      logout: '/',
      callback: '/auth',
      home: '/'
    }
  },

  styleResources: { 
    scss: './assets/scss/mixins/*.scss',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3,
  //       },
  //     },
  //   },
  // },

  axios: {
    browserBaseURL: 'http://127.0.0.1:8000',
    baseURL: 'http://127.0.0.1:8000' // api url 'http://127.0.0.1:8000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [
      'vuetify', // ~/plugins/ and .js
      'gsap',
      'highlight.js',
      'lodash'
    ],
    transpile: ['gsap'],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
   extend(config, ctx) {
    //  if(ctx.isDev && ctx.isClient) {
    //    config.module.rules.push({
    //      enforce: 'pre',
    //      test: /\.(js|vue)$/,
    //      loader: 'eslint-loader',
    //      exclude: /(node_modules)/,
    //      options: {
    //        fix: true
    //      }
    //    })
    //  }
   }
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     // config.module.rules.push({
    //     //   enforce: 'pre',
    //     //   test: /\.(js|vue)$/,
    //     //   loader: 'eslint-loader',
    //     //   exclude: /(node_modules)/
    //     // })
    //   }
    // }
  }
}
