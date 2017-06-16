<template>
  <div class="global-navi">
    <a href="javascript:void(0)" class="btn-menu-close" v-on:click="closeMenu()"></a>
    <div class="inner">

      <menu-elm
        :page-name="pageName"
        :login_type="login_type"
        :groupMngJson="groupMngJson"
        :shopWordJson="shopWordJson"
        v-for="item in naviConfig"
        v-bind:item="item">
      </menu-elm>

    </div>
  </div>
</template>

<script>

import MenuElm from './MenuElm.vue'

// パスリスト
const listLocationPath = {
  top: '/rsv/top',                                 // トップページ
  schedule: '/rsv/schedule',                       // スケジュール
  reservationSearch: '/rsv/reservation-search',    // 予約の検索
  planRegistration: '/rsv/plan-registration',      // 予定を登録
  visit: '/visit/',                                // 来店実績・手数料
  reservationStatus: '/rsv/reservation-status',    // 予約の開始・停止
  notification: '/rsv/notification-setting',       // 通知の送信先
  configReception: '/rsv/config-reception-date',   // 受付日
  baseSetting: '/rsv/base-setting',                // 基本情報
  tableSetting: '/rsv/table-setting',              // テーブル
  settingMessage: '/rsv/setting-message',          // メッセージ定型文
  reservationForm: '/rsv/reservation-form',        // 予約受付フォーム
  webReservationTool: '/rsv/web-reservation-tool', // WEB予約ツール
  notGrouplimited: '/rsv/not-grouplimited'         // 制限ページ
}


export default {
  name: 'global-navi',
  props: ['groupMngJson', 'shopWordJson', 'login_type', 'naviConfig', 'pageName'],
  components: {
    MenuElm
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    closeMenu () {
      this.$emit('close-menu')
    },
    locationMove (url, query, target) {
      this.$emit('location-move', url, query, target)
    }
  }
}
</script>

<style scoped>
.global-navi {
  transition: all 0.2s ease;
  width: 200px;
  height: 100%;
  background-color: #5d5c57;
  position: absolute;
  left: -200px;
  color: #fff;
  z-index: 910;
}

.btn-menu-close {
  position: absolute;
  top: 120px;
  left: 210px;
  display: none;
  width: 24px;
  height: 24px;
  background-image: url(../img/sprite-common.png);
  background-position: -307px -174px;
  z-index: 1200;
}

.menu-active .btn-menu-close {
  display: block;
}

.global-navi .inner {
  background-color: #5d5c57;
  /*position: fixed;*/
  position: absolute;
  width: 200px;
  z-index: 1100;
  margin-top: 104px;
}

/*menu active時*/
.menu-active .global-navi {
  left: 0;
}

.menu-active .global-navi .inner {
  /*height: 100%;*/
}


@media (min-width: 1024px) {
  .menu-active .global-navi {
    z-index: 940;
  }

  .menu-active .global-navi .inner {
    position: relative;
    padding-top: 0;
    height: initial;
  }

  .menu-active .btn-menu-close {
    display: none;
  }
}

</style>
