<template>
  <div id="app">

    <div :class="{'main-content-wrapper': true, 'menu-active': isMenuActive}">

      <global-header
        v-if="app.pageType === 'default'"
        :is-pro-members="isProMembers">
      </global-header>

      <page-header
        v-if="app.pageType === 'default'"
        :notice-info="app.noticeInfo"
        v-on:location-move="locationMove">
      </page-header>

      <div class="global-navi-overlay" v-on:click="menuToggle()" v-on:location-move="locationMove()"></div>

      <div class="global-navi-overlay header-area" v-on:click="menuToggle()"></div>

      <!-- global navi -->
      <global-navi
        v-if="app.pageType === 'default'"
        :page-name="app.pageName"
        :is-menu-active="isMenuActive"
        :groupMngJson="groupMngJson"
        :shopWordJson="shopWordJson"
        :login_type="login_type"
        :naviConfig="naviConfig"
        v-on:close-menu="closeMenu"
        v-on:location-move="locationMove">
      </global-navi>

      <!-- main content -->
      <div :class="{'main-content': true, 'm-print': app.pageType === 'print'}">
        <print-header v-if="app.pageType === 'print'"></print-header>

        <div :class="{inner: app.pageType === 'default'}">

          <!-- router -->
          <router-view class=""
            v-on:menu-toggle="menuToggle"
            v-on:router-push="routerPush"
            v-on:go-back="goBack"
            v-on:location-move="locationMove">
          </router-view>

        </div>

        <print-footer v-if="app.pageType === 'print'"></print-footer>
      </div>

    </div>

    <modal
      v-model="app.isShowPageMoveModal"
      title="変更した内容が保存されていません"
      effect="fade"
      type="alert">
      保存せずに移動しますか？
      <div slot="modal-footer" class="modal-footer">
        <div class="row-10">
          <div class="col-sm-offset-2 col-sm-4 col-xs-12 mb10">
            <button type="button" class="btn btn-default btn-block" @click="closePageMoveModal">キャンセル</button>
          </div>
          <div class="col-sm-4 col-xs-12">
            <button type="button" class="btn btn-primary btn-block" @click="pageMoveExe">実行</button>
          </div>
        </div>
      </div>
    </modal>

    <modal
      v-model="isRSVAPIError"
      title="エラー"
      effect="fade"
      type="alert"
      v-on:cancel="closeErrorModal"
      :width="380">
      エラー発生しました。
      <div v-if="app.error&&app.error.hasOwnProperty('errors')">
        <p v-for="item in app.error.errors" class="error-message">
          <span v-html="item.message"></span>
        </p>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="closeErrorModal">閉じる</button>
      </div>
    </modal>

  </div>
</template>

<script>
import GlobalHeader from './layout/GlobalHeader/GlobalHeader.vue'
import PageHeader from './layout/PageHeader/PageHeader.vue'
import GlobalNavi from './layout/GlobalNavi/GlobalNavi.vue'
import PageTitle from './layout/PageTitle/PageTitle.vue'
import LostDataModal from './LostDataModal/LostDataModal.vue'
import * as utility from '../common/utils/utility.js'
import { mapGetters } from 'vuex'
import naviConfig from '../common/config/naviConfig.js'
import Modal from './ui/Modal.vue'
import PrintHeader from './layout/Print/PrintHeader.vue'
import PrintFooter  from './layout/Print/PrintFooter.vue'

