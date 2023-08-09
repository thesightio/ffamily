<template lang="html">
  <footer>
    <div class="center">
      <div class="footer-top flex flex-just-b flex-wrap">
        <div class="col-4 footer-desc">
          <p>
            Шрифты, представленные на этом веб-сайте являются собственностью их
            авторов и являются бесплатными, условно-бесплатными,
            демонстрационными версиями или общественным достоянием.<br />
            Если у шрифта не указана лицензия - это не значит что он является
            бесплатным, у нас просто не хватает информации.
            <!-- FontFamily — сервис, созданный на чистом энтузиазме.
            Мы собрали множество отличных ресурсов для создания первоклассных дизайнов компаниями и независимыми разработчиками. Поддержите нас. -->
          </p>
        </div>
        <div class="col-6 flex flex-just-b footer-menu-list">
          <ul class="footer-menu">
            <li class="main">Информация</li>
            <li><router-link to="/licenses/">Виды лицензий</router-link></li>
            <li>
              <router-link to="/faq/">Часто задаваемые вопросы</router-link>
            </li>
          </ul>
          <ul class="footer-menu">
            <li class="main">Ресурсы</li>
            <li><router-link to="/fonts/">Каталог шрифтов</router-link></li>
            <li><router-link to="/interest/">Интересное</router-link></li>
          </ul>
          <ul class="footer-menu">
            <li class="main">Сервис</li>
            <li><router-link to="/contacts/">Контакты</router-link></li>
            <li><router-link to="/policy/">Политика и правила</router-link></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom flex flex-just-b flex-wrap flex-center-v">
        <div class="col-6 flex">
          Мы в соц.сетях
          <div class="social flex">
            <a class="vk" target="_blank" rel="nofollow" href="#"></a>
            <a class="inst" target="_blank" rel="nofollow" href="#"></a>
          </div>
        </div>
        <div class="col-6 text-right">
          © {{ new Date().getFullYear() }} FontFamily. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid rgba(#707070, 0.1);
  font-size: em(13);

  .footer-desc {
    padding-right: 50px;
    line-height: 1.84;
  }

  .footer-top {
    padding: 70px 0;
  }
  .footer-bottom {
    border-top: 1px solid rgba(#707070, 0.1);
    height: 140px;

    .social {
      margin-left: 15px;

      a {
        width: 26px;
        height: 26px;
        background-color: $gray;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 8px;
        display: flex;
        border-radius: 50%;
        transition: background-color 0.3s $cubic;

        &:hover {
          background-color: lighten($gray, 15);
        }

        &.vk {
          background-image: url('~assets/img/vk.svg');
        }

        &.inst {
          background-image: url('~assets/img/inst.svg');
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .footer-menu-list {
    padding-left: 50px;
  }

  a {
    color: $gray;

    &:hover {
      color: lighten($gray, 10);
    }
  }

  .footer-menu {
    li {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }

      &.main {
        color: #000;
        font-weight: 500;
      }
    }
  }
}
</style>
