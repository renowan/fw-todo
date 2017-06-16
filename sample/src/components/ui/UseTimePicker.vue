<template>
  <div :class="[{timepicker: true, open: show, disabled: disabled}]" v-click-outside="blur" :style="{'width': optionalWidth}">
    <span class="form-control" @click.prevent="toggle" :style="{'width': optionalWidth}">{{numToStr(index, 'hhmm')}}</span>
    <i class="caret" @click.prevent="toggle"></i>
    <div class="timepicker-popup clearfix" v-show="displayTimeView">
      <div class="number-block">
        <a href="javascript:void(0)" class="arr-up" @click="hourDown"><i class="fa fa-chevron-up"></i></a>
        <div class="num">{{numToStr(index, 'hh')}}</div>
        <a href="javascript:void(0)" class="arr-down" @click="hourUp"><i class="fa fa-chevron-down"></i></a>
      </div>

      <div class="number-block">
        <a href="javascript:void(0)" class="arr-up" @click="minDown"><i class="fa fa-chevron-up"></i></a>
        <div class="num">{{numToStr(index, 'mm')}}</div>
        <a href="javascript:void(0)" class="arr-down" @click="minUp"><i class="fa fa-chevron-down"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from './directives/ClickOutside.js'

const MIN_TIME = 15  // 最低限
const MAX_TIME = 360 // 最大限
const H_UNIT = 60    // 時間単位
const M_UNIT = 15    // 分単位

export default {
  name: 'use-time-picker',
  directives: {
    ClickOutside
  },
  props: {
    disabled: {type: Boolean, default: false},
    width   : {default: null},
    value   : {type: String, default: 90},
    minValue: {type: Number, default: MIN_TIME},
    maxValue: {type: Number, default: MAX_TIME},
    justified: {type: Boolean, default: false},
  },
  data () {
    var index = Number(this.value)
    return {
      index,
      show: false,
      displayTimeView: true,
    }
  },
  watch: {
    time (val) {
      this.index = this.numToStr(val, 'hhmm')
    },
    index (val) {
      this.$emit('input', String(val))
    },
    value () {
      this.index = Number(this.value)
    },
  },
  computed: {
    optionalWidth () {
      if (this.justified) {
        return '100%'
      }
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
    blur () { this.show = false },
    toggle () {
      if (!this.disabled) { this.show = !this.show }
    },

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

    hourUp () {
      if (this.index + H_UNIT <= this.maxValue) this.index += H_UNIT
    },
    hourDown () {
      if (this.index - H_UNIT >= this.minValue) this.index -= H_UNIT
    },
    minUp () {
      if (this.index + M_UNIT <= this.maxValue) this.index += M_UNIT
    },
    minDown () {
      if (this.index - M_UNIT >= this.minValue) this.index -= M_UNIT
    },
  }
}
</script>

<style scoped>
.timepicker {
  position: relative;
}

.timepicker-popup {
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-top: 2px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  padding: 16px 18px;
  display: none;
  min-width: 152px;
}

.timepicker.disabled .form-control {
  color: #ddd;
}

.timepicker.disabled .caret, .timepicker.disabled .caret:hover {
  color: #ddd;
}

.open .timepicker-popup {
  display: block;
}

.open .form-control {
  border-color: #2196f3;
  border-width: 2px;
  outline: 0;
  padding: 5px 11px;
}

.arr-up, .arr-down {
  display: block;
  width: 100%;
  /*background-color: #ddd;*/
  text-align: center;
  line-height: 1;
  font-size: 16px;
}

.arr-up {
  padding-top: 6px;
  padding-bottom: 8px;
}
.arr-down {
  padding-top: 8px;
  padding-bottom: 6px;
}

.number-block {
  width: 56px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  float: left;
}

.number-block .col {
  margin-top: 20px;
}

.timepicker > .caret {
  position: absolute;
  top: 14px;
  right: 10px;
  font-size: 21px;
  color: #666;
  cursor: pointer;
}

.timepicker > .caret:hover {
  color: #808080;
}
</style>
