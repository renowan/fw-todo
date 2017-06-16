<template>
  <div :class="{'datepicker': true, 'inline': !justified}" v-click-outside="close">
    <template v-if="hasInput">
      <template v-if="!readonly">
      <input class="form-control datepicker-input" :class="{'with-reset-button': clearButton}" type="text" :placeholder="placeholder"
          :style="{width:optionalWidth}"
          @click="inputClick"
          v-model="inputValue"/>
      </template>
      <template v-else>
      <span class="form-control datepicker-input" :class="{'with-reset-button': clearButton}"
          :style="{width:optionalWidth}"
          @click="inputClick">
          {{dateReFormat(inputValue)}}
      </span>
      </template>
      <button v-if="clearButton && value" type="button" class="close" @click="inputValue = ''">
        <span>&times;</span>
      </button>
      <button v-if="calendarIcon && !clearButton" type="button" class="close" @click="inputClick">
        <i class="rsvi rsvi-calendar"></i>
      </button>
    </template>
    <div class="datepicker-popup" :style="paneStyle" @mouseover="handleMouseOver" @mouseout="handleMouseOver" v-show="displayDayView">
      <div class="datepicker-ctrl">
        <span class="datepicker-preBtn fa fa-angle-left" aria-hidden="true" @click="preNextMonthClick(0)" :class="{'datepicker-item-disable': !getPreNextMonthWithChk(0)}"></span>
        <span class="datepicker-nextBtn fa fa-angle-right" aria-hidden="true" @click="preNextMonthClick(1)" :class="{'datepicker-item-disable': !getPreNextMonthWithChk(1)}"></span>
      </div>
      <template v-for="(p, pan) in pane" >
        <div class="datepicker-inner">
          <div class="datepicker-body">
            <p><span class="fs18">{{stringifyDayHeader(currDate, pan, 'month')}}</span> <span>{{stringifyDayHeader(currDate, pan, 'year')}}</span></p>
            <div class="datepicker-weekRange">
              <span v-for="(w, index) in text.daysOfWeek" v-bind:class="'day-color-' + index">{{w}}</span>
            </div>
            <div class="datepicker-dateRange">
              <span v-for="d in dateRange[pan]" class="day-cell" :class="getItemClasses(d)" :data-date="stringify(d.date)" @click="daySelect(d)"><div>
                <template v-if="d.sclass !== 'datepicker-item-gray'">
                  {{getSpecailDay(d.date) || d.text}}
                </template>
                <template v-else>
                    {{d.text}}
                </template>
                <div v-if="d.sclass !== 'datepicker-item-gray'"><slot :name="stringify(d.date)"></slot></div></div>
              </span>
            </div>
            <div class="datepicker-footer">
              <a href="javascript:void(0)" class="datepicker-footer-btn btn-today" @click="shotcut('today')">今日</a>
              <a href="javascript:void(0)" class="datepicker-footer-btn btn-next" @click="shotcut('nextday')">明日</a>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="datepicker-popup" :style="paneStyle" v-show="displayMonthView">
      <div class="datepicker-ctrl">
        <span class="datepicker-preBtn fa fa-angle-left" aria-hidden="true" @click="preNextYearClick(0)" :class="{'datepicker-item-disable': !getPreNextYearWithChk(0)}"></span>
        <span class="datepicker-nextBtn fa fa-angle-right" aria-hidden="true" @click="preNextYearClick(1)" :class="{'datepicker-item-disable': !getPreNextYearWithChk(1)}"></span>
      </div>
      <template v-for="(p, pan) in pane" >
        <div class="datepicker-inner">
          <div class="datepicker-body">
            <p @click="switchDecadeView">{{stringifyYearHeader(currDate, pan)}}</p>
            <div class="datepicker-monthRange">
              <template v-for="(m, $index) in text.months">
                <span :class="{'datepicker-dateRange-item-active':
                    (text.months[parse(value).getMonth()]  === m) &&
                    currDate.getFullYear() + pan === parse(value).getFullYear(),
                    'datepicker-item-disable': !getMonthWithChk(stringifyYearHeader(currDate, pan), $index)}"
                    @click="monthSelect(stringifyYearHeader(currDate, pan), $index)"
                  >{{m.substr(0,3)}}</span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="datepicker-popup" :style="paneStyle" v-show="displayYearView">
      <div class="datepicker-ctrl">
        <span class="datepicker-preBtn fa fa-angle-left" aria-hidden="true" @click="preNextDecadeClick(0)" :class="{'datepicker-item-disable': !getPreNextDecadeWithChk(0)}"></span>
        <span class="datepicker-nextBtn fa fa-angle-right" aria-hidden="true" @click="preNextDecadeClick(1)" :class="{'datepicker-item-disable': !getPreNextDecadeWithChk(1)}"></span>
      </div>
      <template v-for="(p, pan) in pane" >
        <div class="datepicker-inner">
          <div class="datepicker-body">
            <p>{{stringifyDecadeHeader(currDate, pan)}}</p>
            <div class="datepicker-monthRange decadeRange">
              <template v-for="decade in decadeRange[pan]">
                <span :class="{'datepicker-dateRange-item-active':
                    parse(inputValue).getFullYear() === decade.text,
                    'datepicker-item-disable': !getYearWithChk(decade.text)}"
                    @click.stop="yearSelect(decade.text)"
                  >{{decade.text}}</span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ClickOutside from './directives/ClickOutside.js'
