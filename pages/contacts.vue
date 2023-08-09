<template>
  <!-- eslint-disable -->
  <div class="page-content">

    <section data-type="inner">
      <div class="center">
        <h1>Контакты</h1>

        <div class="contacts-info flex flex-just-b flex-wrap">
          <div class="col-7">
            <p>Привет!</p>
            <p>Возникли проблемы с использованием FontFamily? Большинство проблем можно решить просто прочитав Часто задаваемые вопросы, поэтому перед тем, как задать интересующий вопрос - проверьте, может мы уже на него ответили.</p>
            <p>Если после этого у вас все же остались нерешенные проблемы — напишите нам. Пожалуйста, опишите вашу проблему максимально подробно и отправьте на электронную почту сервиса. Это гарантирует, что мы оперативно ответим вам и поможем разрешить спорную ситуацию.</p>
            <p>Данный проект поддерживается на чистом энтузиазме. Нам нравится то, что мы делаем, и если он оказался вам полезен, пожалуйста, поддержите нас.</p>
            <p>С уважением, ваша команда FontFamily! Спасибо!</p>
            <p><a href="mailto:help@fontfamily.ru">help@fontfamily.ru</a></p>
          </div>
          <aside class="col-4" itemscope itemtype="http://schema.org/Organization">
            <div class="contacts-block">
              <div class="title">
                Дополнительные контакты
              </div>

              <div class="contact-info">
                <small>Поддержка клиентов</small>
                <a href="mailto:help@fontfamily.ru" target="_blank" rel="nofollow" class="value" itemprop="email">help@fontfamily.ru</a>
              </div>

              <div class="contact-info">
                <small>Право использование</small>
                <a href="mailto:making@fontfamily.ru" target="_blank" rel="nofollow" class="value" itemprop="email">making@fontfamily.ru</a>
              </div>

              <div class="contact-info">
                <small>Маркетинг и реклама</small>
                <a href="mailto:pr@fontfamily.ru" target="_blank" rel="nofollow" class="value" itemprop="email">pr@fontfamily.ru</a>
              </div>

              <div class="contact-info">
                <small>Партнерство</small>
                <a href="mailto:pr@fontfamily.ru" target="_blank" rel="nofollow" class="value" itemprop="email">pr@fontfamily.ru</a>
              </div>

              <!-- <div class="contact-info" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <small>Офис</small>
                <div class="value">
                  <span itemprop="addressLocality">г.Москва</span>, <span itemprop="streetAddress">Кронштадский б-р 2, оф.501</span>. <span itemprop="postalCode">237034</span>
                </div>
              </div> -->
            </div>
          </aside>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
    }
  },
  methods: {
    toggleAnswer (e) {
      let elem = e.target || e.srcElement

      if (!elem.classList.contains('question-item')) {
        elem = elem.closest('.question-item')
      }

      const answer = elem.querySelector('.answer')

      if (elem.classList.contains('active')) {
        elem.classList.remove('active')
        TweenLite.to(answer, 0.8, {height: 0, ease: Expo.easeOut})
      } else {
        elem.classList.add('active')
        TweenLite.set(answer, {height: 'auto'})
        TweenLite.from(answer, 0.8, {height: 0, ease: Expo.easeOut})
      }
    }
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
