<template>
  <div class="page-content">
    <section data-type="inner">
      <div class="center">
        <h1>Часто-задаваемые вопросы</h1>

        <div class="question-list">
          <div
            v-for="question in questions"
            :key="question.id"
            itemscope
            itemtype="http://schema.org/Question"
            class="question-item"
            @click="toggleAnswer"
          >
            <div class="question" itemprop="name">
              {{ question.name }}
            </div>
            <div
              class="answer"
              itemprop="acceptedAnswer"
              itemscope
              itemtype="http://schema.org/Answer"
            >
              <meta itemprop="upvoteCount" content="3" />
              <div
                class="answer-inner"
                itemprop="text"
                v-html="question.body"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  async asyncData(context) {
    const response = await context.app.$axios.get(`/api/questions`)

    return {
      questions: response.data,
    }
  },
  data() {
    return {
      questions: [],
    }
  },
  created() {
    // this.$axios
    //   .get('/api/questions')
    //   .then((response) => {
    //     console.log(response)
    //     this.questions = response.data
    //   })
    //   .catch((error) => {
    //     if (error.response != null) {
    //       console.warn(error.response)
    //     }
    //   })
  },
  mounted() {},
  methods: {
    toggleAnswer(e) {
      let elem = e.target || e.srcElement

      if (!elem.classList.contains('question-item')) {
        elem = elem.closest('.question-item')
      }

      const answer = elem.querySelector('.answer')

      if (elem.classList.contains('active')) {
        elem.classList.remove('active')
        TweenLite.to(answer, 0.8, { height: 0, ease: Expo.easeOut })
      } else {
        elem.classList.add('active')
        TweenLite.set(answer, { height: 'auto' })
        TweenLite.from(answer, 0.8, { height: 0, ease: Expo.easeOut })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section[data-type='inner'] {
  padding: 222px 0 100px;
}

.question-list {
  margin-top: 100px;
  max-width: 60%;

  .question-item {
    border: 1px solid rgba(#707070, 0.2);
    border-radius: 10px;
    margin-bottom: 20px;
    width: 100%;
    cursor: pointer;
    transition: background 0.3s $cubic, border 0.3s $cubic;

    &.active {
      background: #f5f5f5;
      border-color: #f5f5f5;

      .question:after {
        transform: rotate(180deg) translateZ(0);
      }
    }

    .question {
      padding: 30px 120px 30px 30px;
      font-size: em(18);
      font-weight: 500;
      color: #000;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 35px;
        right: 35px;
        width: 14px;
        height: 14px;
        background-image: url('~assets/img/arrb.svg');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center right;
        transform: rotate(0) translateZ(0);
        transition: transform 0.3s $cubic;
      }
    }

    .answer {
      padding: 0 30px;
      // margin: 30px 0;
      height: 0;
      overflow: hidden;
      position: relative;

      .answer-inner {
        padding-bottom: 30px;
      }
    }
  }
}
</style>