import cu from './utils/calendarUtils'
export default {
  directives: {
    ClickOutside
  },
  name: 'calendar',
  props: {
    value: {
      type: String
    },
    format: {
      default: 'MM/dd/yyyy'
    },
    minDate: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: ''
    },
    today: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabledDaysOfWeek: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    justified: {
      type: Boolean,
      default: false
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    calendarIcon: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: navigator.language
    },
    placeholder: {
      type: String
    },
    hasInput: {
      type: Boolean,
      default: true
    },
    pane: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    onDayClick: {
      type: Function,
      default () {}
    },
    changePane: {
      type: Function,
      default () {}
    },
    specialDays: {
      type: Object,
      default () {
        return {}
      }
    },
    rangeBus: {
      type: Function,
      default () {
        // return new Vue()
      }
    },
    rangeStatus: {
      type: Number,
      default: 0
    },
    panelAlignRight: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this._blur = (e) => {
      if (!this.$el.contains(e.target) && this.hasInput) {
        this.close()
      }
    }

    // currDateを取得
    this.updateCurrDate()

    const year = this.currDate.getFullYear()
    const month = this.currDate.getMonth()
    this.changePane(year, month, this.pane)
    if (!this.hasInput) {
      this.displayDayView = true
      this.updatePaneStyle()
    }
    if (this.rangeStatus) {
      this.eventbus = this.rangeBus()
      if (typeof this.eventbus === 'object' && !this.eventbus.$on) {
        console.warn('Calendar rangeBus doesn\'t exist')
        this.rangeStatus = 0
      }
    }
    if (this.rangeStatus === 2) {
      this._updateRangeStart = (date) => {
        this.rangeStart = date
        this.currDate = date
        this.inputValue = this.stringify(this.currDate)
      }
      this.eventbus.$on('calendar-rangestart', this._updateRangeStart)
    }

    document.addEventListener('click', this._blur)
  },
  beforeDestroy () {
    document.removeEventListener('click', this._blur)
    if (this.rangeStatus === 2) {
      this.eventbus.$off('calendar-rangestart', this._updateRangeStart)
    }
  },
  data () {
    return {
      inputValue: this.value,
      dateFormat: this.format,
      currDate: new Date(),
      // currDateの複製、バックアップ
      currDateOrigin: new Date(),
      dateRange: [],
      decadeRange: [],
      paneStyle: {
        width: ''
      },
      displayDayView: false,
      displayMonthView: false,
      displayYearView: false,
      rangeStart: false,
      rangeEnd: false
    }
  },
  watch: {
    currDate () {
      this.getDateRange()
    },
    inputValue (val) {
      this.$emit('input', val)
      // currDateを再度取得
      this.updateCurrDate()
    },
    value (val) {
      this.inputValue = val.replace(/[^0-9]/g, '')
    }
  },
  computed: {
    text () {
      return this.translations(this.lang)
    },
    optionalWidth () {
      if (this.justified) {
        return '100%'
      } else {
        return this.width
      }
    }
  },
  methods: {
    updateCurrDate () {
      const _inputValue = this.dateReFormat(this.inputValue)
      this.currDate = cu.parse(_inputValue) || cu.parse(new Date())
      // currDateのバックアップを取る
      this.currDateOrigin = this.currDate
    },
    handleMouseOver (event) {
      let target = event.target
      // this.rangeEnd = false
      if (!this.rangeStart) {
        return true
      }
      if (event.type === 'mouseout') {
        return true
      }
      while (this.$el.contains(target) && !~target.className.indexOf('day-cell')) {
        target = target.parentNode
      }
      if (~target.className.indexOf('day-cell') && !~target.className.indexOf('datepicker-item-gray')) {
        const rangeEnd = target.getAttribute('data-date')
        if (this.rangeStart < this.parse(rangeEnd)) {
          this.rangeEnd = this.parse(rangeEnd)
        }
      }
    },
    getItemClasses (d) {
      const clazz = []
      clazz.push(d.sclass)
      if (this.rangeStart && this.rangeEnd && d.sclass !== 'datepicker-item-gray') {
        if (d.date > this.rangeStart && d.date < this.rangeEnd) {
          clazz.push('daytoday-range')
        }
        /* eslint-disable eqeqeq */
        if (this.stringify(d.date) == this.stringify(this.rangeStart)) {
          clazz.push('daytoday-start')
        }
        /* eslint-disable eqeqeq */
        if (this.stringify(d.date) == this.stringify(this.rangeEnd)) {
          clazz.push('daytoday-end')
        }
      }
      return clazz.join(' ')
    },
    translations (lang) {
      lang = lang || 'en'
      let text = {
        daysOfWeek: ['月', '火', '水', '木', '金', '土', '日'],
        limit: 'Limit reached ({{limit}} items max).',
        loading: 'Loading...',
        minLength: 'Min. Length',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        notSelected: 'Nothing Selected',
        required: 'Required',
        search: 'Search'
      }
      return window.VueCalendarLang ? window.VueCalendarLang(lang) : text
    },
    close () {
      this.displayDayView = this.displayMonthView = this.displayYearView = false
    },
    inputClick () {
      const _inputValue = this.dateReFormat(this.inputValue)
      this.currDate = cu.parse(_inputValue) || cu.parse(new Date())

      if (this.displayMonthView || this.displayYearView) {
        this.displayDayView = false
      } else {
        this.displayDayView = !this.displayDayView
      }
      this.updatePaneStyle()
    },
    updatePaneStyle () {
      if (!(this.displayMonthView || this.displayYearView)) {
        this.$nextTick(function () {
          let offsetLeft = this.$el.offsetLeft
          let offsetWidth = this.$el.querySelector('.datepicker-inner').offsetWidth
          let popWidth = this.pane * offsetWidth + this.borderWidth // add border
          console.log('this.pane', this.pane)
          console.log('offsetWidth', offsetWidth)
          console.log('this.borderWidth', this.borderWidth)
          console.log('popWidth', popWidth)
          this.paneStyle.width = popWidth + 'px'
          if (this.hasInput) {
            if (popWidth + offsetLeft > document.documentElement.clientWidth || this.panelAlignRight) {
              this.paneStyle.right = '0px'
            }
          } else {
            this.paneStyle.position = 'initial'
          }
          this.$forceUpdate()
        })
      }
    },
    preNextDecadeClick (flag) {
      const selectDate = this.getPreNextDecadeWithChk(flag)
      if (!selectDate) {
        return;
      }
      this.currDate = selectDate
    },
    preNextMonthClick (flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      if (flag === 0) {
        const preMonth = cu.getYearMonth(year, month - 1)
        const selectDate = this.getPreNextMonthWithChk(flag)
        if (!selectDate) {
          return;
        }
        this.currDate = selectDate
        this.changePane(preMonth.year, preMonth.month, this.pane)
      } else {
        const nextMonth = cu.getYearMonth(year, month + 1)
        const selectDate = this.getPreNextMonthWithChk(flag)
        if (!selectDate) {
          return;
        }
        this.currDate = selectDate
        this.changePane(nextMonth.year, nextMonth.month, this.pane)
      }
    },
    preNextYearClick (flag) {
      const selectDate = this.getPreNextYearWithChk(flag)
      if (!selectDate) {
        return;
      }
      this.currDate = selectDate
    },
    yearSelect (year) {
      const selectDate = this.getYearWithChk(year)
      if (!selectDate) {
        return;
      }
      this.displayYearView = false
      this.displayMonthView = true
      this.currDate = selectDate
    },
    daySelect (d) {
      const date = d.date;
      if (d.disabled) {
        return false;
      }
      if (this.hasInput) {
        this.currDate = date
        this.inputValue = this.stringify(this.currDate)
        this.displayDayView = false
        this.$emit('input', this.inputValue)
        if (this.rangeStatus === 1) {
          this.eventbus.$emit('calendar-rangestart', this.currDate)
        }
      } else {
        this.onDayClick(date, this.stringify(date))
      }
    },
    // 廃止
    // switchMonthView () {
    //   this.displayDayView = false
    //   this.displayMonthView = true
    // },
    switchDecadeView () {
      this.displayMonthView = false
      this.displayYearView = true
    },
    monthSelect (year, index) {
      const selectDate = this.getMonthWithChk(year, index)
      if (!selectDate) {
        return;
      }
      this.displayMonthView = false
      this.displayDayView = true
      this.currDate = selectDate
      this.changePane(year, index, this.pane)
    },
    getSpecailDay (v) {
      return this.specialDays[this.stringify(v)]
    },
    stringifyDecadeHeader (date, pan) {
      const yearStr = date.getFullYear().toString()
      const firstYearOfDecade = parseInt(yearStr.substring(0, yearStr.length - 1) + 0, 10) + (pan * 10)
      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10
      return firstYearOfDecade + '-' + lastYearOfDecade
    },
    stringifyDayHeader (date, month = 0, order) {
      const d = cu.siblingsMonth(date, month)
      const yearText = d.getFullYear() + '年'
      const monthText = this.text.months[d.getMonth()]
      return order === 'year' ? yearText : monthText
    },
    parseMonth (date) {
      return this.text.months[date.getMonth()]
    },
    stringifyYearHeader (date, year = 0) {
      return date.getFullYear() + year
    },
    stringify (date, format = this.dateFormat) {
      if (!date) date = cu.parse()
      if (!date) return ''
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const monthName = this.parseMonth(date)
      return format
      .replace(/yyyy/g, year)
      .replace(/MMMM/g, monthName)
      .replace(/MMM/g, monthName.substring(0, 3))
      .replace(/MM/g, ('0' + month).slice(-2))
      .replace(/dd/g, ('0' + day).slice(-2))
      .replace(/yy/g, year)
      .replace(/M(?!a)/g, month)
      .replace(/d/g, day)
    },
    parse (str = this.inputValue) {
      return cu.parse(str)
    },
    chkMinMaxDate (date) {
      if (!cu.chkMinDate(date, this.minDate) || !cu.chkMaxDate(date, this.maxDate)) {
        return false;
      }
      return true;
    },
    getPreNextMonthWithChk(flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      const date = this.currDate.getDate()

      let selectDate = null;
      if (flag === 0) {
        const preMonth = cu.getYearMonth(year, month)
        selectDate = new Date(preMonth.year, preMonth.month, 1)
        selectDate.setDate(selectDate.getDate() - 1)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      } else {
        const nextMonth = cu.getYearMonth(year, month + 1)
        selectDate = new Date(nextMonth.year, nextMonth.month, 1)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      }
      return selectDate;
    },
    getMonthWithChk (year, index) {
      const selectDate = new Date(year, index, this.currDate.getDate())
      if (!this.chkMinMaxDate(selectDate)) {
        return null;
      }
      return selectDate;
    },
    getPreNextYearWithChk (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()
      let   selectDate = null
      if (flag === 0) {
        selectDate = new Date(year - 1, months, date)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      } else {
        selectDate = new Date(year + 1, months, date)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      }
      return selectDate;
    },
    getYearWithChk (year) {
      const selectDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
      if (!this.chkMinMaxDate(selectDate)) {
        return null;
      }
      return selectDate;
    },
    getPreNextDecadeWithChk (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()
      let   selectDate = null;
      if (flag === 0) {
        selectDate = new Date(year - 10, months, date)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      } else {
        selectDate = new Date(year + 10, months, date)
        if (!this.chkMinMaxDate(selectDate)) {
          return null;
        }
      }
      return selectDate;
    },
    dateReFormat (str) {
      if (str.length !== 8) return ''
      const y = str.slice(0, 4)
      const m = str.slice(4, 6)
      const d = str.slice(6, 8)
      return `${y}/${m}/${d}`
    },
    getDateRange () {
      this.dateRange = []
      this.decadeRange = []

      const dateRange = cu.getDateRange({
        targetDate: this.currDate,
        activeDay: this.inputValue,
        minDate: this.minDate,
        maxDate: this.maxDate,
      })

      this.dateRange = [
        dateRange
      ]

    },
    shotcut (str) {
      let date = this.today

      if (!date) {
        // todayが設定されてない場合、currDateOriginからコピー
        date = this.currDateOrigin
      } else {
        // 計算可能のDate Objに変更
        date = this.dateReFormat(date)
        date = new Date(date)
      }

      // 「明日」の処理、一日加算
      if (str === 'nextday') {
        date.setDate(date.getDate() + 1)
      }

      // 日選択の実行
      this.daySelect({
        date,
        disabled: false
      })

    }
  }
}
</script>

