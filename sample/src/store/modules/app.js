import _ from 'lodash'

// initial state
const state = {

  // ページのローディング
  isLoading: false,
  loadingTask: [],

  isPopupLoading: false,
  popupLoadingTask: [],

  isInlineLoading: false,
  inLineLoadingTask: [],

  // 未保存警告Modal
  isShowPageMoveModal: false,

  pageName: '-',
  pageTitle: 'no',
  pageType: 'default',
  error: null,
  canSave: false,

  // 通知
  noticeInfo: {
    unconfirmed_rsv_cnt: 0,
    unconfirmed_charge_cnt: 0,
    today_unconfirmed_cnt: 0
  },

  // 基本情報
  baseSetting: null
}

// getters
const getters = {
  app: state => state
}

// app 基本必要な情報をロード
const APP_UPDATE_ISLOADING = 'APP_UPDATE_ISLOADING'
// ページ基本情報の更新
const APP_UPDATE_PAGEINFO = 'APP_UPDATE_PAGEINFO'
// アプリケーションが保存できる状態にあるかのチェック
const APP_UPDATE_CANSAVE = 'APP_UPDATE_CANSAVE'

// loading task
const APP_ADD_LOADINGTASK = 'APP_ADD_LOADINGTASK'
const APP_SUBTRACT_LOADINGTASK = 'APP_SUBTRACT_LOADINGTASK'

const APP_UPDATE_PAGE_MOVE_MODAL = 'APP_UPDATE_PAGE_MOVE_MODAL'

// RSVAPI エラー、共通
const APP_RSVAPI_COMMON_ERROR = 'APP_RSVAPI_COMMON_ERROR'
// error objをnullに戻す
const APP_CLEAR_ERROR = 'APP_CLEAR_ERROR'

// taskの残鷹を見てisLoadingを決める
const getIsLoading = loadingTask => !(loadingTask.length < 1)

// actions
const actions = {
  // ===================================
  // App 必要の情報をロード
  // ===================================
  appUpdateIsLoading ({ commit, state }, order) {
    commit(APP_UPDATE_ISLOADING, order)
  },
  // ページ名更新
  appUpatePageInfo ({ commit, state }, order) {
    commit(APP_UPDATE_PAGEINFO, order)
  },
  // ページ遷移警告Modal
  appUpatePageMoveModal ({ commit, state }, isShow) {
    commit(APP_UPDATE_PAGE_MOVE_MODAL, isShow)
  }
}

// loadingの制御用変数obj
const loadingConfig = {
  app: {
    taskKey: 'loadingTask',
    isKey: 'isLoading'
  },
  popup: {
    taskKey: 'popupLoadingTask',
    isKey: 'isPopupLoading'
  },
  inline: {
    taskKey: 'inLineLoadingTask',
    isKey: 'isInlineLoading'
  }
}

// mutations
const mutations = {
  // loading 制御
  [APP_UPDATE_ISLOADING] (state, order) {
    state.isLoading = order
  },

  // loading task: add
  [APP_ADD_LOADINGTASK] (state, order) {
    let loadingTask
    const lcfg = loadingConfig[order.loadingType]
    if (lcfg) {
      loadingTask = state[lcfg.taskKey].slice(0)
      loadingTask.push(order.hash)
      state[lcfg.taskKey] = loadingTask
      state[lcfg.isKey] = getIsLoading(loadingTask)
    }
  },

  // loading task: sub
  [APP_SUBTRACT_LOADINGTASK] (state, order) {
    let loadingTask
    const lcfg = loadingConfig[order.loadingType]
    if (lcfg) {
      loadingTask = state[lcfg.taskKey].slice(0)
      loadingTask = _.remove(loadingTask, elm => elm !== order.hash)
      state[lcfg.taskKey] = loadingTask
      state[lcfg.isKey] = getIsLoading(loadingTask)
    }
  },

  [APP_UPDATE_PAGEINFO] (state, order) {
    state.pageName = order.pageName
    state.pageTitle = order.pageTitle
    if (order.pageType) {
      state.pageType = order.pageType
    }
  },

  [APP_UPDATE_CANSAVE] (state, data) {
    state.canSave = data
  },

  // ページ遷移警告Modal
  [APP_UPDATE_PAGE_MOVE_MODAL] (state, isShow) {
    state.isShowPageMoveModal = isShow
  },

  [APP_RSVAPI_COMMON_ERROR] (state, date) {
    state.error = date

    // 警告modal, loadingを全部強制的に消す
    state.isLoading = false
    state.loadingTask = []

    state.isPopupLoading = false
    state.popupLoadingTask = []

    state.isInlineLoading = false
    state.inLineLoadingTask = []

    state.isShowPageMoveModal = false
  },

  [APP_CLEAR_ERROR] (state) {
    state.error = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
