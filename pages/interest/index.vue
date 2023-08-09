<template>
  <div class="page-content">
    <section data-type="blog">
      <div class="center">
        <h1>Интересное</h1>

        <div class="article-list flex flex-wrap">
          <div
            v-for="article in articles"
            :key="article.id"
            class="article-item col-4"
            itemscope
            itemtype="http://schema.org/NewsArticle"
          >
            <meta itemprop="genre" content="Полезные статьи" />
            <router-link
              :to="'/interest/' + article.code"
              class="article-inner"
            >
              <div class="article-photo">
                <img :src="$axios.defaults.baseURL + article.preview" alt="" />
              </div>
              <div class="article-info">
                <h4 class="subst" itemprop="headline">{{ article.name }}</h4>
                <div class="article-info-list flex">
                  <div class="article-author" itemprop="author">
                    От {{ article.author }}
                  </div>
                  <div class="article-date">
                    {{ $moment(article.created_at).format('LL') }}
                  </div>
                </div>
              </div>
              <meta itemprop="description" :content="article.name" />
            </router-link>
          </div>
        </div>

        <div class="pagination flex flex-center-h">
          <div class="pagination-inner flex flex-center-v">
            <div class="page-prev"></div>
            <div class="page-status"><strong>3</strong> из 20</div>
            <div class="page-next"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const response = await context.app.$axios.get(`/api/articles`, {
      params: {
        limit: 10,
        current: 0,
      },
    })

    return {
      articles: response.data.items,
    }
  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    // this.$axios
    //   .get('/api/articles', {
    //     params: {
    //       limit: 10,
    //       current: 0,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     this.articles = response.data.items
    //     console.log(this.articles)
    //   })
    //   .catch((error) => {
    //     if (error.response != null) {
    //       console.warn(error.response)
    //     }
    //   })
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
section[data-type='blog'] {
  padding: 222px 0 100px;

  .article-list {
    // margin-top: 70px;
    margin: 70px -30px 0;

    .article-item {
      margin-bottom: 60px;

      .article-inner {
        margin: 0 30px;
      }
    }
  }

  .pagination {
    margin-top: 40px;
  }
}
</style>