export default {
  name: 'app',
  computed: {
    app () {
      return this.$store.getters.app
    },
    isRSVAPIError () {
      return this.app.error !== null ? true : false
    }
  },
  components: {
    GlobalHeader,
    PageHeader,
    GlobalNavi,
    PageTitle,
    LostDataModal,
    Modal,
    PrintHeader,
    PrintFooter
  },
  data () {
    return {
      isMenuActive: false,
      naviConfig: naviConfig,

      appNextPage: {
        // 遷移先
        url: null,
        // クエリ
        query: null,
        // '_blank'か
        target: null,
        // ページ遷移か、router遷移か
        type: null,
      },

      // 外部から来た場合、どのページかを保存する
      lastPage: {
        pageName: null,
        date: null,
        id: null
      },

      // Layoutの振る舞いに関わる変数
      isProMembers: false, // GlobalNaviのメニューに出す
      groupMngJson: null, // side naviの項目を制御
      shopWordJson: null, // 全体の制御
      login_type: null //  side naviの項目を制御

    }
  },

  created () {
    this.groupMngJson = window.NEXT_GEN_RSV.groupMngJson
    this.shopWordJson = window.NEXT_GEN_RSV.shopWordJson

    this.login_type = window.NEXT_GEN_RSV.loginTypeJson.login_type

    /*
      c_pro && GMemDisp
      上記２つのcookieが存在する場合、Pro会員となる
      メニューに「Pro会員情報」のリンクを出す
     */
    this.isProMembers = utility.isProMembers()

    // 新着情報を取得
    this.updateNoticeInfo()

    // 10分ごとに走る
    const noticeTimer = setInterval(() => {
      this.updateNoticeInfo()
    }, 600000)

    // 外部ページから来た場合 = query.back ページ先を保存
    const query = this.$route.query
    if (query.back) {
      this.lastPage.pageName = query.back
      this.lastPage.date = query.date || null
      this.lastPage.id = query.id || null
    }

  },

  methods: {
    menuToggle () {
      this.isMenuActive = !this.isMenuActive
    },
    closeMenu () {
      this.isMenuActive = false
    },
    // ページ遷移受付
    locationMove (url, query, target) {
      if (this.app.isLoading) return false
      this.appNextPage = {url, query, target, type: 'href'}
      if (this.app.canSave) {
        this.$store.dispatch('appUpatePageMoveModal', true)
      } else {
        this.pageMoveExe()
      }
    },
    // ページ遷移実行
    pageMoveExe () {
      const {url, query, target, type} = this.appNextPage
      const queryString = utility.httpBuildQuery(query)
      if (type === 'href') {
        if (target !== '' && target !== undefined && target !== null) {
          this.closePageMoveModal()
          window.open(url + queryString, '_blank')
        } else {
          window.location.href = url + queryString
        }
      } else {
        // router遷移
        if (url === 'back') {
          this.$router.go(-1)
        } else {
          this.$router.push(url + queryString)
        }
      }
      this.$store.dispatch('appUpatePageMoveModal', false)
    },
    // canSave監視によるルーター遷移
    routerPush (path, query) {
      this.appNextPage = {
        url: path,
        query,
        target: '',
        type: 'router'
      }
      if (this.app.canSave) {
        this.$store.dispatch('appUpatePageMoveModal', true)
      } else {
        this.pageMoveExe()
      }
    },
    // ページ遷移警告Modalを閉じる
    closePageMoveModal () {
      this.$store.dispatch('appUpatePageMoveModal', false)
    },
    // エラーModalを閉じる
    closeErrorModal () {
      this.$store.dispatch('appClearError', false)
    },
    updateNoticeInfo () {
      this.$store.dispatch('updateNoticeInfo', false)
    },
    // 外部ページから来て、戻る場合
    goBack (path) {
      const pageName = this.lastPage.pageName
      let pageUrl = utility.naviCollection[pageName]
      if (pageName && pageUrl) {
        const url = pageUrl + utility.httpBuildQuery(this.lastPage)
        this.locationMove(url, null, '')
      } else {
        this.routerPush(path)
      }
    }
  }
}
</script>

<style scoped>
.main-content-wrapper {
  width: 100%;
  min-height: 700px;
  color: #666;
  background-color: #f0f0f0;
  position: absolute;
}

/*.main-content {
  transition: all 0.2s ease;
}*/

.main-content {
  /*height: 100%;*/
  position: relative;
  margin-left: 0;
}

.main-content .inner {
  padding-top: 104px;
}

/*menu active時*/
.menu-active .main-content {
  /*margin-left: 200px;*/
}

.global-navi-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(51,51,51,.6);
  position: fixed;
  z-index: 900;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  cursor: pointer;
}

.global-navi-overlay.header-area {
  height: 104px;
  z-index: 1100;
  position: absolute;
}

.menu-active .global-navi-overlay {
  display: block;
}

.content-view {
  padding: 16px 14px;
}

.error-message {
  font-size: 12px;
  color: #d9534f;
}

@media (min-width: 1024px) {

  .menu-active .global-navi-overlay {
    display: none;
  }

  .menu-active .main-content {
    margin-left: 200px;
    transition: all 0.2s ease;
  }
}

.m-print {
    width: 750px;
    margin: 0 auto;
    padding: 0 20px 30px;
    text-align: left;
    background: #fff;
}
</style>
