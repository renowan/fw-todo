<template>
  <div :class="{'btn-notice': true, 'pull-left': true, 'open': show}" v-click-outside="blur">
    <a class="rsv-header-notice is-active" href="javascript:void(0);" @click.prevent="toggle">
      <span class="rsv-header-notice-alert" v-if="!nonNotice"></span>
    </a>
    <ul class="notice-menu">
      <li v-if="noticeInfo.unread_rsv_cnt > 0">
        <a href="javascript:void(0)" @click="locationMove('/rsv/reservation/?rsv_read=1')">
          <h4>
            <span class="sc sc-notice-calendar notice-icon"></span> 新しい予約が入りました
            <span class="notice-num">{{noticeInfo.unread_rsv_cnt}}</span>
          </h4>
          <div class="notice-text">新しい予約を確認してください。</div>
        </a>
      </li>
      <li v-if="noticeInfo.unconfirmed_rsv_cnt > 0">
        <a href="javascript:void(0)" @click="locationMove('/rsv/reservation/?rsv_stat=01')">
          <h4>
            <span class="sc sc-notice-clock notice-icon"></span> 未確定の予約があります
            <span class="notice-num">{{noticeInfo.unconfirmed_rsv_cnt}}</span>
          </h4>
          <div class="notice-text">お客様へご回答をお願いします。</div>
        </a>
      </li>
      <li v-if="noticeInfo.unread_msg_cnt > 0">
        <a href="javascript:void(0)" @click="locationMove('/rsv/reservation/?msg_read=1')">
          <h4>
            <span class="sc sc-notice-message notice-icon"></span> お客様から新着メッセージが届いています
            <span class="notice-num">{{noticeInfo.unread_msg_cnt}}</span>
          </h4>
          <div class="notice-text">新着メッセージを確認してください。</div>
        </a>
      </li>
      <li v-if="noticeInfo.unconfirmed_charge_cnt > 0">
        <a href="javascript:void(0)" @click="locationMove('/rsv/visit/')">
          <h4>
            <span class="sc sc-notice-yen notice-icon"></span> 来店日を過ぎた予約があります
            <span class="notice-num">{{noticeInfo.unconfirmed_charge_cnt}}</span>
          </h4>
          <div class="notice-text">来店実績を確認、変更してください。</div>
        </a>
      </li>
      <li v-if="nonNotice">
        <a href="javascript:void(0)">
          <div class="notice-text non-notice">新しいお知らせはありません。</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from '../../ui/utils/NodeList.js'
import ClickOutside from '../../ui/directives/ClickOutside.js'

export default {
  directives: {
    ClickOutside
  },
  name: 'btn-notice',
  computed: {
    nonNotice () {
      const unconfirmed_rsv_cnt = this.noticeInfo.unconfirmed_rsv_cnt
      const unconfirmed_charge_cnt = this.noticeInfo.unconfirmed_charge_cnt
      const today_unconfirmed_cnt = this.noticeInfo.today_unconfirmed_cnt
      return !!(unconfirmed_rsv_cnt === 0 && unconfirmed_charge_cnt === 0 && today_unconfirmed_cnt === 0)
    }
  },
  props: {
    noticeInfo: {
      type: Object,
      default: {
        unconfirmed_rsv_cnt: 0,
        unconfirmed_charge_cnt: 0,
        today_unconfirmed_cnt: 0
      }
    }
  },
  watch: {
    show (val) { this.$emit('input', val) },
    value (val) { this.show = val }
  },
  methods: {
    blur () { this.show = false },
    toggle () {
      if (!this.disabled) { this.show = !this.show }
    },
    locationMove (e) {
      this.$parent.locationMove(e, null, '')
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
.btn-notice {
  position: relative;
  width: 24px;
  height: 37px;
  margin: 10px 0 0 33px;
}
.rsv-header-notice {
  position: relative;
  width: 24px;
  height: 37px;
  background-image: url(/static/bootstrap/img/sprite-common.png);
  background-position: -307px 0;
  display: block;
}
.rsv-header-notice.is-active .rsv-header-notice-alert {
    display: block;
}
.rsv-header-notice-alert {
    position: absolute;
    top: -4px;
    left: 14px;
    display: none;
    width: 22px;
    height: 22px;
    background-image: url(/static/bootstrap/img/sprite-common.png);
    background-position: -307px -258px;
}
.notice-menu {
  position: absolute;
  z-index: 1100;
  top: 46px;
  left: -20px;
  min-width: 387px;
  border: solid 1px #ddd;
  background-color: #fff;
  display: none;
}

.open > .notice-menu {
  display: block;
}

.notice-menu:after {
  content: "";
  position: absolute;
  top: -10px;
  left: 24px;
  margin-left: -10px;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent #fff transparent;
  z-index: 1;
}
.notice-menu > li {
  border-bottom: 1px solid #ddd;
}
.notice-menu > li > a {
  color: #666;
  padding: 16px 16px 14px;
  display: block;
  text-decoration: none;
}
.notice-menu > li > a:hover {
  text-decoration: none;
}
.notice-menu > li h4 {
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 6px;
  vertical-align: middle;
}

.notice-icon {
  position: relative;
  top: 4px;
}

.notice-num {
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  top: -2px;
  display: inline-block;
  width: 40px;
  margin-left: 1em;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background-color: #e00;
}
.notice-text {
  padding-left: 27px;
}
.notice-text.non-notice {
  padding-left: 0;
}
</style>
