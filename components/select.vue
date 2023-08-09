<template lang="html">
  <div class="custom-select">
    <div class="current" @click="showAuthors">
      <div class="photo">
        <img v-if="current.photo != ''" :src="current.photo" alt="" />
      </div>
      {{ current.name }}
    </div>
    <div class="select-list">
      <div class="search-input">
        <input
          v-model="searchInput"
          type="text"
          name=""
          placeholder="Начните вводить для поиска"
          @keyup="filterList"
        />
      </div>
      <div
        v-for="item in fillList"
        class="option"
        @click="selectIt(item, $event)"
      >
        <div class="photo">
          <img :src="item.photo" alt="" />
        </div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
let that
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      current: {
        photo: '',
        name: 'Выберите автора',
      },
      searchInput: '',
      filteredList: [],
    }
  },
  computed: {
    fillList() {
      this.filteredList = this.list.filter(function (item) {
        return item.name.toLowerCase().includes(that.searchInput.toLowerCase())
      })
      return this.filteredList.slice(0, 5)
    },
  },
  created() {
    that = this
  },
  mounted() {
    that.filteredList = that.list
  },
  methods: {
    selectIt(item, e) {
      this.current = item

      for (let i = 0; i < that.list.length; i++) {
        if (that.list[i] == item) {
          that.list[i].active = true
        } else {
          that.list[i].active = false
        }
      }

      let elem = e.target || e.srcElement
      elem = elem.closest('.custom-select').querySelector('.select-list')
      elem.classList.remove('active')
    },
    filterList(e) {
      const elem = e.target || e.srcElement
      console.log(elem.value)
    },
    showAuthors(e) {
      let elem = e.target || e.srcElement
      elem = elem.closest('.custom-select').querySelector('.select-list')
      if (elem.classList.contains('active')) {
        elem.classList.remove('active')
      } else {
        elem.classList.add('active')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  z-index: 50;

  .current {
    height: 56px;
    border: 1px solid rgba(112, 112, 112, 0.2);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 24px 0 10px;
    font-size: 1.14286em;
    border-radius: 60px;
    cursor: pointer;

    .photo {
      width: 40px;
      height: 40px;
      position: relative;
      border-radius: 50%;
      background: #eee;
      margin-right: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .select-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 10px 35px 0px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    background: #fff;
    display: none;

    &.active {
      display: block;
    }

    .search-input {
      border-bottom: 1px solid rgba(#707070, 0.2);
      input {
        border: 0;
      }
    }

    .option {
      height: 56px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 0 24px 0 10px;
      font-size: 1.14286em;
      outline: none;
      -webkit-appearance: none;
      background: #fff;
      cursor: pointer;

      &:first-child {
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        border-radius: 0 0 10px 10px;
      }

      &:hover {
        background: $red;
        color: #fff;
      }

      .photo {
        width: 40px;
        height: 40px;
        position: relative;
        border-radius: 50%;
        background: #eee;
        margin-right: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
