<template lang="html">
  <header>
    <router-link to="/fonts/" class="header-grid">
      Каталог шрифтов
    </router-link>

    <router-link to="/" class="header-logo">
      <img src="~assets/img/logo.svg" alt="Главная страница" />
    </router-link>

    <div class="header-controls flex flex-center-v">
      <router-link to="/using/" class="header-bucket"></router-link>
      <div
        v-click-outside="hideSearch"
        class="search-input"
        @click="openSearch"
      >
        <div class="header-search"></div>
        <form action="/search">
          <input
            type="text"
            name="q"
            placeholder="Введите запрос для поиска..."
            @keyup="checkInject"
          />
          <input type="submit" />
        </form>
      </div>
      <router-link
        v-if="!authed"
        to="/auth/"
        class="header-smile"
      ></router-link>
      <router-link v-else to="/account/settings/" class="header-info">
        <div class="account-icon">
          {{ nameSign }}
        </div>
      </router-link>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
String.prototype.applyXSSprotection = function () {
  return this.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

let that
export default {
  data() {
    return {
      authed: false,
      nameSign: '',
      // sign: '',
    }
  },
  created() {
    that = this
    console.log('USER', this.$auth.user)

    if (this.$auth.user != null) {
      if (
        Object.keys(this.$auth.user).length === 0 &&
        this.$auth.user.constructor === Object
      ) {
        this.authed = false
      } else {
        this.authed = true
      }
      this.nameSign = this.$auth.user.name.substr(0, 1)
    }
  },
  mounted() {},
  methods: {
    openDetailMenu(e) {},
    openSearch(e) {
      document.querySelector('header .search-input').classList.add('active')
      document.querySelector('header .search-input input[type="text"]').focus()
    },
    hideSearch(e) {
      document.querySelector('header .search-input').classList.remove('active')
    },
    checkInject(e) {
      const elem = e.target || e.srcElement
      elem.value = elem.value.applyXSSprotection()
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  height: 112px;
  border-bottom: 1px solid rgba(#707070, 0.1);
  align-items: center;
  padding: 0 45px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  // background: #fff;

  .header-grid {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $gray;

    &:before {
      content: '';
      width: 17px;
      height: 17px;
      background-image: url('~assets/img/grid.svg');
      display: flex;
      margin-right: 20px;
    }
  }

  .header-logo {
    width: 149px;
    height: 37px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    margin-top: -18.5px;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  .header-controls {
    * {
      display: block;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 38.5px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  // .header-bucket {
  //   width: 16px;
  //   height: 18px;
  //   background-image: url('~assets/img/bucket.svg');
  // }
  .header-bucket {
    width: 18px;
    height: 18px;
    background-image: url('~assets/img/bucket-download.svg');
    position: relative;

    &:before {
      content: '';
      width: 46px;
      height: 46px;
      background: #e5e5e5;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -23px 0 0 -23px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s $cubic;
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .search-input {
    position: relative;
    height: 18px;

    &.active {
      input[type='text'] {
        opacity: 1;
        width: 260px;
        pointer-events: all;
        cursor: text;

        &::placeholder {
          color: rgba(#000, 0.3);
          transition: color 0.8s $cubic;
        }
      }
    }

    form {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -23px 0 0 -23px;
      width: 46px;
      height: 46px;
    }

    &:hover {
      input[type='text'] {
        opacity: 1;
      }
    }

    input[type='text'] {
      // width: 260px;
      height: 46px;
      background: #e5e5e5;
      position: absolute;
      top: 0;
      right: 0;
      border: 0;
      -webkit-appearance: none;
      top: 50%;
      margin-top: -22px;
      border-radius: 100px;
      padding: 0 20px;
      width: 46px;
      opacity: 0;
      cursor: pointer;
      transition: opacity 0.3s $cubic, width 0.3s $cubic;
      margin-right: 0;
      pointer-events: none;

      &::placeholder {
        color: rgba(#000, 0);
        transition: color 0.1s $cubic;
      }
    }

    .header-search {
      position: relative;
      z-index: 10;
      margin-right: 0;
    }

    input[type='submit'] {
      opacity: 0;
      position: absolute;
      z-index: -1;
      top: -9999px;
    }
  }
  //     <div class="search-input">
  //   <div class="header-search"></div>
  //   <form action="/search">
  //     <input type="text" placeholder="Введите запрос для поиска...">
  //     <input type="submit">
  //   </form>
  // </div>

  .header-search {
    width: 18px;
    height: 18px;
    background-image: url('~assets/img/search.svg');
  }

  .header-smile {
    width: 18px;
    height: 18px;
    background-image: url('~assets/img/smile.svg');
    position: relative;

    &:before {
      content: '';
      width: 46px;
      height: 46px;
      background: #e5e5e5;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -23px 0 0 -23px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s $cubic;
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .header-info {
    display: flex;
    align-items: center;

    .account-info {
      font-size: 13px;
      color: $gray;
      margin-right: 15px;
      // max-width: 50%;
      // line-height: 1.2;
      text-align: right;
    }

    .account-icon {
      width: 24px;
      height: 24px;
      background: $gray;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
    }
  }
}
</style>
