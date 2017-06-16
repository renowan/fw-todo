<template>
<div class="l-rsv-header clearfix">
  <h2 class="rsv-header-text pull-left">予約管理</h2>
  <btn-notice :notice-info="noticeInfo"></btn-notice>
</div>
</template>

<script>
import BtnNotice from './BtnNotice.vue'
export default {
  name: 'page-header',
  components: {
    BtnNotice
  },
  props: {
    isMenuActive: {type: Boolean},
    noticeInfo: {type: Object}
  },
  methods: {
    locationMove (url, target) {
      this.$emit('location-move', url, null, target)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

.l-rsv-header {
  position: absolute;
  /*overflow-y: hidden;*/
  zoom: 1;
  background-color: #eae8db;
  width: 100%;
  z-index: 959;
  top: 48px;
}
.rsv-header-text {
  font-size: 24px;
  line-height: 0;
  margin: 29px 0 27px 16px;
}


</style>