<style lang="scss">
@mixin clearfix() {
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }
  &:after {
    clear: both;
  }
}
.datepicker{
  position: relative;
}
.inline{
  display: inline-block;
}
input.datepicker-input.with-reset-button,
span.datepicker-input.with-reset-button {
  padding-right: 25px;
}
span.datepicker-input {
  line-height: normal;
}
.datepicker > button.close {
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #5d5c57;
  opacity: 1;
}
// .datepicker > button.close:focus {
//   opacity: .2;
// }
.datepicker-popup{
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-top: 2px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  @include clearfix;
}
.datepicker-inner{
  width: 330px;
  float: left;
}
.datepicker-body{
  padding: 6px 22px 26px;
  text-align: center;
}


// .datepicker-ctrl p,
// .datepicker-ctrl span,
// .datepicker-body span{
//   display: inline-block;
//   width: 36px;
//   line-height: 28px;
//   height: 36px;
// }

.datepicker-ctrl > span,
.datepicker-dateRange > span,
.datepicker-weekRange > span {
    display: inline-block;
    width: 36px;
    line-height: 28px;
    height: 36px;
    margin: 0 2px;
}

.datepicker-ctrl p {
  width: 65%;
}
.datepicker-ctrl span {
  position: absolute;
}
.datepicker-body span {
  text-align: center;
}
.datepicker-monthRange span{
  width: 48px;
  height: 50px;
  line-height: 45px;
}
.datepicker-item-disable {
  // background-color: white!important;
  cursor: not-allowed!important;
}

