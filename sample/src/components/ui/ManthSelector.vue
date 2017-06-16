<template>
  <div class="calendar-select-month clearfix">
    <div class="btn-center">
      <dropdown :text="dateTxt(value)" type="decoration-none" width="130px" class="dropdown">
        <li v-for="item in monthSelectorList" :class="{active: item === value}" @click="onClick(item)">
          <a href="javascript:void(0)">{{dateTxt(item)}}</a>
        </li>
      </dropdown>
    </div>
    <a href="javascript:void(0)" class="btn-left" v-bind:disabled="prevIsDisabled" @click="onClickPrev">
      <i class="fa fa-angle-left"></i>
    </a>
    <a href="javascript:void(0)" class="btn-right" v-bind:disabled="nextIsDisabled" @click="onClickNext">
      <i class="fa fa-angle-right"></i>
    </a>
  </div>
</template>

<script>
import dropdown from './Dropdown.vue'
export default {
  name: 'month-selector',
  components: {
    dropdown
  },
  props: {
    value: {type: String, default: ''},
    monthSelectorList: {type: Array, default: []},
  },
  computed: {
    valueIndex () {
      return this.monthSelectorList.findIndex(elm => elm === this.value)
    }
  },
  watch: {
    valueIndex (val) {
      this.prevIsDisabled = val === this.monthSelectorList.length - 1
      this.nextIsDisabled = val === 0
    }
  },
  created () {
  },
  data () {
    const index = this.value || ''
    return {
      prevIsDisabled: false,
      nextIsDisabled: false,
      index
    }
  },
  methods: {
    dateTxt (str) {
      if (!str) return ''
      let month = str.slice(4, 6)
      if (month[0] === '0') month = month[1]
      return str.slice(0, 4) + '年' + month + '月'
    },
    onClick (val) {
      this.$emit('input', val)
    },
    onClickPrev () {
      if (this.valueIndex < this.monthSelectorList.length - 1) {
        const valueIndex = this.valueIndex + 1
        this.valueIndex = valueIndex
        this.$emit('input', this.monthSelectorList[valueIndex])
      }
    },
    onClickNext () {
      if (this.valueIndex > 0) {
        const valueIndex = this.valueIndex - 1
        this.valueIndex = valueIndex
        this.$emit('input', this.monthSelectorList[valueIndex])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$component-height: 36px;

.calendar-select-month {
  width: 190px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  height: $component-height;
  position: relative;
  .btn-center{
    margin-left: 30px;
  }
  .btn-left {
    border-right: solid 1px #c4c4c4;
    position: absolute;
    left: 0;
  }
  .btn-right {
    border-left: solid 1px #c4c4c4;
    position: absolute;
    right: 0;
  }
  .btn-left,
  .btn-right{
    width: 30px;
    height: 100%;
    display: block;
    color: #666;
    text-align: center;
    font-size: 22px;
    top: 0;
  }
  a.btn-left[disabled], a.btn-right[disabled] {
    color: #eee;
  }
}
.dropdown-menu {
  min-width: 130px;
}
</style>
