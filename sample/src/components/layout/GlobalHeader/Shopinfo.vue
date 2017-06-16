<template>
  <li :class="{'common-header-parts': true, 'common-header-shopinfo': true, 'open': show}" v-click-outside="blur">
    <a href="javascript:void(0);" @click.prevent="toggle">
      <p class="common-header-shopname">ビギナーエントリー 店舗　鹿 not</p>
      <p class="common-header-shopid">[i924]</p>
      <span class="common-header-arrow"></span>
    </a>
    <ul class="shopinfo-menu">
      <li>
        <a href="/Pro/tool/"><span class="menu-setting-icon"></span>設定・アカウント情報</a>
      </li>
      <li v-if="isProMembers">
        <a href="/Pro/member/mypage/"><span class="menu-info-icon"></span>PRO会員情報</a>
      </li>
      <li class="menu-service-head">
        よく使うサービス
      </li>
      <li class="menu-service-object">
        <a href="/rsv/">予約管理(WEB予約システム)</a>
      </li>
      <li class="menu-service-object">
        <a href="/rsv/">レストラン編集</a>
      </li>
      <li class="footer">
        <a href="/ShopAdmin/misc/logout.php" class="btn-logout">ログアウト</a>
      </li>
    </ul>
  </li>
</template>

<script>
import $ from '../../ui/utils/NodeList.js'
import ClickOutside from '../../ui/directives/ClickOutside.js'

export default {
  directives: {
    ClickOutside
  },
  name: 'shop-info',
  props: ['isProMembers'],
  watch: {
    show (val) { this.$emit('input', val) },
    value (val) { this.show = val }
  },
  methods: {
    blur () { this.show = false }
  },
  methods: {
    blur () { this.show = false },
    toggle () {
      if (!this.disabled) { this.show = !this.show }
    }
  },
  data () {
    var show = this.value
    return {show}
  },
  mounted () {
    $('ul', this.$el).on('click', 'li>a', e => { this.show = false })
  },
  beforeDestroy () {
    $('ul', this.$el).off()
  }
}
</script>

<style scoped>
a, a:hover{
  text-decoration: none;
}
li.common-header-parts {
    float: left;
}

.common-header-parts {
    line-height: 48px;
    border-left: 1px solid #777;
    font-size: 12px;
}

.common-header-parts > a {
  color: #fff;
  display: block;
  padding: 0 16px;
}

.common-header-shopname {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.common-header-shopinfo {
    max-width: 520px;
    vertical-align: middle;
    font-size: 11px;
    line-height: 20px;
    text-align: right;
    position: relative;
}
.common-header-shopinfo a {
  padding: 4px 32px 4px 16px;
}

.common-header-arrow {
  background-image: url(/static/bootstrap/img/sprite-frame.png);
  background-position: -44px -37px;
  width: 8px;
  height: 6px;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
  margin: auto;
}

.shopinfo-menu {
  width: 380px;
  position: fixed;
  display: none;
  top: 48px;
  right: 0;
  z-index: 1200;
  background-color: #fff;
  border: 1px solid #ddd;
  text-align: left;
}

.shopinfo-menu:after {
  content: "";
  position: absolute;
  top: -8px;
  left: 85%;
  margin-left: -10px;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 10px 15px;
  border-color: transparent transparent #fff transparent;
  z-index: 1;
}

.open > .shopinfo-menu {
  display: block;
}

.shopinfo-menu li{
  border-top: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.shopinfo-menu li:last-child {
  border-width: 0;
}

.shopinfo-menu li a {
  display: block;
  color: #333;
  padding: 16px 0 15px 0;
}

.menu-setting-icon {
  background-image: url(/static/bootstrap/img/sprite-frame.png);
  background-position: 0 -37px;
  width: 18px;
  height: 16px;
  display: inline-block;
  margin: 0 16px -1px 16px;
}

.menu-info-icon {
  background-image: url(/static/bootstrap/img/sprite-frame.png);
  background-position: -23px -37px;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 0 16px -1px 16px;
}

.shopinfo-menu li.menu-service-head {
  color: #333;
  padding: 16px 18px 15px 18px;
  background: #eae8db;
}

.shopinfo-menu li.menu-service-object {
  color: #333;
  padding-left: 18px;
  border-bottom-style: dotted;
}

.shopinfo-menu li.footer {
  background-color: #eee;
  height: 64px;
}

.shopinfo-menu li a.btn-logout {
  font-size: 14px;
  background-color: #fff;
  color: #333;
  border: 1px solid #666;
  padding: 8px 16px;
  /*margin-right: 14px;*/
  line-height: 1;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0,0,0,.4);
  margin: 15px 0 0 256px;
}

@media screen and (max-width: 1024px){
  .common-header-shopinfo {
    max-width: 280px;
  }
}
</style>
