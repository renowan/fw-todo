<template>
  <div>
    <div class="m-print-header clearfix">
      <div class="pull-left">
        <p class="text-danger m-print-header-notice">※ 画面上に表示されている情報量により複数ページになる可能性があります。</p>
       </div>
       <div class="pull-right">
         <input type="submit" class="btn btn-lg btn-primary" value="この画面を印刷する" onclick="window.print();">
       </div>
    </div>

    <p class="mb4">ビギナーエントリー 店舗 ビストロ　鹿 not [i922274]</p>
    <div class="m-print-tit">ぐるなびネット予約<br>{{title}}</div>
    <div class="m-print-data-info">
      <span class="mr6">{{date}}</span>
      時点
    </div>
  </div>
</template>

<script>
import moment      from 'moment'

export default {
  name: 'print-header',
  props: [],
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    date () {
      return moment().format('YYYY/MM/DD(ddd) HH:mm')
    },
    title () {
      return this.$store.getters.app.pageTitle
    }
  }
}
</script>

<style scoped>
.m-print-header {
    padding: 16px 0;
}
.m-print-tit {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    padding: 16px 0;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
}
.m-print-data-info {
    font-size: 12px;
    margin-bottom: 6px;
    text-align: right;
}
.m-print-header-notice {
    font-size: 12px;
    position: relative;
    top: 12px;
}

@media print {
    .m-print-header { display: none; }
}
</style>
