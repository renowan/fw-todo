<template>
  <div>

    <div v-bind:class="{'navi-contents': true, 'is-active': isOpen, 'active': item.name === pageName}" @click="onClickMainBtn()">
      <a href="javascript:void(0)">
        {{item.label}}
        <span class="navi-group-admin-alert" v-if="hasAlert"></span>
        <span class="navi-setting-icon navi-setting-refrect" v-if="hasSubMenu"></span>
      </a>
    </div>

    <ul class="navi-contents-sub" v-if="hasSubMenu" v-bind:style="{height: subMenuHeight + 'px'}">
      <child-menu
        v-for="child in item.subMenu"
        v-bind:item="child"
        :page-name="pageName"
        :groupMngJson="groupMngJson"
        :shopWordJson="shopWordJson"
        :login_type="login_type">
      </child-menu>
    </ul>

  </div>
</template>

<script>
import ChildMenu from './ChildMenu.vue'
// 子Menuの高さ
const childHeight = 47

export default {
  name: 'menu-elm',
  props: ['item', 'login_type', 'shopWordJson','groupMngJson', 'shopWordJson', 'pageName'],
  components: {
    ChildMenu
  },
  computed: {
    // submenu の高さ（メニュー項目✕項目数）
    subMenuHeight: function () {
      return this.hasSubMenu && this.isOpen ? this.item.subMenu.length * childHeight : 0
    }
  },
  data () {
    return {
      hasSubMenu: false,
      isOpen: false,
      label: '',
      hasAlert: false,
    }
  },
  created () {
    this.hasSubMenu = this.item.hasOwnProperty('subMenu') ? true : false
  },
  methods: {
    onClickMainBtn () {
      if (this.hasSubMenu) {

        /*
         メニューグループの開閉
         */

        this.isOpen = !this.isOpen
      } else {
        if (this.item.hasOwnProperty('url')) {

          /*
           subMenuなし、リンク処理
           */

          // パス
          const url = this.item.url
          // target = '_blank' の設定
          const target = this.item.target ? this.item.target : ''

          this.$parent.locationMove(url, null, target)
        }
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
  /*background-color: #5d5c57;*/
}

.navi-contents.active {
  background-color: #ededed;
}

.navi-contents.active a {
  color: #5d5c57;
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
  height: 47px;
  /*padding: 16px 0;*/
  margin: 0;
  border-bottom: 1px solid #717171;
}

.navi-contents-sub li a {
  display: block;
  text-decoration: none;
  color: #fff;
  background-color: #5d5c57;
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
  margin-top: 17px;
  margin-right: 15px;
  content: ' ';
  background-image: url(../img/sprite-common.png);
  background-position: -336px -84px;
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
</style>