.datepicker-dateRange-item-active:hover,
.datepicker-dateRange-item-active {
  background: #ffe082 !important;
  // color: white!important;

}
.datepicker-monthRange {
  margin-top: 10px
}
.datepicker-monthRange span,
.datepicker-ctrl span,
.datepicker-ctrl p,
.datepicker-dateRange span {
  cursor: pointer;
}
.datepicker-monthRange span:hover,
.datepicker-ctrl p:hover,
.datepicker-ctrl i:hover,
.datepicker-dateRange span:hover,
.datepicker-dateRange-item-hover {
  background-color : #eeeeee;
}
.datepicker-dateRange {
  .daytoday-start,
  .daytoday-start:hover,
  .daytoday-end,
  .daytoday-end:hover{
    background: rgb(50, 118, 177)!important;
    color: white!important;
  }
}
.datepicker-dateRange .daytoday-range,
.datepicker-dateRange .daytoday-range:hover{
  background-color: #ddd;
}
.datepicker-weekRange{
  margin: 16px 0 0;
}
.datepicker-weekRange span{
  font-weight: bold;
}
.datepicker-label{
  background-color: #f8f8f8;
  font-weight: 700;
  padding: 7px 0;
  text-align: center;
}
.datepicker-ctrl{
  position: relative;
  /*height: 30px;*/
  line-height: 30px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin: 20px 22px 0;
}
.month-btn{
  font-weight: bold;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.datepicker-preBtn{
  top: 4px;
  left: 2px;
  font-size: 26px;
}
.datepicker-nextBtn{
  top: 4px;
  right: 2px;
  font-size: 26px;
}
.day-cell {
  border-radius: 100%;
  > div {
    padding-top: 4px;
    font-size: 15px;
  }
}
.day-color-6 {color: #e53935}
.day-color-5 {color: #00acc1}
.day-6 {color: #00acc1}
.day-0 {color: #e53935}

.decadeRange span:first-child,
.decadeRange span:last-child,
.datepicker-item-disable,
.datepicker-item-gray{
  color: #ddd;
}

.form-control[readonly] {
  background-color:#fff !important;
}

.datepicker-footer {
  margin-top: 8px;
  // text-align: left;
}

a.datepicker-footer-btn {
  display: inline-block;
  padding: 4px 7px 3px;
  background-color: #eee;
  text-align: center;
  font-size: 11px;
  color: #999;
  border-radius: 3px;
  min-width: 60px;
}
a.datepicker-footer-btn:hover {
  color: #333;
}
</style>
