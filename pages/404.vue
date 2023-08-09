<template>
  <div class="page-content">

    <section data-type="inner">
      <div class="center">
        <h1>Страница не найдена</h1>

        <div class="contacts-info flex flex-just-b flex-wrap">
          <div class="col-7">
            <p>Привет!</p>
            <p>Кажется, такой страницы не существует...</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  section[data-type="inner"] {
    padding: 222px 0 100px;
  }

  .contacts-info {
    margin-top: 100px;

    p {
      font-size: em(16);
      line-height: 2.125
    }
  }

  .contacts-block {
    .title {
      font-size: em(16);
      font-weight: 500;
      color: #000;
      margin-bottom: 30px;
    }

    .contact-info {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }

      small {
        display: block;
        font-size: 13px;
      }

      .value {
        font-size: em(16);
        margin-top: 5px;
        display: inline-block;
      }
    }
  }
</style>


<div class="contacts-block">
  <div class="title">
    Дополнительные контакты
  </div>

  <div class="contact-info">
    <small>Поддержка клиентов</small>
    <a href="#" class="value">help@fontfamily.ru</a>
  </div>

  <div class="contact-info">
    <small>Поддержка разработчиков</small>
    <a href="#" class="value">making@fontfamily.ru</a>
  </div>

  <div class="contact-info">
    <small>Маркетинг и реклама</small>
    <a href="#" class="value">pr@fontfamily.ru</a>
  </div>

  <div class="contact-info">
    <small>Маркетинг и реклама</small>
    <a href="#" class="value">pr@fontfamily.ru</a>
  </div>

  <div class="contact-info">
    <small>Партнерство</small>
    <a href="#" class="value">partnership@fontfamily.ru</a>
  </div>

  <div class="contact-info">
    <small>Офис</small>
    <div class="value">
      г.Москва, Кронштадский б-р 2, оф.501
    </div>
  </div>
</div>
