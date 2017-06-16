<template>
  <div class="number-input">
    <input type="text" class="form-control" v-model="index" v-if="hasInput" :style="{'width': optionalWidth}">
    <span :class="counterClass" :style="{'width': optionalWidth}" v-else>{{index}}</span>
    <span class="unit"><slot></slot></span>
    <button class="btn btn-border btn-sm" @click="minus"><i class="fa fa-minus"></i></button>
    <button class="btn btn-border btn-sm" @click="plus"><i class="fa fa-plus"></i></button>
  </div>
</template>

<script>

const MIN_VALUE = 1  // 最低限
const MAX_VALUE = 99 // 最大限
const UNIT = 1      // 増減単位

export default {
  name: 'number-input',
  props: {
    disabled    : {type: Boolean, default: false},
    width       : {default: null},
    hasInput    : {type: Boolean, default: false},
    value       : {type: Number, default: 1},
    minValue    : {type: Number, default: MIN_VALUE},
    maxValue    : {type: Number, default: MAX_VALUE},
    counterClass: {type: String, default: 'form-control'}
  },
  data () {
    var index = this.value
    return {
      index,
    }
  },
  watch: {
    value (val) {
      this.index = val
    },
    index (val) {
      this.$emit('input', Number(val))
    }
  },
  computed: {
    optionalWidth () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    },

  },
  created () {

  },
  methods: {

    numToStr (time, format) {
      let _t = Math.floor(time / 60)
      let _m = time % 60

      if (format === 'hh') {
        return `${_t}時間`
      }

      if (format === 'mm') {
        _m = _m === 0 ? '00' : _m
        return `${_m}分`
      }

      // format === hhmm
      _t = _t === 0 ? '' : _t + '時間'
      _m = _m === 0 ? '' : _m + '分'
      return `${_t}${_m}`
    },

    minus () {
      console.log('mi', this.minValue);
      if (this.index > this.minValue) this.index -= UNIT
    },

    plus () {
      if (this.index < this.maxValue) this.index += UNIT
    },

  }
}
</script>

<style scoped>
.number-input .form-control{
  display: inline-block;
}
.counter{
  margin-right: 5px;
  vertical-align: middle;
  font-size: 24px;
  display: inline;
}
.unit{
  margin-right: 5px;
  font-size: 12px;
  vertical-align: sub;
}
</style>
