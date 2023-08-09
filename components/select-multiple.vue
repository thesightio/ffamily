<template lang="html">
  <div class="custom-select-mult">
    <div class="select-list">
      <div
        v-for="item in list"
        class="option"
        :class="item.active ? 'active' : ''"
        @click="toggleIt(item, $event)"
      >
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
        name: 'Выберите из списка',
      },
      searchInput: '',
      filteredList: [],
    }
  },
  created() {
    that = this
  },
  mounted() {
    that.filteredList = that.list
  },
  methods: {
    toggleIt(item, e) {
      if (item.active) {
        item.active = false
      } else {
        item.active = true
      }
    },
    filterList(e) {
      const elem = e.target || e.srcElement
      console.log(elem.value)
    },
    showAuthors(e) {
      let elem = e.target || e.srcElement
      elem = elem.closest('.custom-select-mult').querySelector('.select-list')
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
.custom-select-mult {
  position: relative;
  z-index: 50;

  .select-list {
    // position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(112, 112, 112, 0.2);
    margin-top: 10px;
    background: #fff;
    // display: none;

    &.active {
      display: block;
    }

    // .search-input {
    //   border-bottom: 1px solid rgba(#707070, 0.2);
    //   input {
    //     border: 0;
    //   }
    // }

    .option {
      height: 56px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 0 20px;
      font-size: 1.14286em;
      outline: none;
      -webkit-appearance: none;
      background: #fff;
      cursor: pointer;

      &.active {
        color: #fff;
        background: $red;

        &:hover {
          background: $red;
        }
      }

      &:first-child {
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        border-radius: 0 0 10px 10px;
      }

      &:hover {
        background: $gray;
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
