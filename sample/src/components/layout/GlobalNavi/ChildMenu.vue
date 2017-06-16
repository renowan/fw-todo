<template>
  <li :class="{'active': item.name === pageName}">
    <a href="javascript:void(0)" @click="locationMove" :class="{'is-disabled': isDisabled}">
      {{item.label}}<span class="navi-group-admin-alert" v-if="isAlert && !isDisabled"></span>
    </a>
  </li>
</template>

<script>

export default {
  name: 'child-menu',
  props: ['item', 'groupMngJson', 'shopWordJson', 'login_type', 'shopWordJson', 'pageName'],
  computed: {

  },
  data () {
    return {
      isAlert       : false,
      groupLimitPath: '/rsv/not-grouplimited',
      isUrlValid   : true,
      isDisabled    : false,
    }
  },
  created () {
    // 表示設定
    const {
      groupMngJson,
      shopWordJson,
      login_type
    } = this
    // `!` を出すか
    this.isAlert     = this.item.alert(groupMngJson, shopWordJson, login_type)
    // パスは設定を渡すか、`/rsv/not-grouplimited` を渡すか
    this.isUrlValid = this.item.isUrlValid(groupMngJson, shopWordJson, login_type)
    // ボタン無効。trueの場合、isAlert, isUrlValidを `false` とみなして処理する
    this.isDisabled  = this.item.isDisabled(groupMngJson, shopWordJson, login_type)
  },
  methods: {
    locationMove () {
      if (!this.isDisabled) {
        // 有効なパスを渡すか、制限ページのパスを渡すか
        const url   = this.isUrlValid ? this.item.url   : this.groupLimitPath
        // target = '_blank' の設定
        const target = this.item.target ? this.item.target : ''
        this.$parent.$parent.locationMove(url, null, target)
      }
    }
  }
}

</script>

<style scoped>

.navi-contents {
  height: 56px;
  font-size: 16px;
  line-height: 1;
  position: relative;
  display: block;
  cursor: pointer;
  padding: 20px 0;
  border-bottom: 1px solid #717171;
}
.navi-contents a {
  display: block;
  padding-left: 16px;
  text-decoration: none;
  color: #fff;
  background-color: #5d5c57;
}

a.navi-contents-active {
  display: block;
  content: ' ';
  text-decoration: none;
  color: #5d5c57;
  border-bottom: 1px solid #fff;
  background-color: #ededed;
}

.navi-contents > span {
  display: block;
  padding-left: 16px;
  text-decoration: none;
  color: #fff;
  background-color: #5d5c57;
}

.navi-contents-sub {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow-y: hidden;
  transition: all 0.3s ease;
  /*height: 0;*/
}

.navi-contents-sub li {
  position: relative;
  line-height: 1;
  /*line-height: 44px;*/
  height: 47px;
  padding: 0;
  margin: 0;
  /*border-bottom: 1px solid #717171;*/
}

.navi-contents-sub li a {
  display: block;
  height: 47px;
  text-decoration: none;
  padding: 16px 0 0 32px;
  color: #fff;
  background-color: #5d5c57;
  border-bottom: 1px solid #717171;
}

.navi-contents-sub li a:hover {
  display: block;
  content: ' ';
  text-decoration: none;
  color: #5d5c57;
  border-bottom: 1px solid #fff;
  background-color: #ededed;
}

.navi-contents-sub li a:hover:before {
  display: block;
  float: right;
  width: 6px;
  height: 10px;
  margin-top: 3px;
  margin-right: 15px;
  content: ' ';
  background-image: url(../img/sprite-common.png);
  background-position: -336px -84px;
}

.navi-contents-sub li.active a {
  color: #5d5c57;
  background-color: #ededed;
  border-bottom: 1px solid #fff;
}

.navi-setting-icon {
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  float: right;
  width: 16px;
  height: 16px;
  margin: auto;
  background-image: url(../img/sprite-common.png);
  background-position: -223px -265px;
}

.is-active .navi-setting-icon {
  transform: scaleY(-1);
}

.navi-group-admin-alert, .navi-group-admin-alert--type2 {
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  float: right;
  width: 15px;
  height: 15px;
  margin: auto;
  background-image: url(../img/sprite-common.png);
  background-position: -110px -306px;
}

.navi-contents-sub li a:hover .navi-group-admin-alert {
  display: none;
}

.navi-contents-sub li a.is-disabled {
  color: #999;
  cursor: default;
}
.navi-contents-sub li a.is-disabled:hover {
  color: #999;
  content: none;
  background-color: #5d5c57;
  border-bottom: 0px solid #717171;
}
</style>
