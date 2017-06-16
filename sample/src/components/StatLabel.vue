<template>
  <span v-bind:class="labelClass">
    {{labelConfig.label}}
  </span>
</template>

<script>

import * as rsvProperty  from '../common/utils/rsvProperty'

// class="label label-border label-lg stat label-cancel"
const labelConfig = {
  // ----- 生のrsv_stat -----
  '01': {
    label: '未確定',
    className: 'label-danger'
  },
  '02': {
    label: '確定済',
    className: 'label-success'
  },
  '03': {
    label: '来店済',
    className: 'label-info'
  },
  '04': {   //not use
    label: '期限切れ',
    className: 'label-cancel'
  },
  '05': {
    label: 'キャンセル',
    className: 'label-warning'
  },
  '06': {
    label: 'キャンセル',
    className: 'label-warning'
  },
  '07': {
    label: '無断キャンセル',
    className: 'label-cancel'
  },
  '08': {
    label: 'キャンセル',
    className: 'label-warning'
  },
  '99': {
    label: '予定',
    className: 'label-default'
  },
  // ----- 予約詳細用変換コード -----
  [rsvProperty.RSV_DETAIL_CODE_UNDECIDED]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_UNDECIDED),
    className: 'label-danger'
  },
  [rsvProperty.RSV_DETAIL_CODE_DECIDED]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_DECIDED),
    className: 'label-success'
  },
  [rsvProperty.RSV_DETAIL_CODE_VISITED]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_VISITED),
    className: 'label-info'
  },
  // 通常の店舗キャンセル（キャンセルを選択）
  [rsvProperty.RSV_DETAIL_CODE_CANCEL]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_CANCEL),
    className: 'label-warning'
  },
  [rsvProperty.RSV_DETAIL_CODE_NO_SHOW]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_NO_SHOW),
    className: 'label-cancel'
  },
  // 法人会食の店舗キャンセル（キャンセル種別なしを選択）
  [rsvProperty.RSV_DETAIL_CODE_CANCEL_NO_TYPE]: {
    label: 'キャンセル',
    className: 'label-warning'
  },
  [rsvProperty.RSV_DETAIL_CODE_CANCEL_DAY]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_CANCEL_DAY),
    className: 'label-warning'
  },
  [rsvProperty.RSV_DETAIL_CODE_CANCEL_DAY_BEFORE]: {
    label: rsvProperty.getRsvStatText(rsvProperty.RSV_DETAIL_CODE_CANCEL_DAY_BEFORE),
    className: 'label-warning'
  },
  // 詳細トップでお断りをした場合（未確定をキャンセル）
  [rsvProperty.RSV_DETAIL_CODE_DECLINE]: {
    label: 'キャンセル',
    className: 'label-warning'
  },
}
export default {
  name: 'stat-label',
  props: {
    stat: {type: String, default: '01'},
    size: {type: String, default: ''},
    labelStyle: {type: String, default: ''}
  },
  data () {
    return {
      labelConfig: labelConfig[this.stat],
    }
  },
  computed: {
    labelClass () {
      let arr = ['label']
      if (this.labelStyle === 'border') arr.push('label-border')
      if (this.size === 'lg') arr.push('label-lg')
      arr.push('stat')
      arr.push(labelConfig[this.stat].className)
      return arr
    }
  }
}
</script>

<style scoped>
.label-lg{
  font-size: 18px;
  font-weight: normal;
}
</style>
