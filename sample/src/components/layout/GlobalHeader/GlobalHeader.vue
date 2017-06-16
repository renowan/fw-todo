<template>
  <div class="l-common-header" id="js-common-header">
      <a href="https://test-manage.gnavi.co.jp/"><span class="common-header-logo"></span></a>
      <ul>
        <li class="common-header-parts">
          <a href="https://test-manage.gnavi.co.jp/Pro/service/">全サービス案内</a>
        </li>
        <li class="common-header-parts">
          <a href="https://test-manage.gnavi.co.jp/pro_help/">ヘルプ・情報表示規定</a>
        </li>

        <shopinfo
          :is-pro-members="isProMembers">
        </shopinfo>

      </ul>
  </div>
</template>

<script>
import Shopinfo from './Shopinfo.vue'
export default {
  name: 'global-header',
  props: ['isProMembers'],
  components: {
    Shopinfo
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
a, a:hover{
  text-decoration: none;
}
.l-common-header {
  min-height: 48px;
  background-color: #2e2e2b;
  color: #fffbfb;
  overflow-y: hidden;
  zoom: 1;
  position: absolute;
  z-index: 999;
}
.l-common-header {
  width: 100%;
}
.l-common-header a {
  color: #fff;
  display: block;
  padding: 0 16px;
}
.common-header-logo {
  background-image: url(/static/bootstrap/img/sprite-frame.png);
  background-position: 0 0;
  width: 168px;
  height: 32px;
  float: left;
  top: 0;
  bottom: 0;
  left: 8px;
  margin: auto;
  position: absolute;
}
.l-common-header ul {
    list-style-type: none;
    margin: 0;
    float: right;
}
.l-common-header li {
    float: left;
}
.common-header-parts {
    line-height: 48px;
    border-left: 1px solid #777;
    font-size: 12px;
}

</style>
