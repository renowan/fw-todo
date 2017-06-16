<template>
  <div :class="[{timepicker: true, open: show, disabled: disabled}]" v-click-outside="blur" :style="{'width': optionalWidth}">
    <span class="form-control" @click.prevent="toggle" :style="{'width': optionalWidth}">{{numToStr(time, 'hh:mm')}} </span>

    <i class="caret" @click.prevent="toggle"></i>

    <div class="timepicker-popup clearfix" v-show="displayTimeView">
      <div class="number-block">
        <a href="javascript:void(0)" class="arr-up" @click="hourDown"><i class="fa fa-chevron-up"></i></a>
        <div class="num">{{numToStr(time, 'hh')}}</div>
        <a href="javascript:void(0)" class="arr-down" @click="hourUp"><i class="fa fa-chevron-down"></i></a>
      </div>

      <div class="coron-block">
        <div class="col">:</div>
      </div>

      <div class="number-block">
        <a href="javascript:void(0)" class="arr-up" @click="minDown"><i class="fa fa-chevron-up"></i></a>
        <div class="num">{{numToStr(time, 'mm')}}</div>
        <a href="javascript:void(0)" class="arr-down" @click="minUp"><i class="fa fa-chevron-down"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from './directives/ClickOutside.js'

const MIN_TIME = 600
const MAX_TIME = 2975

export default {
  name: 'time-picker',
  directives: {
    ClickOutside
  },
  props: {
    disabled: {type: Boolean, default: false},
    width   : {default: null},
    value   : {type: String, default: '0000'},
    minValue: {type: String, default: '0600'},
    maxValue: {type: String, default: '2945'},
    justified: {type: Boolean, default: false},
  },
  data () {
    var index = this.value
    return {
      index,
      show: false,
      displayTimeView: true,
      // 内部時間計算用時間
      time: 1200,
      minTime: MIN_TIME,
      maxTime: MAX_TIME,
    }
  },
  watch: {
    time (val) {
      this.index = this.numToStr(val, 'hhmm')
    },
    index (val) {
      this.$emit('input', val)
    },
    minValue (val) {
      this.minTime = this.strToNum(val)
      if (this.time < this.minTime) this.time = this.minTime
    },
    maxValue (val) {
      this.maxTime = this.strToNum(val)
      if (this.time > this.maxTime) this.time = this.maxTime
    }
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
    // 不正な時間を強制リセット
    if (this.value.length !== 4) {
      this.index = '1200'
    }
    if (this.minValue.length !== 4) {
      this.minTime = MIN_TIME
    }
    if (this.maxValue.length !== 4) {
      this.maxTime = MAX_TIME
    }

    // 時間を計算可能のNumberに変換
    this.time = this.strToNum(this.index)
    this.minTime = this.strToNum(this.minValue)
    this.maxTime = this.strToNum(this.maxValue)
  },
  methods: {
    blur () { this.show = false },
    toggle () {
      if (!this.disabled) { this.show = !this.show }
    },
    // 0600 -> 600
    strToNum (val) {
      const h = Number(val.slice(0, 2)) * 100
      const m = (Number(val.slice(2, 4)) / 15) * 25
      return h + m
    },
    // 600 -> 06:00
    numToStr (time, format) {
      const _time = time
      const h = ('0' + Math.floor(_time / 100)).slice(-2)
      const m = ('0' + (_time % 100) / 25 * 15).slice(-2)
      if (format === 'hh') return h
      if (format === 'mm') return String(m)
      if (format === 'hhmm') return `${h}${m}`
      if (format === 'hh:mm') return `${h}:${m}`
    },
    hourUp () {
      if (this.time + 100 <= this.maxTime) {
        this.time += 100
      }
    },
    hourDown () {
      if (this.time - 100 >= this.minTime) {
        this.time -= 100
      }
    },
    minUp () {
      if (this.time + 25 <= this.maxTime) {
        this.time += 25
      }
    },
    minDown () {
      if (this.time - 25 >= this.minTime) {
        this.time -= 25
      }
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
  padding: 20px 24px;
  display: none;
  min-width: 152px;
}

.timepicker.disabled .form-control {
  color: #ddd;
}

.timepicker.disabled .caret,
.timepicker.disabled .caret:hover {
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

.number-block, .coron-block {
  width: 36px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  float: left;
}
.coron-block {
  width: 24px;
}

.coron-block .col {
  margin-top: 30px;
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
